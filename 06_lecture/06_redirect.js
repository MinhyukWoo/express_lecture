const express = require("express");

const app = express();

app.get("*", (request, response) => {
    response.redirect("http://www.naver.com");
})

app.listen(50000, () => {
    console.log("Server running at http://localhost:50000");
})