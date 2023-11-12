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

  run() {
    this.logMessage();
  }

  logMessage() {
    const drink = this.#getDrink();
    const type = this.#getType();

    logDivider();
    log("결제 수단");

    logDivider(true);
    const { change, message } =
      type === MODEL_KEY.CARD
        ? this.#logCardPayment(drink)
        : type === MODEL_KEY.CASH
        ? this.#logCashPayment(drink)
        : { change: "0", message: "" };
    logDivider(true);

    log(`음료 정보`);
    log(`- 이름: ${drink.getName()}`);
    log(`- 가격: ${drink.getPrice()}원`);
    log("- 개수: 1개");

    log("\n결제 내역");
    log(`- 금액: ${drink.getPrice()}원`);
    log(`- 잔액: ${change}원`);
    log(message);

    logDivider();
    log("⭐️ 결제 내역을 꼭 확인해 주세요.");
    log("결제 확정 - '진행'\n결제 종료 - '끝'");
    logDivider();
  }

  #logCardPayment(drink) {
    const card = this.#getCard();
    const formattedNumber = card.formatNumber(
      card.maskNumber(card.getNumber())
    );

    logDivider(true);
    log("- 타입: 카드");
    log(`- 카드 번호: ${formattedNumber}`);
    log(`- 현재까지 사용한 금액: ${card.getPrice()}원`);

    return {
      change: "-",
      message: `[${drink.getPrice()}원(카드사에 등록된 결제일에 결제될 예정)]`,
    };
  }

  #logCashPayment(drink) {
    const cash = this.#getCash();
    log("- 타입: 현금");
    log(`- 입력한 금액: ${cash.getPrice()}원`);
    return {
      change: `${cash.getPrice() - drink.getPrice()}`,
      message: `[${cash.getPrice()}원(현재 금액) - ${drink.getPrice()}원(음료)]`,
    };
  }

  do(command) {
    if (command !== COMMAND.IN_PROGRESS) {
      logDivider();
      log("잘못된 입력입니다.");
      log(`결제 진행 - '${COMMAND.IN_PROGRESS}', 끝내기 - '${COMMAND.END}'`);
      logDivider();
      return null;
    }

    return this.#payWith(this.#getType());
  }

  #payWith(type) {
    const drink = this.#getDrink();
    const drinkPrice = drink.getPrice();
    const paymentText =
      type === MODEL_KEY.CARD
        ? this.#getCardPaymentText(drinkPrice)
        : type === MODEL_KEY.CASH
        ? this.#getCashPaymentText(drinkPrice)
        : () => "";

    drink.decreaseCount();
    logDivider();
    log("결제가 완료되었습니다.");
    log("\n결제 내역");
    log(`- 금액: ${drinkPrice}원`);
    log(paymentText);
    logDivider();
    return STATUS.COMPLETE;
  }

  #getCardPaymentText(drinkPrice) {
    const card = this.#getCard();
    card.increasePrice(drinkPrice);
    return `- 현재까지 사용 금액: ${card.getPrice()}원`;
  }

  #getCashPaymentText(drinkPrice) {
    const cash = this.#getCash();
    if (!cash.checkPriceRange(drinkPrice)) {
      logDivider();
      log("🚨🚨🚨 금액 부족 🚨🚨🚨");
      logDivider();
      throw new ServerError(drinkPrice);
    }
    cash.decreasePrice(drinkPrice);
    return `- 잔액: ${cash.getPrice()}원`;
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
