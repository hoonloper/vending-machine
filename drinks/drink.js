class Drink {
  name;
  price;
  count;

  constructor(name, price, count) {
    this.name = name;
    if (price < 0) {
      throw Error("INVALID:PRICE");
    }
    this.price = price;
    if (count < 0) {
      throw Error("INVALID:COUNT");
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
  sold() {
    if (this.count <= 0) {
      return null;
    }
    this.count--;
  }
}

module.exports = Drink;
