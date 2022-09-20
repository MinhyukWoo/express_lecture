const fs = require("fs");
// 콜백 방식
// 비동기처리
fs.readFile("./readme.txt", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("data:", data);
  console.log("data.toString():", data.toString());
});

// 동기처리
fs.readFileSync;
