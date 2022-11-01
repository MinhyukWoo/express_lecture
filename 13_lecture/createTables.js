module.exports = async () => {
  const config = require("./knexConfig");
  const knex = require("knex").knex(config);
  knex.schema.hasTable()
  knex.schema
    .createTableIfNotExists("users", (table) => {
      table.increments("id").primary();
      table.string("email", 40).notNullable().unique();
      table.string("nickname", 15).notNullable();
      table.string("password", 100);
      table.integer("money").notNullable().defaultTo(0);

      table.timestamps();
      table.charset("utf8");
      table.collate("utf8_general_ci");
    })
    .then(() => {
      console.log("'users' is created.");
    })
    .catch((err) => {
      console.error(err);
    });
  knex.schema
    .createTableIfNotExists("goods", (table) => {
      table.increments("id").primary();
      table.string("name", 40).notNullable();
      table.string("image", 200);
      table.integer("price").notNullable();
      table.integer("owner_id");
      table.foreign("owner_id").references("users.id");
      table.integer("sold_id");
      table.foreign("sold_id").references("users.id");

      table.timestamps();
      table.charset("utf8");
      table.collate("utf8_general_ci");
    })
    .then(() => {
      console.log("'goods' is created.");
    })
    .catch((err) => {
      console.error(err);
    });
  knex.schema
    .createTableIfNotExists("auctions", (table) => {
      table.increments("id").primary();
      table.integer("bid").notNullable().defaultTo(0);
      table.string("msg", 100);
      table.integer("user_id");
      table.foreign("user_id").references("users.id");
      table.integer("good_id");
      table.integer("good_id").references("goods.id");

      table.timestamps();
      table.charset("utf8");
      table.collate("utf8_general_ci");
    })
    .then(() => {
      console.log("'auctions' is created.");
    })
    .catch((err) => {
      console.error(err);
    });
};
