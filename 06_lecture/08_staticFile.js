const express = require("express")

const app = express()

app.use(express.static("public"));

app.get("*", (request, response) => {
    response.send(404);
    response.send("해당 경로에 아무것도 없습니다.")
})

app.listen(50000, () => {
    console.log("Server running at http://localhost:50000");
})