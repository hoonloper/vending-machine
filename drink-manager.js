class DrinkManager {
  drinkList;

  constructor() {
    this.drinkList = new Map();
  }

  getDrinkNameList() {
    const keys = [];

    for (const key of this.drinkList.keys()) {
      keys.push(key);
    }

    return keys;
  }
  getDrinkPriceByName(name) {
    return this.drinkList.get(name) ?? null;
  }
  getDrinkNamesByPrice(price) {
    const names = [];

    for (const [name, _price] of this.drinkList.entries()) {
      if (price === _price) {
        names.push(name);
      }
    }

    return names;
  }
  setNewDrink(name, price) {
    this.drinkList.set(name, price);
  }
  clearDrinkList() {
    this.drinkList.clear();
  }
}
