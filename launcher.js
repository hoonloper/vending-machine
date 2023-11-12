const { log } = require("console");
const { logDivider } = require("./common/utils");
const StageManager = require("./stages/StageManager");
const Drink = require("./models/Drink");
const Cash = require("./models/Cash");
const Card = require("./models/Card");
const { STATUS } = require("./common/constant");

class Launcher {
  #stageManager = null;
  #stageManagerHistory = [];

  constructor() {
    this.#stageManager = new StageManager();
  }

  run(command) {
    const status = this.#getStageManager().run(command.trim());
    if (status === STATUS.COMPLETE) {
      this.#recordStageManager(this.#getStageManager().copy());
    }
    return status;
  }

  newLauncher() {
    this.#getStageManager().initStage();
    return this;
  }

  logUsageHistory() {
    const stageManagerHistory = this.#getStageManagerHistory();
    if (stageManagerHistory.length === 0) {
      return;
    }
    stageManagerHistory.forEach((history, index) => {
      logDivider();
      log(
        `📄 ${
          index === stageManagerHistory.length - 1
            ? "마지막"
            : `${index + 1}번째`
        } 사용 내역은\n`
      );

      let beforeDrinkPrice = 0;
      history.getSelectedStages().forEach((stage) => {
        if (Drink.isDrink(stage)) {
          log("[구매 음료 정보]");
          beforeDrinkPrice = stage.getPrice();
          log(`- 음료: ${stage.getName()}`);
          log(`- 가격: ${stage.getPrice()}원`);
        }
        if (Cash.isCash(stage)) {
          log("[현금 결제 정보]");
          log(`- 입력 금액: ${stage.getPrice() + beforeDrinkPrice}원`);
          log(`- 잔액: ${stage.getPrice()}원`);
        }
        if (Card.isCard(stage)) {
          log("[카드 결제 정보]");
          const info = stage.getInfo();
          log(`- 카드 번호: ${info.number}`);
          log(`- 만료일: ${info.expiredDate}`);
          log(`- 생년월일: ${info.birthDay}`);
          log(`- 사용 금액: ${info.price}원`);
        }
        log("\n");
      });

      log("입니다.");
    });
    logDivider();
  }

  #getStageManager() {
    return this.#stageManager;
  }
  #getStageManagerHistory() {
    return this.#stageManagerHistory;
  }

  #recordStageManager(stageManager) {
    this.#getStageManagerHistory().push(stageManager);
  }
}

module.exports = Launcher;
