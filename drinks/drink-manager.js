const Drink = require("./drink");

class DrinkManager {
  drinkList;

  constructor() {
    this.drinkList = [];
  }

  getDrinkNameList() {
    return this.drinkList.map((drink) => drink.getName());
  }
  getDrinkPriceByName(name) {
    return this.drinkList.find((drink) => drink.getName() === name) ?? null;
  }
  getDrinkNamesByPrice(price) {
    return this.drinkList.reduce((names, drink) => {
      if (drink.getPrice() === price) {
        names.push(drink.getName());
      }
      return names;
    }, []);
  }
  addDrink(name, price) {
    this.drinkList.push(new Drink(name, price));
  }
  clearDrinkList() {
    this.drinkList = [];
  }
}

module.exports = DrinkManager;
