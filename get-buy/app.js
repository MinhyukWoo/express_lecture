var fs = require("fs");
var ejs = require("ejs");
var http = require("http");
var express = require("express");

var counter = 0;
function Product(name, image, price, count) {
  this.index = counter++;
  this.name = name;
  this.image = image;
  this.price = price;
  this.count = count;
}

var products = [
  new Product("JavaScript", "test.jpg", 28000, 30),
  new Product("jQuery", "test.jpg", 28000, 30),
  new Product("Node.js", "test.jpg", 32000, 30),
  new Product("Socket.io", "test.jpg", 17000, 30),
  new Product("Connect", "test.jpg", 18000, 30),
  new Product("Express", "test.jpg", 31000, 30),
  new Product("EJS", "test.jpg", 12000, 30),
];

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + "/public"));
app.get("/", (request, response) => {
  var htmlPage = fs.readFileSync("HTMLPage.html", "utf8");

  response.send(
    ejs.render(htmlPage, {
      products: products,
    })
  );
});
server.listen(52273, () => {
  console.log("Server listening at http://localhost:52273");
});

var io = require("socket.io")(server);

io.on("connection", (socket) => {
  function onReturn(index) {
    products[index].count++;
    clearTimeout(cart[index].timerID);
    delete cart[index];
    io.sockets.emit("count", {
      index: index,
      count: products[index].count,
    });
  }

  var cart = {};

  socket.on("cart", (index) => {
    console.log(index);
    products[index].count--;
    cart[index] = {};
    cart[index].index = index;
    cart[index].timerID = setTimeout(() => {
      onReturn(index);
    }, 1000 * 60 * 10);
    io.sockets.emit("count", {
      index: index,
      count: products[index].count,
    });
  });
  socket.on("buy", (index) => {
    clearTimeout(cart[index].timerID);
    delete cart[index];
    io.sockets.emit("count", {
      index: index,
      count: products[index].count,
    });
  });
  socket.on("return", (index) => {
    onReturn(index);
  });
});
