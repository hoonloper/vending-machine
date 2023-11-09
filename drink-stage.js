const DrinkManager = require("./drinks/drink-manager");

class DrinkStage {
  drinkManager;

  constructor() {
    this.drinkManager = new DrinkManager();
  }

  run() {
    this.logMessage();
  }

  logMessage() {
    if (this.drinkManager.getDrinkList().length <= 0) {
      console.log("현재 자판기에 비치된 음료가 없습니다.");
      return;
    }
    const message = this.drinkManager
      .getDrinkList()
      .map((drink) => `- ${drink.getName()}: ${drink.getPrice()}원`)
      .join("\n");
    console.log(message);
    console.log("음료를 선택해 주세요.");
    console.log("======================================");
  }
}

module.exports = DrinkStage;
