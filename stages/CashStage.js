const { COMMAND } = require("../common/constant");
const {
  log,
  logDivider,
  validNumberString,
  validStrictNumber,
  logs,
} = require("../common/utils");
const Cash = require("../models/Cash");

class CashStage {
  #ALLOWED_CASH_LIST = [100, 500, 1000, 5000, 10000];
  #cash = null;

  run() {
    logDivider();
    const cash = this.#getCash();
    if (!Cash.isCash(cash)) {
      this.logMessage();
    } else if (cash.hasPrice()) {
      log(`💵💵💵💵💵 [현재 잔액: ${cash.getPrice()}원] 💵💵💵💵💵\n`);
      this.logMessage();
      this.#logPayment();
    } else {
      log("잔액이 존재하지 않습니다.\n추가 현금을 입력해 주세요.");
    }
    logDivider();

    return null;
  }

  logMessage() {
    const message = `허용된 금액 단위 / ⭐️ 숫자만 입력해 주세요! ⭐️`;
    const prices = this.#ALLOWED_CASH_LIST
      .map((cash) => `- ${cash}원`)
      .join("\n");
    log(message);
    log(prices);

    return null;
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
    if (Cash.isCash(cash)) {
      logDivider();
      log("현금이 정상적으로 입력되었습니다.");
      log(`결제를 진행하시려면 '${COMMAND.PAY}'를 입력해 주세요.`);
      logDivider();
      return cash;
    }
    log("입력된 현금이 없습니다.");
    return null;
  }

  #execute(command) {
    const cash = this.#getCash();
    const commandCash = Number(command);
    if (Cash.isCash(cash)) {
      cash.increasePrice(commandCash);
      logDivider();
      logs(
        `더해진 금액: ${cash.getPrice()}원`,
        "결제를 진행하시려면 '진행'을 입력해 주세요."
      );
      logDivider();
      return null;
    }
    this.#setCash(new Cash(commandCash));
    logDivider();
    this.#logPayment();
    logDivider();
    return null;
  }

  #logPayment() {
    log(
      `금액 추가 - 새로운 금액\n결제 진행 - '${COMMAND.IN_PROGRESS}'\n환불 - '${COMMAND.END}'`
    );
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
    logDivider();
    log(message);
    logDivider();
    this.logMessage();
    logDivider();
    return null;
  }

  copy() {
    const newCashStage = new CashStage();
    newCashStage.#setCash(this.#getCash().copy());
    return newCashStage();
  }
}

module.exports = CashStage;
