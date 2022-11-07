const { Router } = require("express");
const router = Router();
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const fs = require("fs/promises");
const ejs = require("ejs");
const db = require("../models");

router.get("/", isLoggedIn, async (request, response, next) => {
  await db.Product.findAll()
    .then((products) => {
      return products.map((product) => {
        return {
          index: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          count: product.count,
        };
      });
    })
    .then((products) => {
      return Promise.all([products, fs.readFile("HTMLPage.html", "utf8")]);
    })
    .then(([products, htmlPage]) => {
      response.send(
        ejs.render(htmlPage, {
          products: products,
        })
      );
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get("/login", isNotLoggedIn, (request, response, next) => {
  response.render("login");
});

router.get("/signup", isNotLoggedIn, (request, response, next) => {
  response.render("signUp");
});

module.exports = router;
