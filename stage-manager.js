const DrinkStage = require("./drink-stage");

class StageManager {
  stage;
  constructor(type) {
    const stages = {
      DRINK: new DrinkStage(),
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
