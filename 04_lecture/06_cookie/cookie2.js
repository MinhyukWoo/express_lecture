const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

const parseCookies = (cookie = "") => {
  cookie
    .split(";")
    .map((sentence) => sentence.split("="))
    .reduce((accumulator, [key, value]) => {
      accumulator[key.trim()] = decodeURIComponent(value);
      return accumulator;
    });
};

http
  .createServer(async (request, response) => {
    const cookies = parseCookies(request.headers.cookie);
    if (request.url.startsWith("/login")) {
      const { query } = url.parse(request.url);
      const { name } = qs.parse(query);
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
      response.writeHead(302, {
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )}; Expires=${expires.toString()}; HttpOnly: Path=/`,
      });
      response.end();
    } else if (cookies.name) {
      response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(`${cookies.name}님 안녕하세요`);
    } else {
      try {
        const data = await fs.readFile("./cookie2.html");
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.end(data);
      } catch (error) {
        response.writeHead(500, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        response.end(error.message);
      }
    }
  })
  .listen(8084, () => {
    console.log("서버 대기 중입니다.");
  });
