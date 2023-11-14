const { COMMAND } = require("../common/constant");
const {
  log,
  validNumberString,
  validStrictNumber,
  addLineBreakOfTexts,
  getLoggingDivider,
} = require("../common/utils");
const Cash = require("../models/Cash");

class CashStage {
  #ALLOWED_CASH_LIST = [100, 500, 1000, 5000, 10000];
  #cash = null;

  run() {
    const cash = this.#getCash();
    const message = !Cash.isCash(cash)
      ? this.getMessage()
      : cash.hasPrice()
      ? addLineBreakOfTexts(
          `💵💵💵💵💵 [현재 잔액: ${cash.getPrice()}원] 💵💵💵💵💵\n`,
          this.getMessage(),
          this.#getPaymentText()
        )
      : "잔액이 존재하지 않습니다.\n추가 현금을 입력해 주세요.";

    const divider = getLoggingDivider();
    log(addLineBreakOfTexts(divider, message, divider));

    return null;
  }

  getMessage() {
    const message = `허용된 금액 단위 / ⭐️ 숫자만 입력해 주세요! ⭐️`;
    const price = this.#ALLOWED_CASH_LIST
      .map((cash) => `- ${cash}원`)
      .join("\n");

    return addLineBreakOfTexts(message, price);
  }

  do(command) {
    return command === COMMAND.IN_PROGRESS
      ? this.#progress()
      : validNumberString(command) && this.#validCash(command)
      ? this.#execute(command)
      : this.#invalidCommand("⭐️ 허용되지 않은 금액입니다! ⭐️");
  }

  #progress() {
    const cash = this.#getCash();

    const divider = getLoggingDivider();
    const message = Cash.isCash(cash)
      ? addLineBreakOfTexts(
          divider,
          "현금이 정상적으로 입력되었습니다.",
          `결제를 진행하시려면 '${COMMAND.PAY}'를 입력해 주세요.`,
          divider
        )
      : "입력된 현금이 없습니다.";
    log(message);

    return Cash.isCash(cash) ? cash : null;
  }

  #execute(command) {
    const cash = this.#getCash();
    const commandCash = Number(command);
    const divider = getLoggingDivider();

    if (Cash.isCash(cash)) {
      cash.increasePrice(commandCash);

      const message = addLineBreakOfTexts(
        divider,
        `더해진 금액: ${cash.getPrice()}원`,
        "결제를 진행하시려면 '진행'을 입력해 주세요.",
        divider
      );
      log(message);

      return null;
    }

    this.#setCash(new Cash(commandCash));

    log(addLineBreakOfTexts(divider, this.#getPaymentText(), divider));

    return null;
  }

  #getPaymentText() {
    return `금액 추가 - 새로운 금액\n결제 진행 - '${COMMAND.IN_PROGRESS}'\n환불 - '${COMMAND.END}'`;
  }

  #getCash() {
    return this.#cash;
  }
  #setCash(cash) {
    this.#cash = cash;
  }

  #validCash(command) {
    const cash = Number(command);

    return validStrictNumber(cash) && this.#ALLOWED_CASH_LIST.includes(cash);
  }
  #invalidCommand(message) {
    const divider = getLoggingDivider();
    log(
      addLineBreakOfTexts(divider, message, divider, this.getMessage(), divider)
    );

    return null;
  }

  copy() {
    const newCashStage = new CashStage();
    newCashStage.#setCash(this.#getCash().copy());

    return newCashStage;
  }
}

module.exports = CashStage;
