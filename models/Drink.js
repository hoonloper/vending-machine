const { InvalidError } = require("../common/CustomError");
const { validStrictNumber, validFilledString } = require("../common/utils");

class Drink {
  name;
  price;
  count;

  constructor(name, price = 0, count = 0) {
    if (!validFilledString(name)) {
      throw new InvalidError(name);
    }
    this.name = name;
    if (!validStrictNumber(price) || price < 0) {
      throw new InvalidError(price);
    }
    this.price = price;
    if (!validStrictNumber(count) || count < 0) {
      throw new InvalidError(count);
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

  static isDrink(drink) {
    return drink instanceof Drink;
  }
}

module.exports = Drink;
