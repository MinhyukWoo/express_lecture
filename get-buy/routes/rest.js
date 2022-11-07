const { Router } = require("express");
const db = require("../models");
const router = Router();
const bcrypt = require("bcrypt");
const { isLoggedIn } = require("./middleware");

router.post("/users", isLoggedIn, async (request, response, next) => {
  try {
    const { userId, password, name } = request.body;
    const encryptedPassword = bcrypt.hash(password);
    const user = await db.User.findOne({ where: { userId } });
    if (user) {
      const err = new Error("이미 가입된 유저 아이디");
      console.error(err);
      next(err);
    }
    await db.User.create({ userId, encryptedPassword, name });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
