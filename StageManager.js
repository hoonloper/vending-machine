const DrinkStage = require("./DrinkStage");
const CardStage = require("./CardStage");
const CashStage = require("./CashStage");

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
