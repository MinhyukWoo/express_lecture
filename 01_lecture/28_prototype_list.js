function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.print = function () {
  console.log(`${this.name}의 가격은 ${this.price}원입니다.`);
};

let products = [
  new Product("바나나", 1200),
  new Product("사과", 2000),
  new Product("배", 3000),
  new Product("고구마", 700),
  new Product("감자", 600),
  new Product("수박", 5000),
];

for (let product of products) {
  product.print();
}
