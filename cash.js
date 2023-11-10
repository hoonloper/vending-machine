class Cash {
  price;

  // TODO: 검증 코드 붙이기
  constructor(price) {
    this.price = price;
  }

  getPrice() {
    return this.price;
  }
  increase(price) {
    this.price += price;
  }
  decrease(price) {
    if (this.price - price < 0) {
      throw Error("INVALID:PRICE");
    }
    this.price -= price;
  }
}

module.exports = Cash;
