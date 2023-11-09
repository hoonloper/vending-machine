const Cash = require("./cash");

class CashStage {
  cash;
  ALLOWED_CASH_LIST = [100, 500, 1000, 5000, 10000];
  do(command) {
    if (command === "진행") {
      if (this.cash instanceof Cash) {
        return this.cash;
      }
      console.log("입력된 현금이 없습니다.");
      return null;
    }

    if (!this.validCash(command)) {
      console.log("허용되지 않은 금액 단위입니다!");
      this.logMessage();
      return null;
    }

    const cash = Number(command);
    if (this.cash instanceof Cash) {
      this.cash.increase(cash);
      console.log("더해진 금액: ", this.cash.getCash());
      console.log("결제를 진행하시려면 '진행'을 입력해 주세요.");
      return null;
    }
    this.cash = new Cash(cash);
    console.log(
      "금액을 더 추가하시려면 새로운 금액을 입력해 주시고, 결제를 진행하시려면 '진행', 환불받고 끝내려면 '끝'을 입력해 주세요."
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
    console.log(message);
    console.log("[꼭] 숫자만 입력해 주세요!");
    console.log("======================================");
  }
}

module.exports = CashStage;
