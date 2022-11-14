const express = require("express");

const router = express.Router();

router.get("/login", (request, response, next) => {
  response.render("login");
});

router.get("/signup", (request, response, next) => {
  response.render("signup");
});

module.exports = router;
