const express = require("express");

const app = express();

app.get("*", (request, response) => {
  response.status(404);
  response.set("methodA", "ABCDE");
  response.set({
    methodB1: "FGHIJ",
    methodB2: "KLMNO",
  });
  response.send("내 마음대로 본문을 입력합니다.");
});

app.listen(50000, () => {
  console.log("Server running at http://localhost:50000");
});

// status(): 상태를 제공한다.
// set(): 헤더를 설정한다.
// send(): 데이터 본문을 제공한다. 가장 마지막에 실행되야 한다.
