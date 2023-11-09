const DrinkStage = require("./drink-stage");
const CardStage = require("./card-stage");
const CashStage = require("./cash-stage");

class StageManager {
  stage;
  constructor(type) {
    const stages = {
      DRINK: new DrinkStage(),
      CARD: new CardStage(),
      CASH: new CashStage(),
      PAYMENT: "",
      DONE: "",
    };
    this.stage = stages[type];
  }

  getStage() {
    return this.stage;
  }
}

module.exports = StageManager;
