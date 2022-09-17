f1 = function () {
  console.log("1");
};
f1 = function () {
  console.log("2");
};
f1();

f2 = function () {
  console.log("1");
};
function f2() {
  console.log("2");
}
f2();

function f3() {
  console.log("1");
}
f3 = function () {
  console.log("2");
};
f3();

function f4() {
  console.log("1");
}
function f4() {
  console.log("2");
}
f4();
