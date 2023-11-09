class Drink {
  name;
  price;

  constructor(name, price) {
    this.name = name;
    if (price < 0) {
      throw Error("INVALID_PRICE");
    }
    this.price = price;
  }

  getName() {
    return this.name;
  }
  getPrice() {
    return this.price;
  }
  setName(newName) {
    this.name = newName;
  }
}

module.exports = Drink;
