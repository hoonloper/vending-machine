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

  stages = {
    DRINK: new DrinkStage(),
    CARD: new CardStage(),
    CASH: new CashStage(),
    PAYMENT: new PaymentStage(),
  };
  stage = null;
  status = STATUS.IN_PROGRESS;
  selectedStages = [];

  constructor(type = MODEL_KEY.DRINK, selectedStages = []) {
    this.setStage(this.getStages()[type] ?? null);
    if (this.getStage() === null) {
      throw Error("INVALID:TYPE");
    }
    if (selectedStages.length === 0) {
      this.getStage().run();
    } else {
      this.setSelectedStages(selectedStages);
    }
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
    const updatedStatus = this.getStatus();
    return updatedStatus === STATUS.COMPLETE ? updatedStatus : null;
  }

  nextStage(key) {
    this.setStage(this.getStages()[key]);

    if (key === MODEL_KEY.PAYMENT) {
      this.getStage().init(this.getSelectedStages());
    }

    this.getStage().run();
    this.setStatus(STATUS.IN_PROGRESS);
  }

  progressStage(command) {
    const response = this.getStage().do(command);
    if (response === STATUS.COMPLETE) {
      this.setStatus(STATUS.COMPLETE);
      return null;
    }
    if (![null, undefined].includes(response)) {
      this.addSelectedStage(response);
      this.setStatus(STATUS.DONE);
    }
  }

  copy() {
    const beforeSelectedStages = this.getSelectedStages().map((stage) =>
      stage.copy()
    );
    const newStageManager = new StageManager(
      MODEL_KEY.DRINK,
      beforeSelectedStages
    );
    newStageManager.setStatus(STATUS.COMPLETE);
    newStageManager.setStage(this.getStage());
    return newStageManager;
  }

  initStage() {
    this.setStage(this.getStages()[MODEL_KEY.DRINK]);
    this.getStage().logMessage();
    this.setStatus(STATUS.IN_PROGRESS);
    this.setSelectedStages([]);
  }

  getStatus() {
    return this.status;
  }
  setStatus(status) {
    this.status = status;
  }
  getStage() {
    return this.stage;
  }
  setStage(stage) {
    this.stage = stage;
  }
  getStages() {
    return this.stages;
  }
  setStages(stages) {
    this.stages = stages;
  }
  getSelectedStages() {
    return this.selectedStages;
  }
  setSelectedStages(selectedStages) {
    this.selectedStages = selectedStages;
  }
  addSelectedStage(stage) {
    this.getSelectedStages().push(stage);
  }

  validStageKey(key) {
    const hasKey = Object.keys(StageManager.STAGE_MAPPER).includes(key);
    if (!hasKey) {
      throw Error("NOT_FOUND:COMMAND");
    }
  }
}

module.exports = StageManager;
