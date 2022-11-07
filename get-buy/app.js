var http = require("http");
var express = require("express");
const { sequelize } = require("./models");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const serviceRouter = require("./routes/service");
const authenticationRouter = require("./routes/authentication");
const testRouter = require("./routes/test");
const passport = require("passport");
const passportConfig = require("./passport");
const session = require("express-session");
const db = require("./models");

sequelize.sync({ force: false });
passportConfig();

var app = express();
var server = http.createServer(app);
nunjucks.configure("views", {
  express: app,
  watch: true,
});
app.set("view engine", "njk");
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "GETBUY",
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", serviceRouter);
app.use("/", authenticationRouter);
app.use("/test", testRouter);

server.listen(52273, () => {
  console.log("Server listening at http://localhost:52273");
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  var cart = {};
  var indices = [];

  function onReturn() {
    indices.forEach((index) => {
      db.Product.findOne({ where: { id: index } })
        .then((product) => {
          product.count = product.count + 1;
          return product.save();
        })
        .then((product) => {
          delete cart[index];
          io.sockets.emit("count", {
            index: index,
            count: product.count,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
    clearTimeout(cart.timerID);
    cart = {};
    indices = [];
  }

  socket.on("cart", (index) => {
    db.Product.findOne({ where: { id: index } })
      .then((product) => {
        product.count = product.count - 1;
        return product.save();
      })
      .then((product) => {
        const timeOutSec = 10;
        cart[index] = {};
        cart[index].index = index;
        indices.push(index);
        clearTimeout(cart.timerID);
        cart.timerID = setTimeout(() => {
          onReturn();
        }, timeOutSec * 1000);
        const timeOutDate = new Date();
        timeOutDate.setSeconds(timeOutDate.getSeconds() + timeOutSec);
        io.sockets.emit("time", {
          index: index,
          timeOutDate: timeOutDate.toString(),
        });
        io.sockets.emit("count", {
          index: index,
          count: product.count,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
  socket.on("buy", () => {
    clearTimeout(cart.timerID);
    indices.forEach((index) => {
      delete cart[index];
      db.Product.findOne({ where: { id: index } })
        .then((product) => {
          io.sockets.emit("time", {
            index: index,
            timeOutDate: new Date(),
          });
          io.sockets.emit("count", {
            index: index,
            count: product.count,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
    cart = {};
    indices = [];
  });
  socket.on("return", () => {
    onReturn();
  });
  socket.on("disconnect", () => {
    onReturn();
    console.log("Disconnect user");
  });
});
