const passport = require("passport");
const db = require("../models");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

module.exports = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "userId", passwordField: "password" },
      async (userId, password, done) => {
        try {
          const user = await db.User.findOne({ where: { userId } });
          if (user) {
            if (bcrypt.compare(password, user.password)) {
              done(null, user);
            } else {
              done(null, false, { message: "비밀번호가 일치하지 않습니다." });
            }
          } else {
            done(null, false, { message: "가입되지 않은 회원입니다." });
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
