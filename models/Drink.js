const { InvalidError } = require("../common/CustomError");
const { validStrictNumber, validFilledString } = require("../common/utils");

class Drink {
  name = "";
  price = 0;
  count = 0;

  constructor(name, price = 0, count = 0) {
    if (!validFilledString(name)) {
      throw InvalidError("음료 이름");
    }
    this.name = name;
    if (!validStrictNumber(price) || price < 0) {
      throw InvalidError("음료 가격");
    }
    this.price = price;
    if (!validStrictNumber(count) || count < 0) {
      throw InvalidError("음료 개수");
    }
    this.count = count;
  }

  getName() {
    return this.name;
  }
  getPrice() {
    return this.price;
  }
  getCount() {
    return this.count;
  }
  setName(newName) {
    this.name = newName;
  }
  decreaseCount() {
    this.count--;
  }
  sold() {
    if (this.getCount() <= 0) {
      return null;
    }
    this.count--;
  }

  copy() {
    return new Drink(this.getName(), this.getPrice(), this.getCount());
  }
}

module.exports = Drink;
