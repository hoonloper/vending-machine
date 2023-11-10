const { COMMAND } = require("../common/constant");
const { log } = require("../common/utils");
const DrinkManager = require("../models/DrinkManager");

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
      log(
        `구매 희망 - '${COMMAND.IN_PROGRESS}'\n다시 선택 - '${COMMAND.RETRY}'`
      );
    } else if (COMMAND.IN_PROGRESS === command) {
      log("결제 수단 - '카드' 또는 '현금'");
      return this.getSelectedDrink();
    } else if (COMMAND.RETRY === command) {
      this.setSelectedDrink(null);
      return null;
    } else {
      log("해당 음료가 존재하지 않습니다.");
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
      log("현재 자판기에 비치된 음료가 없습니다.");
      return;
    }
    const message = this.drinkManager
      .getDrinkList()
      .map(
        (drink) =>
          `- ${drink.getName()}: ${drink.getPrice()}원 / ${drink.getCount()}개`
      )
      .join("\n");
    log(message);
    log("어떤 음료를 고르시겠어요?\n시원한 콜라는 어떠신가요?");
    log("======================================");
  }
}

module.exports = DrinkStage;
