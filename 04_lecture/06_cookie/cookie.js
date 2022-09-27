const http = require("http");

http
  .createServer((request, response) => {
    console.log(request.url, request.headers.cookie);
    response.writeHead(200, { "Set-Cookie": "mycookie=test" });
    response.end("Hello Cookie");
  })
  .listen(8083, () => {
    console.log("8083번 포트에서 서버 대기 중입니다.");
  });
