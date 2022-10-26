const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { isLoggedIn } = require("./middlewares");
require("dotenv").config();
const config = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  pool: {
    min: 0,
    max: 10,
  },
};
const knex = require("knex").knex(config);
const router = express.Router();
router.get("/", async (request, response, next) => {
  await knex
    .select()
    .from("users")
    .where({
      id: (request && request.user && request.user.dataValues.id) || null,
    })
    .then(async (users) => {
      const user = users[0];
      console.log(user);
      if (user) {
        console.log("pass");

        await knex
          .select()
          .from("domain")
          .where({ user_id: user.id })
          .then((domains) => {
            response.render("login", { user, domains });
          });
      } else {
        response.render("login", { user, domains: user });
      }
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

router.post("/domain", isLoggedIn, async (request, response, next) => {
  await knex
    .insert({
      user_id: request.user.id,
      host: request.body.host,
      type: request.body.type,
      clientSecret: uuidv4(),
    })
    .from("domain")
    .then(() => {
      response.redirect("/");
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
