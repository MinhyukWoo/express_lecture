const express = require("express");
const passport = require("passport");
const { User } = require("../models");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/join", isNotLoggedIn, async (request, response, next) => {
  const { email, nick, password } = request.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return response.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick: nick,
      password: hash,
    });
    return response.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (request, response, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return response.redirect(`/?loginError=${info.message}`);
    }
    return request.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return response.redirect("/");
    });
  })(request, response, next);
});

router.get("/logout", isLoggedIn, (request, response) => {
  request.logout({ keepSessionInfo: false }, (error) => {
    console.error(error);
  });
  response.redirect("/");
});

router.get("/kakao", passport.authenticate("kakao"));
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (request, response) => {
    response.redirect("/");
  }
);

module.exports = router;
