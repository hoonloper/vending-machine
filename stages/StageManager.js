const DrinkStage = require("./DrinkStage");
const CardStage = require("./CardStage");
const CashStage = require("./CashStage");
const PaymentStage = require("./PaymentStage");
const { STATUS, MODEL_KEY } = require("../common/constant");

class StageManager {
  static STAGE_MAPPER = {
    카드: { key: MODEL_KEY.CARD },
    현금: { key: MODEL_KEY.CASH },
    결제: { key: MODEL_KEY.PAYMENT },
  };

  stages = null;
  stage = null;
  status = STATUS.IN_PROGRESS;
  selectedList = [];

  constructor(type = MODEL_KEY.DRINK) {
    const stages = {
      DRINK: new DrinkStage(),
      CARD: new CardStage(),
      CASH: new CashStage(),
      PAYMENT: new PaymentStage(),
    };
    this.stages = stages;
    this.stage = stages[type] ?? null;
    if (this.stage === null) {
      throw Error("INVALID:TYPE");
    }
    this.stage.run();
  }

  run(command) {
    const status = this.getStatus();
    if (status === STATUS.IN_PROGRESS) {
      this.progressStage(command);
    } else if (status === STATUS.DONE) {
      this.validStageKey(command);

      const key = StageManager.STAGE_MAPPER[command].key;
      this.nextStage(key);
    }
    return status === STATUS.COMPLETE ? status : null;
  }

  nextStage(key) {
    this.stage = this.stages[key];

    if (key === MODEL_KEY.PAYMENT) {
      this.stage.init(this.selectedList);
    }

    this.stage.run();
    this.setStatus(STATUS.IN_PROGRESS);
  }

  progressStage(command) {
    const response = this.stage.do(command);
    if (response === STATUS.COMPLETE) {
      this.setStatus(STATUS.COMPLETE);
      return null;
    }
    if (![null, undefined].includes(response)) {
      this.selectedList.push(response);
      this.setStatus(STATUS.DONE);
    }
  }

  initStage() {
    this.stage = this.stages[MODEL_KEY.DRINK];
  }

  getStatus() {
    return this.status;
  }
  setStatus(status) {
    this.status = status;
  }

  validStageKey(key) {
    const hasKey = Object.keys(StageManager.STAGE_MAPPER).includes(key);
    if (!hasKey) {
      throw Error("NOT_FOUND:COMMAND");
    }
  }
}

module.exports = StageManager;
