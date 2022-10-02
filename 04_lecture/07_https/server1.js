const http = require("http");

http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.write("<h1>Hello Node!</h1>");
  response.end("<p>Hello Server!</p>");
}).listen(8080, ()=>{
    console.log("http://localhost:8080 서버 대기 중입니다.");
})
