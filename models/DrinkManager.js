const Drink = require("./Drink");

class DrinkManager {
  drinkList;

  constructor(drinkList = []) {
    this.drinkList = drinkList;
    if (drinkList.length === 0) {
      this.addDrink("콜라", 1100, 15);
      this.addDrink("물", 600, 15);
      this.addDrink("커피", 700, 15);
    }
  }

  getDrinkNameList() {
    return this.drinkList.map((drink) => drink.getName());
  }
  getDrinkByName(name) {
    return this.drinkList.find((drink) => drink.getName() === name) ?? null;
  }
  getDrinkList() {
    return [...this.drinkList];
  }
  addDrink(name, price, count) {
    this.drinkList.push(new Drink(name, price, count));
  }
  clearDrinkList() {
    this.drinkList = [];
  }

  copy() {
    return new DrinkManager(this.getDrinkList().map((drink) => drink.copy()));
  }
}

module.exports = DrinkManager;
