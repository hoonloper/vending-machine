const { COMMAND } = require("../common/constant");
const { log } = require("../common/utils");
const Cash = require("../models/Cash");

class CashStage {
  cash;
  ALLOWED_CASH_LIST = [100, 500, 1000, 5000, 10000];
  do(command) {
    if (command === COMMAND.IN_PROGRESS) {
      if (this.cash instanceof Cash) {
        log("현금이 정상적으로 입력되었습니다.");
        log(`결제를 진행하시려면 '${COMMAND.PAY}'를 입력해 주세요.`);
        return this.cash;
      }
      log("입력된 현금이 없습니다.");
      return null;
    }

    if (!this.validCash(command)) {
      log("허용되지 않은 금액 단위입니다!");
      this.logMessage();
      return null;
    }

    const cash = Number(command);
    if (this.cash instanceof Cash) {
      this.cash.increase(cash);
      log("더해진 금액: ", this.cash.getPrice());
      log("결제를 진행하시려면 '진행'을 입력해 주세요.");
      return null;
    }
    this.cash = new Cash(cash);
    log(
      `금액 추가 - 새로운 금액 입력\n결제 진행 - '${COMMAND.IN_PROGRESS}' 입력\n환불 - '${COMMAND.END}' 입력`
    );
  }

  validCash(command) {
    const cash = Number(command);
    if (isNaN(cash) || !this.ALLOWED_CASH_LIST.includes(cash)) {
      return null;
    }
    return true;
  }

  run() {
    this.logMessage();
  }

  logMessage() {
    const message = `허용된 금액 단위는 ${this.ALLOWED_CASH_LIST.map(
      (cash) => `${cash}원`
    ).join(", ")} 입니다.`;
    log(message);
    log("[꼭] 숫자만 입력해 주세요!");
    log("======================================");
  }
}

module.exports = CashStage;
