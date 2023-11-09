const Drink = require("./drink");

class DrinkManager {
  drinkList;

  constructor() {
    this.drinkList = [];
    this.addDrink("콜라", 1100);
    this.addDrink("물", 600);
    this.addDrink("커피", 700);
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
  getDrinkList() {
    return [...this.drinkList];
  }
  addDrink(name, price) {
    this.drinkList.push(new Drink(name, price));
  }
  clearDrinkList() {
    this.drinkList = [];
  }
}

module.exports = DrinkManager;
