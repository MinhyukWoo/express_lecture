const { Router } = require("express");
const db = require("../models");
const router = Router();
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const passport = require("passport");

router.post("/users", isNotLoggedIn, async (request, response, next) => {
  try {
    console.log(request.body);
    const { userId, password, name } = request.body;
    const encryptedPassword = await bcrypt.hash(password, 12);
    const user = await db.User.findOne({ where: { userId } });
    if (user) {
      const err = new Error("이미 가입된 유저 아이디");
      console.error(err);
      next(err);
    }
    await db.User.create({ userId, password: encryptedPassword, name });
    response.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/login", isNotLoggedIn, (request, response, next) => {
  try {
    passport.authenticate("local", (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      } else {
        if (!user) {
          return response.redirect("/login");
        } else {
          return request.login(user, (loginError) => {
            if (loginError) {
              console.error(loginError);
              return next(loginError);
            } else {
              response.redirect("/");
            }
          });
        }
      }
    })(request, response, next);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/logout", isLoggedIn, (request, response) => {
  request.logout((err) => {
    console.error(err);
    response.redirect("/login");
  });
});

module.exports = router;
