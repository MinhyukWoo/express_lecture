const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Good = require("../models/good");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/", async (req, res, next) => {
  try {
    const goods = await Good.findAll({ where: { SoldId: null } });
    res.render("main", {
      title: "NodeAuction",
      goods,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", {
    title: "회원가입 - NodeAuction",
  });
});

router.get("/good", isLoggedIn, (req, res) => {
  res.render("good", { title: "상품 등록 - NodeAuction" });
});

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error(error);
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, "uploads/");
    },
    filename(req, file, callback) {
      const ext = path.extname(file.originalname);
      callback(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  "/good",
  isLoggedIn,
  upload.single("img"),
  async (req, res, next) => {
    try {
      const { name, price } = req.body;
      await Good.create({
        OwnerId: req.user.id,
        name,
        img: req.file.filename,
        price,
      });
      res.redirect("/")
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
