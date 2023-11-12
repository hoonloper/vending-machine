const { InvalidError, ServerError } = require("../common/CustomError");
const { MODEL_KEY, STATUS, COMMAND } = require("../common/constant");
const { log, logDivider } = require("../common/utils");
const Card = require("../models/Card");
const Cash = require("../models/Cash");

class PaymentStage {
  #drink = null;
  #card = null;
  #cash = null;
  #type = null;

  do(command) {
    if (command !== COMMAND.IN_PROGRESS) {
      logDivider();
      log("잘못된 입력입니다.");
      log(`결제 진행 - '${COMMAND.IN_PROGRESS}', 끝내기 - '${COMMAND.END}'`);
      logDivider();
      return null;
    }

    return this.#payWith(this.#type);
  }

  #payWith(type) {
    const drink = this.#getDrink();
    const drinkPrice = drink.getPrice();
    let changeText = 0;

    if (type === MODEL_KEY.CARD) {
      const card = this.#getCard();
      card.increasePrice(drinkPrice);
      changeText = `- 현재까지 사용 금액: ${card.getPrice()}`;
    } else if (type === MODEL_KEY.CASH) {
      const cash = this.#getCash();
      if (!cash.checkPriceRange(drinkPrice)) {
        logDivider();
        log("🚨🚨🚨 금액 부족 🚨🚨🚨");
        logDivider();
        throw new ServerError(drinkPrice);
      }
      cash.decreasePrice(drinkPrice);
      changeText = `- 잔액: ${cash.getPrice()}원`;
    }
    drink.decreaseCount();
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

    const [drink, payment] = selectedStages;
    this.#setDrink(drink);
    if (Card.isCard(payment)) {
      this.#setCard(payment);
      this.#setType(MODEL_KEY.CARD);
    } else if (Cash.isCash(payment)) {
      this.#setCash(payment);
      this.#setType(MODEL_KEY.CASH);
    } else {
      throw new InvalidError(selectedStages);
    }
  }

  logMessage() {
    logDivider();
    log("결제 수단");
    const drink = this.#getDrink();
    let paymentChange = 0;
    let paymentMessage = "";
    // 카드 결제 메시지
    if (this.#getType() === MODEL_KEY.CARD) {
      const card = this.#getCard();
      logDivider(true);
      log("- 타입: 카드");
      const formattedNumber = card.formatNumber(
        card.maskNumber(card.getNumber())
      );
      log(`- 카드 번호: ${formattedNumber}`);
      log(`- 현재까지 사용한 금액: ${card.getPrice()}원`);
      paymentChange = "-";
      paymentMessage = `[${drink.getPrice()}원(카드사에 등록된 결제일에 결제될 예정)]`;
    }
    // 현금 결제 메시지
    if (this.#getType() === MODEL_KEY.CASH) {
      const cash = this.#getCash();
      console.log(cash);
      log("- 타입: 현금");
      log(`- 입력한 금액: ${cash.getPrice()}원`);
      paymentChange = cash.getPrice() - drink.getPrice();
      paymentMessage = `[${cash.getPrice()}원(현재 금액) - ${drink.getPrice()}원(음료)]`;
    }
    logDivider(true);
    log(`음료 정보`);
    log(`- 이름: ${drink.getName()}`);
    log(`- 가격: ${drink.getPrice()}원`);
    log("- 개수: 1개");

    log("\n결제 내역");
    log(`- 금액: ${drink.getPrice()}원`);
    log(`- 잔액: ${paymentChange}원`);
    log(paymentMessage);
    logDivider();
    log("⭐️ 결제 내역을 꼭 확인해 주세요.");
    log("결제 확정 - '진행'\n결제 종료 - '끝'");
    logDivider();
  }

  #getDrink() {
    return this.#drink;
  }
  #setDrink(drink) {
    this.#drink = drink;
  }
  #getCash() {
    return this.#cash;
  }
  #setCash(cash) {
    this.#cash = cash;
  }
  #getCard() {
    return this.#card;
  }
  #setCard(card) {
    this.#card = card;
  }
  #getType() {
    return this.#type;
  }
  #setType(type) {
    this.#type = type;
  }
}

module.exports = PaymentStage;
