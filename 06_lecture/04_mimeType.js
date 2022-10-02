const express = require("express");
const fs = require("fs");
const app = express();

app.get("/image", (request, response) => {
  fs.readFile("image.png", (error, data) => {
    console.log(data);
    response.type("image/png");
    response.send(data);
  });
});

app.get("/audio", (request, response) => {
  fs.readFile("audio.mp3", (error, data) => {
    response.type("audio/mpeg");
    response.send(data);
  });
});

app.listen(50000, () => {
  console.log("Server running at http://localhost:50000");
});

// text/plain
// text/html
// image/png
// audio/mpe
// video/mpeg
// application/json
// multipart/form-data
// type()
