const { odd, even } = require("./var");
const checkNumber = require("./func");

function checkStrngOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  } else return even;
}

console.log(checkNumber(100));
console.log(checkStrngOddOrEven("hello"));
