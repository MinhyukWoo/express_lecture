const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (request, result) => {
    try {
      const data = await fs.readFile("./server2.html");
      result.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      result.end(data);
    } catch (error) {
      console.error(error);
      result.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      result.end(error.message);
    }
  })
  .listen(8080, () => {
    console.log("8080번 포트에서 서버 대기 중입니다.");
  });
