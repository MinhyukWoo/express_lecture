const scoketio = require("socket.io");
const express = require("express");
const http = require("http");
const fs = require("fs/promises");
const morgan = require("morgan");

let seats = [
  [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 1],
];


const app = express();
const server = http.createServer(app);
app.use(morgan("dev"));

app.get("/", (request, response, next) => {
  fs.readFile("HTMLPage.html")
    .then((data) => {
      response.send(data.toString());
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/seats", (request, response, next) => {
  response.send(seats);
});

server.listen(52273, () => {
  console.log("Server running at http://localhost:52273");
});

const io = scoketio(server);

io.sockets.on("connection", (socket) => {
  socket.on("reserve", (data) => {
    seats[data.y][data.x] = 2;
    io.sockets.emit("reserve", data);
  });
  socket.on("cancel", (data) => {
    seats[data.y][data.x] = 1;
    io.sockets.emit("cancel", data);
  });
});
