const express = require("express");
const router = express.Router();
const db = require("../models/index");

router.get("/screens", (request, response, next) => {
  db.Screen.findAll()
    .then((screens) => {
      response.json(
        screens.map(({ id, date, screenMovie }) => {
          return { id, date, screenMovie };
        })
      );
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/seats", (request, response, next) => {
  const query = request.query;
  response.send(movies[Number(query.movie)].seats);
});

function convertState(state) {
  switch (state) {
    case "enable":
      return 1;
    case "disable":
      return 0;
    case "reserved":
      return 2;
    default:
      return -1;
  }
}

router.get("/seats/:id", (request, response, next) => {
  const screenId = request.params.id;
  db.Seat.findAll({ where: { screen: screenId } })
    .then((seats) => {
      const sortedSeats = seats.sort((a, b) => {
        return a.seatNumber < b.seatNumber ? -1 : 1;
      });

      let outSeats = [];
      let row = [];
      sortedSeats.forEach((seat, index) => {
        row.push(convertState(seat.state));
        if (index % 14 === 13) {
          outSeats = outSeats.concat([row]);
          row = [];
        }
      });
      response.send(outSeats);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
