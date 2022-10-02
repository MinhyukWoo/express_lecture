const fs = require("fs");
const file = fs.createWriteStream("./big.txt");

for (let i = 0; i < 1000000; i++) {
  file.write("안녕하세요. 엄청나게 큰 파일입니다.\n");
}
file.end();
