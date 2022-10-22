const express = require("express");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { sequelize } = require("./models");
const passport = require("passport");
const passportConfig = require("./passport");

dotenv.config();

const app = express();
passportConfig();
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});

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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", pageRouter);
app.use("/auth", authRouter);

app.use((request, response, next) => {
  const error = new Error(
    `${request.method} ${request.url} 라우터가 없습니다.`
  );
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response.locals.message = error.message;
  response.locals.error = process.env.NODE_ENV !== "production" ? error : {};
  response.status(error.status || 500);
  response.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
