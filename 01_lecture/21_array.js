const array = ["node.js", {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[3];

var [node, obj, , bool] = array;
console.log(node, obj, bool);
