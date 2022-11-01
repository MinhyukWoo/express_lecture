const express = require("express");
const { Post, User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Hashtag } = require("../models");

const router = express.Router();

router.use((request, response, next) => {
  response.locals.user = request.user;
  response.locals.followerCount = request.user
    ? request.user.Followers.length
    : 0;
  response.locals.followingCount = request.user
    ? request.user.Followings.length
    : 0;
  response.locals.followerIdList = request.user
    ? request.user.Followings.map((f) => f.id)
    : [];
  next();
});

router.get("/profile", isLoggedIn, (request, response) => {
  response.render("profile", { title: "내 정보 - NodeBird" });
});

router.get("/join", isNotLoggedIn, (request, response) => {
  response.render("join", { title: "회원가입 - NodeBird" });
});

router.get("/", async (request, response, next) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    response.render("main", {
      title: "NodeBird",
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/hashtag", async (request, response, next) => {
  const query = request.query.hashtag;
  if (!query) {
    return response.redirect("/");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }
    return response.render("main", {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
