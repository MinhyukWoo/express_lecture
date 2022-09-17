const path = require("path");

console.log(path.sep);
console.log(path.delimiter);

const file = __filename;
console.log(path.dirname(file));
console.log(path.extname(file));
console.log(path.basename(file));
console.log(path.basename(file, path.extname(file)));
console.log("=====");
console.log(path.parse(file));