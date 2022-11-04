const express = require("express");
const fs = require("fs/promises");

const router = express.Router();

router.get("/", (request, response, next) => {
  fs.readFile("public/MovieSelection.html")
    .then((data) => {
      response.send(data.toString());
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
