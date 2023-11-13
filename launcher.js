const { log } = require("console");
const { addLineBreakOfTexts, getLoggingDivider } = require("./common/utils");
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

    let beforeDrinkPrice = 0;
    const usageHistory = stageManagerHistory
      .map((history, index) => {
        const historyTitle = `📄 ${
          index === stageManagerHistory.length - 1
            ? "마지막"
            : `${index + 1}번째`
        } 사용 내역은\n`;
        const historyText = history
          .getSelectedStages()
          .map(getStageTextMaker)
          .join("\n");
        const historyClosing = "입니다.";

        return addLineBreakOfTexts(
          getLoggingDivider(),
          historyTitle,
          historyText,
          historyClosing
        );
      })
      .join("\n");
    log(addLineBreakOfTexts(usageHistory, getLoggingDivider()));

    function getStageTextMaker(stage) {
      return Drink.isDrink(stage)
        ? makeDrinkText(stage)
        : Cash.isCash(stage)
        ? makeCashText(stage)
        : Card.isCard(stage)
        ? makeCardText(stage)
        : "알 수 없는 에러";
    }
    function makeDrinkText(stage) {
      beforeDrinkPrice = stage.getPrice();
      const title = "[구매 음료 정보]";
      const name = `- 음료: ${stage.getName()}`;
      const price = `- 가격: ${stage.getPrice()}원`;
      return addLineBreakOfTexts(title, name, price, "\n");
    }
    function makeCashText(stage) {
      const title = "[현금 결제 정보]";
      const inputPrice = `- 입력 금액: ${
        stage.getPrice() + beforeDrinkPrice
      }원`;
      const change = `- 잔액: ${stage.getPrice()}원`;
      return addLineBreakOfTexts(title, inputPrice, change);
    }
    function makeCardText(stage) {
      const title = "[카드 결제 정보]";
      const number = `- 카드 번호: ${stage.getInfo().number}`;
      const expiredDate = `- 만료일: ${stage.getInfo().expiredDate}`;
      const birthDay = `- 생년월일: ${stage.getInfo().birthDay}`;
      const price = `- 사용 금액: ${stage.getInfo().price}원`;
      return addLineBreakOfTexts(title, number, expiredDate, birthDay, price);
    }
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
