require("dotenv").config();
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const MySQLStore = require("express-mysql-session")(session);
const client = require("mysql2").createConnection({
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "location",
});
const authRouter = require("./routers/authentication");
const pageRouter = require("./routers/page");
const passportConfig = require("./passport/index");

const app = express();
const server = http.createServer(app);
passportConfig();
const store = new MySQLStore({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "location",
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.authenticate("session"));

app.use("/", pageRouter);

app.use("/auth", authRouter);

app.get("/", (requset, response) => {
  return response.redirect("/login");
});

app.use(function (err, request, response, next) {
  console.log(err);
  response.send(err);
});

server.listen(52273, function () {
  console.log("Listening at http://localhost:52273");
});

const io = require("socket.io")(server);
io.on("connection", (socket) => {
  socket.on("join", function (data) {
    socket.join(data);
  });
  socket.on("location", function (data) {
    client.query(
      "INSERT INTO locations(name, latitude, longitude, date) VALUES (?, ?, ?, NOW())",
      [data.name, data.latitude, data.longitude]
    );
    io.sockets.in(data.name).emit("receive", {
      latitude: data.latitude,
      longitude: data.longitude,
      date: Date.now(),
    });
  });
});
