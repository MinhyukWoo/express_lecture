const http = require("http");
const fs = require("fs").promises;

const users = {};

http
  .createServer(async (request, response) => {
    try {
      if (request.method === "GET") {
        if (request.url === "/") {
          const data = await fs.readFile("./restFont.html");
          response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
          });
          response.end(data);
        } else if (request.url === "/users") {
          response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
          });
          response.end(JSON.stringify(users));
        }
      } else if (request.method === "POST") {
        if (request.url === "/user") {
          let body = "";
          request.on("data", (data) => {
            body += data;
          });
          request.on("end", () => {
            console.log("POST body", body);
            const { name } = JSON.parse(body);
            const id = Date.now();
            users[id] = name;
            response.writeHead(201, {
              "Content-Type": "text/plain; charset=utf-8",
            });
            response.end("ok");
          });
        }
      }
    } catch (error) {
      console.error(error);
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(error.message);
    }
  })
  .listen(8080, () => {
    console.log("서버 대기 중입니다.");
  });
