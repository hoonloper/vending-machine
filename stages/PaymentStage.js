const { InvalidError, ServerError } = require("../common/CustomError");
const { MODEL_KEY, STATUS, COMMAND } = require("../common/constant");
const {
  log,
  getLoggingDivider,
  addLineBreakOfTexts,
} = require("../common/utils");
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
    const divider = getLoggingDivider();
    const thinDivider = getLoggingDivider(true);
    const paymentTitle = "결제 수단";
    const { info, change, message } =
      type === MODEL_KEY.CARD
        ? this.#getCardPaymentText(drink)
        : type === MODEL_KEY.CASH
        ? this.#getCashPayment(drink)
        : { info: "", change: "0", message: "" };
    const drinkText = addLineBreakOfTexts(
      `음료 정보`,
      `- 이름: ${drink.getName()}`,
      `- 가격: ${drink.getPrice()}원`,
      "- 개수: 1개"
    );
    const paymentHistoryText = addLineBreakOfTexts(
      "\n결제 내역",
      `- 금액: ${drink.getPrice()}원`,
      `- 잔액: ${change}원`,
      message
    );
    const paymentConfirm =
      "⭐️ 결제 내역을 꼭 확인해 주세요.\n결제 확정 - '진행'\n결제 종료 - '끝'";

    log(
      addLineBreakOfTexts(
        divider,
        paymentTitle,
        thinDivider,
        info,
        thinDivider,
        drinkText,
        paymentHistoryText,
        divider,
        paymentConfirm,
        divider
      )
    );
  }

  #getCardPaymentText(drink) {
    const card = this.#getCard();
    const formattedNumber = card.formatNumber(
      card.maskNumber(card.getNumber())
    );

    const type = "- 타입: 카드";
    const number = `- 카드 번호: ${formattedNumber}`;
    const price = `- 현재까지 사용한 금액: ${card.getPrice()}원`;

    return {
      info: addLineBreakOfTexts(getLoggingDivider(true), type, number, price),
      change: "-",
      message: `[${drink.getPrice()}원(카드사에 등록된 결제일에 결제될 예정)]`,
    };
  }

  #getCashPayment(drink) {
    const cash = this.#getCash();
    const type = "- 타입: 현금";
    const price = `- 입력한 금액: ${cash.getPrice()}원`;

    return {
      info: addLineBreakOfTexts(type, price),
      change: `${cash.getPrice() - drink.getPrice()}`,
      message: `[${cash.getPrice()}원(현재 금액) - ${drink.getPrice()}원(음료)]`,
    };
  }

  do(command) {
    if (command !== COMMAND.IN_PROGRESS) {
      const divider = getLoggingDivider();
      const message = addLineBreakOfTexts(
        divider,
        `잘못된 입력입니다.\n결제 진행 - '${COMMAND.IN_PROGRESS}', 끝내기 - '${COMMAND.END}'`,
        divider
      );

      log(message);

      return null;
    }

    return this.#payWith(this.#getType());
  }

  #payWith(type) {
    const drink = this.#getDrink();
    const drinkPrice = drink.getPrice();
    const paymentText =
      type === MODEL_KEY.CARD
        ? this.#getDoneCardPaymentText(drinkPrice)
        : type === MODEL_KEY.CASH
        ? this.#getDoneCashPaymentText(drinkPrice)
        : () => "";

    drink.decreaseCount();

    const divider = getLoggingDivider();
    const doneText = `결제가 완료되었습니다.\n결제 내역\n- 금액: ${drinkPrice}원`;

    log(addLineBreakOfTexts(divider, doneText, paymentText, divider));

    return STATUS.COMPLETE;
  }

  #getDoneCardPaymentText(drinkPrice) {
    const card = this.#getCard();
    card.increasePrice(drinkPrice);
    return `- 현재까지 사용 금액: ${card.getPrice()}원`;
  }

  #getDoneCashPaymentText(drinkPrice) {
    const cash = this.#getCash();
    if (!cash.checkPriceRange(drinkPrice)) {
      const divder = getLoggingDivider();
      log(addLineBreakOfTexts(divder, "🚨🚨🚨 금액 부족 🚨🚨🚨", divder));

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
