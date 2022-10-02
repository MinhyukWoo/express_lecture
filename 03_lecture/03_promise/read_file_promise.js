const fs = require("fs").promises;
// 프로미스 방식
fs.readFile("../02_file/readme.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
