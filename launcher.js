const StageManager = require("./stages/StageManager");

class Launcher {
  stageManager = null;
  stageManagerHistory = [];

  constructor() {
    this.stageManager = new StageManager();
  }

  run(command) {
    return this.getStageManager().run(command.trim());
  }

  getStageManager() {
    return this.stageManager;
  }
  getStageManagerHistory() {
    return this.stageManagerHistory;
  }

  recordStageManager(stageManager) {
    this.getStageManagerHistory().push(stageManager);
  }

  newLauncher() {
    const beforeStageManager = this.getStageManager().copy();
    this.recordStageManager(beforeStageManager);
    this.getStageManager().initStage();
    return this;
  }
}

module.exports = Launcher;
