const { Router } = require("express");
const router = Router();
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const fs = require("fs/promises");
const ejs = require("ejs");

var counter = 0;
function Product(name, image, price, count) {
  this.index = counter++;
  this.name = name;
  this.image = image;
  this.price = price;
  this.count = count;
}

var products = [
  new Product("JavaScript", "test.jpg", 28000, 30),
  new Product("jQuery", "test.jpg", 28000, 30),
  new Product("Node.js", "test.jpg", 32000, 30),
  new Product("Socket.io", "test.jpg", 17000, 30),
  new Product("Connect", "test.jpg", 18000, 30),
  new Product("Express", "test.jpg", 31000, 30),
  new Product("EJS", "test.jpg", 12000, 30),
];

router.get("/", isLoggedIn, (request, response, next) => {
  fs.readFile("HTMLPage.html", "utf8")
    .then((htmlPage) => {
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
