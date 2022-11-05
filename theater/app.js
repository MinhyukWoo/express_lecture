const express = require("express");
const http = require("http");
const morgan = require("morgan");
const { sequelize } = require("./models");
const movieRouter = require("./routes/movie");
const app = express();
const server = http.createServer(app);

app.use(morgan("dev"));

app.use("/", movieRouter);
sequelize.sync({ force: false });

server.listen(52273, () => {
  console.log("Server running at http://localhost:52273");
});
