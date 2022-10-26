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

knex.schema.hasTable("domain").then((exists) => {
  if (!exists) {
    knex.schema
    .createTableIfNotExists("domain", (table) => {
      table.string("host", 80).notNullable();
      table.enum("type", ["free", "premium"]).notNullable();
      table.uuid("clientSecret").notNullable();
      table.integer("user_id");
      table.foreign("user_id").references("users.id");
      table.timestamps();
    })
    .then(() => {
      console.log("domain is created.");
    })
    .catch((error) => {
      console.error(error);
    });
  }
})

