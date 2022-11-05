const { Router } = require("express");
const db = require("../models/index");
const seats = require("../models/seats");
const router = Router();

function createMovies() {
  db.Movie.create({ title: "바람과 함께 사라지다" });
  db.Movie.create({ title: "헌트" });
}
function createScreens() {
  db.Screen.create({
    date: "2022-11-11",
    screenMovie: 2,
  });
  db.Screen.create({
    date: "2022-11-12",
    screenMovie: 1,
  });
}

function createSeats() {
  for (let index = 0; index < 196; index++) {
    db.Seat.create({
      seatNumber: index,
      state: "enable",
      screen: 3,
    });
  }
}

router.get("", (request, response, next) => {
  response.send("Done");
});

module.exports = router;
