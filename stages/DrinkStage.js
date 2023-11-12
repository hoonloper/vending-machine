const { InvalidError } = require("../common/CustomError");
const { COMMAND } = require("../common/constant");
const { log, logDivider } = require("../common/utils");
const Drink = require("../models/Drink");
const DrinkManager = require("../models/DrinkManager");

class DrinkStage {
  #drinkManager;
  #selectedDrink = null;

  constructor() {
    this.#drinkManager = new DrinkManager();
  }

  do(command) {
    const drink = this.#getDrinkManager().getDrinkByName(command);
    if (Drink.isDrink(drink)) {
      this.setSelectedDrink(drink);
      logDivider();
      log(
        `구매 희망 - '${COMMAND.IN_PROGRESS}'\n다시 선택 - '${COMMAND.RETRY}'`
      );
      logDivider();
      return null;
    }
    if (!Drink.isDrink(this.#getSelectedDrink())) {
      throw new InvalidError(command);
    }
    if (COMMAND.IN_PROGRESS === command) {
      logDivider();
      log("결제 수단\n- '카드'\n- '현금'");
      logDivider();
      return this.#getSelectedDrink();
    }
    if (COMMAND.RETRY === command) {
      this.setSelectedDrink(null);
      this.logMessage();
      return null;
    }

    throw new InvalidError(command);
  }
  #getDrinkManager() {
    return this.#drinkManager;
  }
  #getSelectedDrink() {
    return this.#selectedDrink;
  }
  setSelectedDrink(drink) {
    this.#selectedDrink = drink;
  }

  run() {
    this.logMessage();
  }

  logMessage() {
    if (this.#getDrinkManager().getDrinkList().length <= 0) {
      logDivider();
      log("현재 자판기에 비치된 음료가 없습니다.");
      logDivider();
      return null;
    }
    const message = this.#getDrinkManager()
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
    newDrinkManager.setSelectedDrink(this.#getSelectedDrink());
    return newDrinkManager;
  }
}

module.exports = DrinkStage;
