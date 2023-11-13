const Drink = require("./Drink");

class DrinkManager {
  #drinkList;

  constructor(drinkList = []) {
    this.#drinkList = drinkList;
    if (drinkList.length === 0) {
      this.#initDrinkList();
    }
  }
  #initDrinkList() {
    this.#addDrink("콜라", 1100, 3);
    this.#addDrink("물", 600, 3);
    this.#addDrink("커피", 700, 3);
  }
  getDrinkList() {
    return this.#drinkList;
  }
  getDrinkNameList() {
    return this.getDrinkList().map((drink) => drink.getName());
  }
  getDrinkByName(name) {
    return (
      this.getDrinkList().find((drink) => drink.getName() === name) ?? null
    );
  }
  #addDrink(name, price, count) {
    this.getDrinkList().push(new Drink(name, price, count));
  }

  copy() {
    return new DrinkManager(this.getDrinkList().map((drink) => drink.copy()));
  }
}

module.exports = DrinkManager;
