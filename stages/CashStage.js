const { COMMAND } = require("../common/constant");
const {
  log,
  logDivider,
  validNumberString,
  validStrictNumber,
} = require("../common/utils");
const Cash = require("../models/Cash");

class CashStage {
  ALLOWED_CASH_LIST = [100, 500, 1000, 5000, 10000];
  cash = null;

  do(command) {
    if (command === COMMAND.IN_PROGRESS) {
      if (Cash.isCash(this.getCash())) {
        logDivider();
        log("현금이 정상적으로 입력되었습니다.");
        log(`결제를 진행하시려면 '${COMMAND.PAY}'를 입력해 주세요.`);
        logDivider();
        return this.getCash();
      }
      log("입력된 현금이 없습니다.");
      return null;
    }

    if (!validNumberString(command)) {
      logDivider();
      log("⭐️ 숫자만 입력해 주세요! ⭐️");
      logDivider();
      this.logMessage();
      logDivider();
      return null;
    }
    if (!this.validCash(command)) {
      logDivider();
      log("⭐️ 허용되지 않은 금액 단위입니다! ⭐️");
      logDivider();
      this.logMessage();
      logDivider();
      return null;
    }

    const cash = Number(command);
    if (Cash.isCash(this.getCash())) {
      this.getCash().increase(cash);
      logDivider();
      log("더해진 금액: ", this.getCash().getPrice());
      log("결제를 진행하시려면 '진행'을 입력해 주세요.");
      logDivider();
      return null;
    }
    this.setCash(new Cash(cash));
    logDivider();
    this.logPayment();
    logDivider();
  }

  run() {
    if (Cash.isCash(this.getCash())) {
      logDivider();
      if (this.getCash().hasPrice()) {
        log(
          `💵💵💵💵💵 [현재 잔액: ${this.getCash().getPrice()}원] 💵💵💵💵💵\n`
        );
        this.logMessage();
        this.logPayment();
      } else {
        log("잔액이 존재하지 않습니다.\n추가 현금을 입력해 주세요.");
      }
      logDivider();
      return null;
    }
    logDivider();
    this.logMessage();
    logDivider();
  }

  logMessage() {
    const message = `허용된 금액 단위 / ⭐️ 숫자만 입력해 주세요! ⭐️`;
    const prices = this.ALLOWED_CASH_LIST.map((cash) => `- ${cash}원`).join(
      "\n"
    );
    log(message);
    log(prices);
  }
  logPayment() {
    log(
      `금액 추가 - 새로운 금액 입력\n결제 진행 - '${COMMAND.IN_PROGRESS}' 입력\n환불 - '${COMMAND.END}' 입력`
    );
  }

  getCash() {
    return this.cash;
  }
  setCash(cash) {
    this.cash = cash;
  }

  validCash(command) {
    const cash = Number(command);
    return validStrictNumber(cash) && this.ALLOWED_CASH_LIST.includes(cash);
  }

  copy() {
    const newCashStage = new CashStage();
    newCashStage.setCash(this.getCash().copy());
    return newCashStage();
  }
}

module.exports = CashStage;
