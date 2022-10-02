const cluster = require("cluster");
const http = require("http");

const cpuCount = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  for (let index = 0; index < cpuCount; index++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log("code", code, "signal", signal);
    cluster.fork();
  });
} else {
  http
    .createServer((request, response) => {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.write("<h1>Hello Node!</h1>");
      response.end("<p>Hello Cluster!</p>");
      setTimeout(() => {
        process.exit(1);
      }, 1000);
    })
    .listen(8080);
  console.log(`${process.pid}번 워커 실행`);
}
