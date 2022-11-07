const { Router } = require("express");
const db = require("../models");

const router = Router();

function makeProducts() {
  db.Product.create({
    name: "자동차",
    image: "test.jpg",
    price: 3000,
    count: 30,
  });
  db.Product.create({
    name: "버스",
    image: "bus.jpg",
    price: 4000,
    count: 30,
  });
  db.Product.create({
    name: "구형 컴퓨터",
    image: "white-computer.jpg",
    price: 1500,
    count: 30,
  });
}

router.get("/", (request, response, next) => {
  try {
    // makeProducts();
    response.send("Done");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
