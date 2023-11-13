const { InvalidError } = require("../common/CustomError");
const { COMMAND } = require("../common/constant");
const {
  log,
  getLoggingDivider,
  addLineBreakOfTexts,
} = require("../common/utils");
const Drink = require("../models/Drink");
const DrinkManager = require("../models/DrinkManager");

class DrinkStage {
  #drinkManager;
  #selectedDrink = null;

  constructor() {
    this.#drinkManager = new DrinkManager();
  }

  run() {
    return this.logMessage();
  }

  logMessage() {
    const divider = getLoggingDivider();
    const drinkList = this.#getDrinkManager().getDrinkList();
    const message =
      drinkList.length <= 0
        ? "현재 자판기에 비치된 음료가 없습니다."
        : drinkList
            .map(
              (drink) =>
                `- ${drink.getName()}: ${drink.getPrice()}원 / ${drink.getCount()}개`
            )
            .join("\n");

    log(addLineBreakOfTexts(divider, message, divider));

    return null;
  }

  do(command) {
    const drink = this.#getDrinkManager().getDrinkByName(command);
    const divider = getLoggingDivider();

    return !Drink.isDrink(drink)
      ? logNotDrink()
      : drink.hasCount()
      ? this.#execute(drink)
      : logSoldOutDrink();

    function logNotDrink() {
      log(
        addLineBreakOfTexts(divider, "음료 이름을 다시 입력해 주세요.", divider)
      );

      return null;
    }
    function logSoldOutDrink() {
      log(
        addLineBreakOfTexts(
          divider,
          `${drink.getName()}은(는) 품절입니다. 다른 음료를 선택해 주세요.`,
          divider
        )
      );

      return null;
    }
  }

  #execute(drink) {
    this.setSelectedDrink(drink);

    const divder = getLoggingDivider();
    log(addLineBreakOfTexts(divder, "결제 수단\n- '카드'\n- '현금'", divder));

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
