const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password, money } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.redirect("/join?joinError=이미 가입된 이메일입니다.");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
      money,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout((err) => {
    console.error(err);
  });
  req.session.save((err) => {
    res.redirect("/");
  });
});

module.exports = router;
