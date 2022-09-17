function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.print = function () {
  console.log(`${this.name}의 가격은 ${this.price}원입니다.`);
};

let product = new Product("바나나", 1200);
product.print();
