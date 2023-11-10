const StageManager = require("./StageManager");

class Launcher {
  selectedFromStage = [];
  STAGE_MAPPER = {
    구매: { key: "DRINK" },
    카드: { key: "CARD" },
    현금: { key: "CASH" },
    결제: { key: "PAYMENT" },
  };
  command = null;
  status = "DONE";
  stage = null;

  run() {
    if (this.command === "끝") {
      return this.closeLauncher();
    }
    switch (this.status) {
      case "IN_PROGRESS": {
        this.runInprogress();
        break;
      }
      case "DONE": {
        this.runDone();
        break;
      }
      case "END": {
        return this.closeLauncher();
      }
      default: {
        throw Error("NOT_FOUND:STATUS");
      }
    }
  }

  closeLauncher() {
    return "END";
  }

  // 스테이지가 진행중이라면 명령어를 주입해준다.
  runInprogress() {
    const response = this.stage.do(this.command);

    // 스테이지의 값을 응답받으면 완료처리한다.
    if (![null, undefined].includes(response)) {
      this.status = "DONE";
      this.selectedFromStage.push(response);
      console.log(this.selectedFromStage);
    }
  }

  // 스테이지가 완료되면 다음 스테이지를 설정한다.
  runDone() {
    this.validStageMapper();

    const stageKey = this.STAGE_MAPPER[this.command].key;
    const stageManager = new StageManager(stageKey);
    const stage = stageManager.getStage();
    if (stage === "END") {
      this.status === stage;
      return;
    }
    this.stage = stage;
    stage.run();
    this.status = "IN_PROGRESS";
  }

  validStageMapper() {
    const hasCommand = Object.keys(this.STAGE_MAPPER).includes(this.command);
    if (!hasCommand) {
      throw Error("NOT_FOUND:COMMAND");
    }
  }

  getAllowedCommand() {
    return ["DRINK", "구매", "콜라", "물", "커피", "현금", "카드", "끝"];
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
