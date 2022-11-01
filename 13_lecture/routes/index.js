const express = require("express");



const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

const config = require("../knexConfig");
const knex = require("knex").knex(config);

router.get("/", async (req, res, next) => {
  knex.select().from("goods").where({});
});
