const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  let output = "";
  output += '<form method="post">';
  output += '  <input type="text" name="a" />';
  output += '  <input type="text" name="b" />';
  output += '  <input type="submit" />';
  output += "</form>";
  response.send(output);
});

app.post("/", (request, response) => {
  response.send(request.body);
});

app.listen(50000, () => {
  console.log("Server running at http://localhost:50000");
});
