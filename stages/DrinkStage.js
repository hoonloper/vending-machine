const { COMMAND } = require("../common/constant");
const { log, logDivider } = require("../common/utils");
const DrinkManager = require("../models/DrinkManager");

class DrinkStage {
  drinkManager;
  selectedDrink;

  constructor() {
    this.drinkManager = new DrinkManager();
  }

  do(command) {
    if (this.drinkManager.getDrinkNameList().includes(command)) {
      const drink = this.getDrinkManager().getDrinkByName(command);
      this.setSelectedDrink(drink);
      logDivider();
      log(
        `구매 희망 - '${COMMAND.IN_PROGRESS}'\n다시 선택 - '${COMMAND.RETRY}'`
      );
      logDivider();
    }
    if (COMMAND.IN_PROGRESS === command) {
      logDivider();
      log("결제 수단\n- '카드'\n- '현금'");
      logDivider();
      return this.getSelectedDrink();
    }
    if (COMMAND.RETRY === command) {
      this.setSelectedDrink(null);
      return null;
    }

    logDivider();
    log("해당 음료가 존재하지 않습니다.");
    logDivider();
  }
  getDrinkManager() {
    return this.drinkManager;
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
    if (this.getDrinkManager().getDrinkList().length <= 0) {
      logDivider();
      log("현재 자판기에 비치된 음료가 없습니다.");
      logDivider();
      return null;
    }
    const message = this.getDrinkManager()
      .getDrinkList()
      .map(
        (drink) =>
          `- ${drink.getName()}: ${drink.getPrice()}원 / ${drink.getCount()}개`
      )
      .join("\n");
    logDivider();
    log(message);
    logDivider();
  }

  copy() {
    const newDrinkManager = new DrinkManager();
    newDrinkManager.setSelectedDrink(this.getSelectedDrink());
    return newDrinkManager;
  }
}

module.exports = DrinkStage;
