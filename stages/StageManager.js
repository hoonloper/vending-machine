const DrinkStage = require("./DrinkStage");
const CardStage = require("./CardStage");
const CashStage = require("./CashStage");
const PaymentStage = require("./PaymentStage");

class StageManager {
  static STAGE_MAPPER = {
    구매: { key: "DRINK" },
    카드: { key: "CARD" },
    현금: { key: "CASH" },
    결제: { key: "PAYMENT" },
  };
  stage = null;
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
    this.stage.run();
    return this.stage;
  }

  static validStageKey(command) {
    const hasCommand = Object.keys(StageManager.STAGE_MAPPER).includes(command);
    if (!hasCommand) {
      throw Error("NOT_FOUND:COMMAND");
    }
  }
}

module.exports = StageManager;
