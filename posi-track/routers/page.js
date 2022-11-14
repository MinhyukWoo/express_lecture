const express = require("express");
const { isLogout, isLogin } = require("./permission");
const fs = require("fs");
const db = require("mysql2").createConnection({
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "location",
});

const router = express.Router();

router.get("/login", isLogout, (request, response, next) => {
  response.render("login");
});

router.get("/signup", isLogout, (request, response, next) => {
  response.render("signup");
});

router.get("/tracker", isLogin, (request, response) => {
  fs.readFile("Tracker.html", function (error, data) {
    response.send(data.toString());
  });
});

router.get("/observer", isLogin, function (request, response) {
  fs.readFile("Observer.html", function (error, data) {
    response.send(data.toString());
  });
});

router.get("/showdata/:name", isLogin, (request, response) => {
  console.log(request.params.name);
  db.query(
    "SELECT * FROM locations WHERE name=?",
    [request.params.name],
    function (error, data) {
      response.send(data);
    }
  );
});

module.exports = router;
