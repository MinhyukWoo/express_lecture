const http = require("http");

const server = http.createServer((request, result) => {
  result.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  result.write("<h1>Hello Node!</h1>");
  result.end("<p>Hello Server!</p1>");
});
server.listen(8080);

server.on("listening", () => {
  console.log("8080번 포트에서 서버 대기 중입니다~");
});
server.on("error", (error) => {
  console.error(error);
});
