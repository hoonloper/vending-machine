const { InvalidError, ServerError } = require("../common/CustomError");
const { MODEL_KEY, STATUS, COMMAND } = require("../common/constant");
const { log, logDivider } = require("../common/utils");
const Card = require("../models/Card");
const Cash = require("../models/Cash");

class PaymentStage {
  drink = null;
  card = null;
  cash = null;
  type = null;

  do(command) {
    if (command !== COMMAND.IN_PROGRESS) {
      logDivider();
      log("잘못된 입력입니다.");
      log(`결제 진행 - '${COMMAND.IN_PROGRESS}', 끝내기 - '${COMMAND.END}'`);
      logDivider();
      return null;
    }

    return this.payWith(this.type);
  }

  payWith(type) {
    const drinkPrice = this.drink.getPrice();
    let changeText = 0;

    if (type === MODEL_KEY.CARD) {
      this.card.increasePrice(drinkPrice);
      changeText = `- 현재까지 사용 금액: ${this.card.getPrice()}`;
    } else if (type === MODEL_KEY.CASH) {
      if (!this.cash.checkPriceRange(drinkPrice)) {
        logDivider();
        log("🚨🚨🚨 금액 부족 🚨🚨🚨");
        logDivider();
        throw new ServerError(drinkPrice);
      }
      this.cash.decreasePrice(drinkPrice);
      changeText = `- 잔액: ${this.cash.getPrice()}원`;
    }
    this.drink.decreaseCount();
    logDivider();
    log("결제가 완료되었습니다.");
    log("\n결제 내역");
    log(`- 금액: ${drinkPrice}원`);
    log(changeText);
    logDivider();
    return STATUS.COMPLETE;
  }

  run() {
    this.logMessage();
  }

  init(selectedStages) {
    if (!Array.isArray(selectedStages) || selectedStages.length !== 2) {
      return null;
    }

    this.drink = selectedStages[0];
    if (Card.isCard(selectedStages[1])) {
      this.card = selectedStages[1];
      this.type = MODEL_KEY.CARD;
    } else if (Cash.isCash(selectedStages[1])) {
      this.cash = selectedStages[1];
      this.type = MODEL_KEY.CASH;
    } else {
      throw new InvalidError(selectedStages);
    }
  }

  logMessage() {
    logDivider();
    log("결제 수단");
    let paymentChange = 0;
    let paymentMessage = "";
    // 카드 결제 메시지
    if (this.type === MODEL_KEY.CARD) {
      logDivider(true);
      log("- 타입: 카드");
      const formattedNumber = this.card.formatNumber(
        this.card.maskNumber(this.card.getNumber())
      );
      log(`- 카드 번호: ${formattedNumber}`);
      log(`- 현재까지 사용한 금액: ${this.card.getPrice()}원`);
      paymentChange = "-";
      paymentMessage = `[${this.drink.getPrice()}원(카드사에 등록된 결제일에 결제될 예정)]`;
    }
    // 현금 결제 메시지
    if (this.type === MODEL_KEY.CASH) {
      log("- 타입: 현금");
      log(`- 입력한 금액: ${this.cash.getPrice()}원`);
      paymentChange = this.cash.getPrice() - this.drink.getPrice();
      paymentMessage = `[${this.cash.getPrice()}원(현재 금액) - ${this.drink.getPrice()}원(음료)]`;
    }
    logDivider(true);
    log(`음료 정보`);
    log(`- 이름: ${this.drink.getName()}`);
    log(`- 가격: ${this.drink.getPrice()}원`);
    log("- 개수: 1개");

    log("\n결제 내역");
    log(`- 금액: ${this.drink.getPrice()}원`);
    log(`- 잔액: ${paymentChange}원`);
    log(paymentMessage);
    logDivider();
    log("⭐️ 결제 내역을 꼭 확인해 주세요.");
    log("결제 확정 - '진행'\n결제 종료 - '끝'");
    logDivider();
  }
}

module.exports = PaymentStage;
