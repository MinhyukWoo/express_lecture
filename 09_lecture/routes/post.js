const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(request, file, callback) {
      callback(null, "uploads/");
    },
    filename(request, file, callback) {
      const extension = path.extname(file.originalname);
      callback(
        null,
        path.basename(file.originalname, extension) + Date.now() + extension
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/img", isLoggedIn, upload.single("img"), (request, response) => {
  console.log(request.file);
  response.json({ url: `/img/${request.file.filename}` });
});

const upload2 = multer();
router.post(
  "/",
  isLoggedIn,
  upload2.none(),
  async (request, response, next) => {
    try {
      const post = await Post.create({
        content: request.body.content,
        img: request.body.url,
        UserId: request.user.id,
      });
      const hashtags = request.body.content.match(/#[^\s#]+/g);
      if (hashtags) {
        const result = await Promise.all(
          hashtags.map((tag) => {
            return Hashtag.findOrCreate({
              where: { title: tag.slice(1).toLowerCase() },
            });
          })
        );
        await post.addHashtags(result.map((r) => r[0]));
      }
      response.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
