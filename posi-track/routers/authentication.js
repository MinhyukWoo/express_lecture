require("dotenv").config();
const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("mysql2").createConnection({
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "location",
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/tracker",
    failureRedirect: "/login",
  })
);

router.post("/logout", function (request, response, next) {
  request.logout(function (err) {
    if (err) {
      return next(err);
    } else {
      response.redirect("/");
    }
  });
});

router.post("/signup", function (request, response, next) {
  const { username, password } = request.body;
  if (!username) {
    next(new Error("Username is invalid"));
  }
  if (!password) {
    next(new Error("Password is invalid"));
  }
  bcrypt
    .hash(password, 12)
    .then(
      (value) => {
        db.query(
          "INSERT INTO users(username, password) VALUES (?, ?)",
          [username, value],
          function (err) {
            if (err) {
              next(err);
            } else {
              response.redirect("/login");
            }
          }
        );
      },
      (reason) => {
        next(new Error(reason));
      }
    )
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
