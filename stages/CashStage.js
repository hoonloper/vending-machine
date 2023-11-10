const { COMMAND } = require("../common/constant");
const {
  log,
  logDivider,
  validNumberString,
  validStrictNumber,
} = require("../common/utils");
const Cash = require("../models/Cash");

class CashStage {
  cash;
  ALLOWED_CASH_LIST = [100, 500, 1000, 5000, 10000];
  do(command) {
    if (command === COMMAND.IN_PROGRESS) {
      if (this.cash instanceof Cash) {
        logDivider();
        log("현금이 정상적으로 입력되었습니다.");
        log(`결제를 진행하시려면 '${COMMAND.PAY}'를 입력해 주세요.`);
        logDivider();
        return this.cash;
      }
      log("입력된 현금이 없습니다.");
      return null;
    }

    if (!validNumberString(command)) {
      logDivider();
      log("⭐️ 숫자만 입력해 주세요! ⭐️");
      logDivider();
      this.logMessage();
      return null;
    }
    if (!this.validCash(command)) {
      logDivider();
      log("⭐️ 허용되지 않은 금액 단위입니다! ⭐️");
      logDivider();
      this.logMessage();
      return null;
    }

    const cash = Number(command);
    if (this.cash instanceof Cash) {
      this.cash.increase(cash);
      logDivider();
      log("더해진 금액: ", this.cash.getPrice());
      log("결제를 진행하시려면 '진행'을 입력해 주세요.");
      logDivider();
      return null;
    }
    this.cash = new Cash(cash);
    logDivider();
    log(
      `금액 추가 - 새로운 금액 입력\n결제 진행 - '${COMMAND.IN_PROGRESS}' 입력\n환불 - '${COMMAND.END}' 입력`
    );
    logDivider();
  }

  validCash(command) {
    const cash = Number(command);
    return validStrictNumber(cash) && this.ALLOWED_CASH_LIST.includes(cash);
  }

  run() {
    this.logMessage();
  }

  logMessage() {
    const message = `허용된 금액 단위 / ⭐️ 숫자만 입력해 주세요! ⭐️`;
    const prices = this.ALLOWED_CASH_LIST.map((cash) => `- ${cash}원`).join(
      "\n"
    );
    logDivider();
    log(message);
    log(prices);
    logDivider();
  }
}

module.exports = CashStage;
