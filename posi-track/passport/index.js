const passport = require("passport");
const LocalStrategy = require("passport-local");
const db = require("mysql2").createConnection({
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "location",
});
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.serializeUser(function (user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function (username, done) {
    db.query(
      "SELECT * FROM users WHERE username=?",
      [username],
      function (err, result) {
        if (err) {
          return done(err);
        } else {
          return done(null, result);
        }
      }
    );
  });

  passport.use(
    new LocalStrategy(function verify(username, password, done) {
      db.query(
        "SELECT * FROM users WHERE username=?",
        [username],
        function (err, result) {
          console.log(result);
          if (err) {
            return done(err);
          } else if (!result) {
            return done(null, false, { message: "User is not found" });
          } else {
            bcrypt
              .compare(password, result[0].password)
              .then((isResolved) => {
                if (isResolved) {
                  done(null, result[0]);
                } else {
                  done(null, false, { message: "Password is not equaled" });
                }
              })
              .catch((bcryptErr) => {
                done(bcryptErr);
              });
          }
        }
      );
    })
  );
};
