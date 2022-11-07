const express = require("express");
const fs = require("fs/promises");
const router = express.Router();
const db = require("../models/index");

router.get("/", (request, response, next) => {
  db.Screen.findAll({ include: db.Movie })
    .then((screens) => {
      response.render("movieSelection", {
        screens: screens.map(({ id, date, screenMovie, Movie }) => {
          return {
            id, 
            date: new Date(date).toLocaleString(),
            screenMovieId: screenMovie,
            screenMovieTitle: Movie.title,
          };
        }),
      });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get("/seats", async (request, response, next) => {
  await db.Screen.findOne({
    where: {
      id: request.query.screen,
    },
  })
    .then((screen) => {
      if (screen) {
        response.redirect(`seats/${screen.id}`);
      } else {
        next(new Error("no screen"));
      }
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get("/seats/:id", async (request, response, next) => {
  const screenId = request.params.id;
  db.Screen.findOne({ where: { id: screenId }, include: db.Movie })
    .then((screen) => {
      response.render("movieReservation", {
        screenId,
        screenDate: new Date(screen.date).toLocaleString(),
        screenTitle: screen.Movie.title,
      });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
