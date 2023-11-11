const { InvalidError } = require("../common/CustomError");
const { validStrictNumber } = require("../common/utils");

class Cash {
  price;

  constructor(price) {
    if (!validStrictNumber(price)) {
      throw InvalidError("잘못된 현금");
    }
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
  hasPrice() {
    return validStrictNumber(this.getPrice()) && this.getPrice() > 0;
  }

  copy() {
    return new Cash(this.getPrice());
  }

  static isCash(cash) {
    return cash instanceof Cash;
  }
}

module.exports = Cash;
