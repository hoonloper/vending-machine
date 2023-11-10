const StageManager = require("./stages/StageManager");

class Launcher {
  stageManager = null;
  stageManagerHistory = [];

  constructor() {
    this.stageManager = new StageManager();
  }

  run(command) {
    return this.stageManager.run(command);
  }

  recordStageManager() {
    this.stageManagerHistory.push(this.stageManager);
  }

  static newLauncher() {
    this.recordStageManager();
    return this;
  }
}

module.exports = Launcher;
