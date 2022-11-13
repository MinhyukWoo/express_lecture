const fs = require("fs");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const client = require("mysql2").createConnection({
  user: "root",
  password: "Sea%l1234",
  database: "location",
});

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/tracker", (request, response) => {
  fs.readFile("Tracker.html", function (error, data) {
    response.send(data.toString());
  });
});

app.get("/observer", function (request, response) {
  fs.readFile("Observer.html", function (error, data) {
    response.send(data.toString());
  });
});

app.get("/showdata/:name", (request, response) => {
  console.log(request.params.name);
  client.query(
    "SELECT * FROM locations WHERE name=?",
    [request.params.name],
    function (error, data) {
      response.send(data);
    }
  );
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
