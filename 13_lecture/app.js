const express = require("express");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const path = require("path");

dotenv.config();

const passportConfig = require("./passport");
const { sequelize } = require("./models");
const session = require("express-session");
const morgan = require("morgan");
const { MemoryStore } = require("express-session");

const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");
const passport = require("passport");
const app = express();

app.set("port", process.env.PORT || 8010);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((error) => {
    console.error(error);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

passportConfig();

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  store: new MemoryStore(),
});
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(`연결됨: http://localhost:${app.get("port")}`);
});
