const express = require("express");
const User = require("../models/user");
const Comment = require("../models/comment");

const router = express.Router();

router
  .route("/")
  .get(async (request, response, next) => {
    try {
      const users = await User.findAll();
      response.json(users);
    } catch (error) {
      console.error(error);
      next(error);
    }
  })
  .post(async (request, response, next) => {
    try {
      const user = await User.create({
        name: request.body.name,
        age: request.body.age,
        married: request.body.married,
      });
      console.log(user);
      response.status(201).json(user);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

router.get("/:id/comments", async (request, response, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: request.params.id },
      },
    });
    console.log(comments);
    response.json(comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
