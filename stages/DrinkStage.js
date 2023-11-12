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

  run() {
    this.logMessage();
  }

  logMessage() {
    logDivider();
    const drinkList = this.#getDrinkManager().getDrinkList();
    if (drinkList.length <= 0) {
      log("현재 자판기에 비치된 음료가 없습니다.");
    } else {
      const message = drinkList
        .map(
          (drink) =>
            `- ${drink.getName()}: ${drink.getPrice()}원 / ${drink.getCount()}개`
        )
        .join("\n");
      log(message);
    }
    logDivider();

    return null;
  }

  do(command) {
    const drink = this.#getDrinkManager().getDrinkByName(command);
    return Drink.isDrink(drink)
      ? this.#execute(drink)
      : (logDivider(), log("음료 이름을 다시 입력해 주세요."), logDivider());
  }

  #execute(drink) {
    this.setSelectedDrink(drink);
    logDivider();
    log("결제 수단\n- '카드'\n- '현금'");
    logDivider();
    return this.#getSelectedDrink();
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

  copy() {
    const newDrinkManager = new DrinkManager();
    newDrinkManager.setSelectedDrink(this.#getSelectedDrink());
    return newDrinkManager;
  }
}

module.exports = DrinkStage;
