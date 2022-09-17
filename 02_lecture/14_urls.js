const url = require("url");
const { URL } = url;
const myURL = new URL("http://www.gilbut.co.kr/");
console.log(myURL);
console.log(myURL.toString());
console.log("=====");
const parsedUrl = url.parse("http://www.gilbut.co.kr/")
console.log(parsedUrl);
console.log(parsedUrl.toString());

