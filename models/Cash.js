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
  checkPriceRange(price) {
    return typeof price === "number" && price >= 0 && this.price - price >= 0;
  }
}

module.exports = Cash;
