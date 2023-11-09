class Drink {
  name;
  price;

  constructor(name, price) {
    this.name = name;
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
  setPrice(newPrice) {
    if (newPrice < 0) {
      throw Error("INVALID_PRICE");
    }
    this.price = newPrice;
  }
}
