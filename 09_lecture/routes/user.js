const express = require("express");

const { isLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

router.post("/:id/follow", isLoggedIn, async (request, response, next) => {
  try {
    const user = await User.findOne({
      where: { id: request.user.id },
    });
    if (user) {
      await user.addFollowing(parseInt(request.params.id, 10));
      response.send("success");
    } else {
      response.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
