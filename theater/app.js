const express = require("express");
const http = require("http");
const morgan = require("morgan");
const { sequelize } = require("./models");
const serviceRouter = require("./routes/service");
const restRouter = require("./routes/rest");
const testRouter = require("./routes/test");
const SocketIO = require("socket.io");
const nunjucks = require("nunjucks");
const db = require("./models/index");

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

sequelize.sync({ force: false });
nunjucks.configure("views", {
  express: app,
  watch: true,
});
app.set("view engine", "njk");
app.set("io", io);

app.use(morgan("dev"));

app.use("/", serviceRouter);
app.use("/rest", restRouter);
app.use("/test", testRouter);

server.listen(52273, () => {
  console.log("Server running at http://localhost:52273");
});

io.sockets.on("connection", (socket) => {
  socket.on("reserve", async (data) => {
    const screenId = data.screenId;
    const seatNumber = Number(data.y) * 14 + Number(data.x);
    await db.Seat.update(
      { state: "reserved" },
      { where: { screen: screenId, seatNumber } }
    );
    io.sockets.emit("reserve", data);
  });
  socket.on("cancel", async (data) => {
    const screenId = data.screenId;
    const seatNumber = Number(data.y) * 14 + Number(data.x);
    await db.Seat.update(
      { state: "enable" },
      { where: { screen: screenId, seatNumber } }
    );
    io.sockets.emit("cancel", data);
  });
});
