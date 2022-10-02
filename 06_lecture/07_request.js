const express = require("express");

const app = express();

app.get("*", (request, response) => {
  console.log(request.query);
  response.send(request.query);
});

app.listen(50000, () => {
  console.log("Server running at http://localhost:50000");
});
// http://localhost:50000?a=20&b=10

// 프로토콜: 통신에 사용되는 규칙
// 호스트: 서버의 위치
// URL: 서버 내부에서 라우트 위치
// 요청 매개변수: 추가적인 정보
