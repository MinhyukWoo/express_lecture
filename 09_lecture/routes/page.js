const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.use((request, response, next) => {
  response.locals.user = request.user;
  response.locals.followerCount = 0;
  response.locals.follwingCount = 0;
  response.locals.followerIdList = [];
  next();
});

router.get("/profile", isLoggedIn, (request, response) => {
  response.render("profile", { title: "내 정보 - NodeBird" });
});

router.get("/join", isNotLoggedIn, (request, response) => {
  response.render("join", { title: "회원가입 - NodeBird" });
});

router.get("/", (request, response, next) => {
  const twits = [];
  response.render("main", {
    title: "NodeBird",
    twits,
  });
});

module.exports = router;
