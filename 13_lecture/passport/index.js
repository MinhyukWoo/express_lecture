const passport = require("passport");

const localStrategy = require("./localStrategy");
const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  passport.deserializeUser((email, done) => {
    User.findOne({ where: {email: email} })
      .then((user) => done(null, user))
      .catch((error) => done(error));
  });
  localStrategy();
};
