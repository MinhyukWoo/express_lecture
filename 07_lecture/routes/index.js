const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (request, result, next) => {
  try {
    const users = await User.findAll();
    result.render("sequelize", { users });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
