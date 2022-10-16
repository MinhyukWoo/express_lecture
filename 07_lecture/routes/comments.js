const express = require("express");
const { User, Comment } = require("../models");

const router = express.Router();

router.post("/", async (request, response, next) => {
  try {
    const comment = await Comment.create({
      commenter: request.body.id,
      comment: request.body.comment,
    });
    console.log(comment);
    response.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router
  .route("/:id")
  .patch(async (request, response, next) => {
    try {
      const result = await Comment.update(
        {
          comment: request.body.comment,
        },
        { where: { id: request.params.id } }
      );
      response.json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  })
  .delete(async (request, response, next) => {
    try {
      const result = await Comment.destroy({
        where: { id: request.params.id },
      });
      response.json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

module.exports = router;
