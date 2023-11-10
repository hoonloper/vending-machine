const DrinkManager = require("./drinks/DrinkManager");

class DrinkStage {
  drinkManager;
  selectedDrink;

  constructor() {
    this.drinkManager = new DrinkManager();
  }

  do(command) {
    if (this.drinkManager.getDrinkNameList().includes(command)) {
      const drink = this.drinkManager.getDrinkByName(command);
      this.setSelectedDrink(drink);
      console.log("구매를 희망하면 '네' 아니면 '아니오'를 입력해 주세요.");
    } else if ("네" === command) {
      console.log("결제 수단 선택 - 카드, 현금");
      return this.getSelectedDrink();
    } else if ("아니오" === command) {
      this.setSelectedDrink(null);
      return null;
    } else {
      console.log("음료 이름을 다시 입력해 주세요!");
    }
  }
  getSelectedDrink() {
    return this.selectedDrink;
  }
  setSelectedDrink(drink) {
    this.selectedDrink = drink;
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
      .map(
        (drink) =>
          `- ${drink.getName()}: ${drink.getPrice()}원 / ${drink.getCount()}개`
      )
      .join("\n");
    console.log(message);
    console.log("음료를 선택해 주세요.");
    console.log("======================================");
  }
}

module.exports = DrinkStage;
