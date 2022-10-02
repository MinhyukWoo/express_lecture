const express = require("express");

const app = express();

app.get("/page/:id", (request, response) => {
  const id = request.params.id;
  response.send(`<h1>${id} Page</h1>`);
});

app.listen(50000, () => {
  console.log("Server running at http://localhost:50000");
});
