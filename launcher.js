const StageManager = require("./stage-manager");

class Launcher {
  command;
  stages = ["DRINK", "PAYMENT", "DONE"];
  stageIndex = 0;

  run() {
    const stageManager = new StageManager(this.stages[this.stageIndex]);
    const stage = stageManager.getStage();
    stage.run();
  }

  getAllowedCommand() {
    return ["DRINK", "콜라", "물", "커피", "현금", "카드"];
  }

  validCommand() {
    if (!this.getAllowedCommand().includes(this.command)) {
      throw Error("NOT_FOUND:COMMAND");
    }
  }

  setCommand(newCommand) {
    this.command = newCommand;
  }
}

module.exports = Launcher;
