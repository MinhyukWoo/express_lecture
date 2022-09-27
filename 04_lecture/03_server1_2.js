const http = require("http");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
    response.write("<h1>Hello Node!</h1>");
    response.end("<p>Hello 8080 Server!</p>");
  })
  .listen(8080, () => {
    console.log("8080번 포트에서 서버 대기 중입니다.");
  });

http
  .createServer((request, response) => {
    response.writeHead(200, { "Cotent-Type": "text/html; charset=utf-8" });
    response.write("<h1>Hello Node!</h1>");
    response.end("<p>Hello 8081 Server!</p>");
  })
  .listen(8081, () => {
    console.log("8081번 포트에서 서버 대기 중입니다.");
  });
