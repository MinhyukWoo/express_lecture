const express = require("express");

const app = express();

app.use((request, response) => {
  response.send("<h1>Hello express</h1>");
});

app.listen(50000, () => {
  console.log("Server running at http://localhost:50000");
});
