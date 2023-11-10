const DrinkStage = require("./DrinkStage");
const CardStage = require("./CardStage");
const CashStage = require("./CashStage");
const PaymentStage = require("./PaymentStage");

class StageManager {
  stage;
  constructor(type, selectedList) {
    const stages = {
      DRINK: new DrinkStage(),
      CARD: new CardStage(),
      CASH: new CashStage(),
      PAYMENT: new PaymentStage(selectedList),
    };
    this.stage = stages[type] ?? null;
  }

  getStage() {
    return this.stage;
  }
}

module.exports = StageManager;
