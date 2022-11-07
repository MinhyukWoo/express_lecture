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
  function onReturn(index) {
    products[index].count++;
    clearTimeout(cart[index].timerID);
    delete cart[index];
    io.sockets.emit("count", {
      index: index,
      count: products[index].count,
    });
  }

  var cart = {};

  socket.on("cart", (index) => {
    console.log(index);
    products[index].count--;
    cart[index] = {};
    cart[index].index = index;
    cart[index].timerID = setTimeout(() => {
      onReturn(index);
    }, 1000 * 60 * 10);
    io.sockets.emit("count", {
      index: index,
      count: products[index].count,
    });
  });
  socket.on("buy", (index) => {
    clearTimeout(cart[index].timerID);
    delete cart[index];
    io.sockets.emit("count", {
      index: index,
      count: products[index].count,
    });
  });
  socket.on("return", (index) => {
    onReturn(index);
  });
});
