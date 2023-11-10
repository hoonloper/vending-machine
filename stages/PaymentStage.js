const { MODEL_KEY, STATUS } = require("../common/constant");
const Card = require("../models/Card");
const Cash = require("../models/Cash");

class PaymentStage {
  drink = null;
  card = null;
  cash = null;
  type = null;

  do(command) {
    if (command !== "진행") {
      console.log("잘못된 입력입니다.");
      console.log(
        "결제를 진행하시려면 '진행'을 입력해 주시고, 끝내려면 '끝'을 입력해 주세요."
      );
      return null;
    }

    return this.payWith(this.type);
  }

  payWith(type) {
    const drinkPrice = this.drink.getPrice();
    let change = 0;
    if (type === MODEL_KEY.CARD) {
      this.card.increase(drinkPrice);
      change = this.card.getPrice();
    } else if (type === MODEL_KEY.CASH) {
      if (!this.cash.checkPriceRange(drinkPrice)) {
        console.log(
          "금액이 충분하지 않습니다. 충분한 금액을 입력해 주시기 바랍니다."
        );
        throw Error("FAIL:NOT_ENOUGH");
      }
      this.cash.decrease(drinkPrice);
      change = this.cash.getPrice();
    }
    this.drink.decreaseCount();
    console.log("결제가 완료되었습니다.");
    console.log("\n======================================\n");
    console.log("결제 내역");
    console.log(`- 금액: ${drinkPrice}원`);
    console.log(`- 잔액: ${change}원`);
    console.log("\n======================================\n");
    return STATUS.COMPLETE;
  }

  run() {
    this.logMessage();
  }

  init(selectedList) {
    console.log("init ", selectedList);
    if (!Array.isArray(selectedList) || selectedList.length !== 2) {
      return null;
    }

    this.drink = selectedList[0];
    if (selectedList[1] instanceof Card) {
      this.card = selectedList[1];
      this.type = MODEL_KEY.CARD;
    } else if (selectedList[1] instanceof Cash) {
      this.cash = selectedList[1];
      this.type = MODEL_KEY.CASH;
    } else {
      throw Error("INVALID:PAYMENT");
    }
  }

  logMessage() {
    console.log("\n======================================\n");
    console.log("결제 수단");
    let paymentChange = 0;
    let paymentMessage = "";
    // 카드 결제 메시지
    if (this.type === MODEL_KEY.CARD) {
      console.log("- 타입: 카드");
      const formattedNumber = this.card.formatNumber(
        this.card.blurNumber(this.card.getNumber())
      );
      console.log(`- 카드 번호: ${formattedNumber}`);
      console.log(`- 현재까지 사용한 금액: ${this.card.getPrice()}원`);
      paymentChange = this.drink.getPrice();
      paymentMessage = `[${this.drink.getPrice()}원(카드사에 등록된 결제일에 결제될 예정)]`;
    }
    // 현금 결제 메시지
    if (this.type === MODEL_KEY.CASH) {
      console.log("- 타입: 현금");
      console.log(`- 입력한 금액: ${this.cash.getPrice()}원`);
      paymentChange = this.cash.getPrice() - this.drink.getPrice();
      paymentMessage = `[${this.cash.getPrice()}원(현재 금액) - ${this.drink.getPrice()}원(음료)]`;
    }
    console.log("\n--------------------------------------\n");
    console.log(`음료 정보`);
    console.log(`- 이름: ${this.drink.getName()}`);
    console.log(`- 가격: ${this.drink.getPrice()}원`);
    console.log(`- 개수: ${this.drink.getCount()}개`);
    console.log("\n--------------------------------------\n");
    console.log("결제 내역");
    console.log(`- 금액: ${this.drink.getPrice()}원`);
    console.log(`- 잔액: ${paymentChange}원`);
    console.log(paymentMessage);
    console.log("\n======================================\n");
    console.log(
      "결제를 진행하시려면 '진행'을 입력해 주시고, 끝내려면 '끝'을 입력해 주세요."
    );
  }
}

module.exports = PaymentStage;
