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
};
const knex = require("knex").knex(config);

knex
  .select()
  .from("users")
  .then((users) => {
    console.log(users[0]);
  })
  .catch((error) => {
    console.error(error);
  });
