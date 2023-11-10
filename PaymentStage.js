const Card = require("./Card");
const Cash = require("./Cash");
const Drink = require("./drinks/Drink");

class PaymentStage {
  drink = null;
  card = null;
  cash = null;
  type = null;

  constructor(selectedList) {
    if (!Array.isArray(selectedList) || selectedList.length !== 2) {
      return null;
    }

    this.drink = selectedList[0];
    if (selectedList[1] instanceof Card) {
      this.card = selectedList[1];
      this.type = "CARD";
    } else if (selectedList[1] instanceof Cash) {
      this.cash = selectedList[1];
      this.type = "CASH";
    } else {
      throw Error("INVALID:PAYMENT");
    }
  }
  do(command) {
    if (command !== "진행") {
      console.log("잘못된 입력입니다.");
      console.log(
        "결제를 진행하시려면 '진행'을 입력해 주시고, 끝내려면 '끝'을 입력해 주세요."
      );
      return null;
    }
  }

  run() {
    this.logMessage();
  }

  logMessage() {
    console.log("\n======================================\n");
    console.log("결제 수단");
    let paymentPrice = 0;
    let paymentMessage = "";
    // 카드 결제 메시지
    if (this.type === "CARD") {
      console.log("- 타입: 카드");
      const formattedNumber = this.card.formatNumber(
        this.card.blurNumber(this.card.getNumber())
      );
      console.log(`- 카드 번호: ${formattedNumber}`);
      console.log(`- 현재까지 사용한 금액: ${this.card.getPrice()}원`);
      paymentPrice = this.drink.getPrice();
      paymentMessage = `[${this.drink.getPrice()}원(카드사에 등록된 결제일에 결제될 예정)]`;
    }
    // 현금 결제 메시지
    if (this.type === "CASH") {
      console.log("- 타입: 현금");
      console.log(`- 입력한 금액: ${this.cash.getPrice()}원`);
      paymentPrice = this.cash.getPrice() - this.drink.getPrice();
      paymentMessage = `[${this.cash.getPrice()}(현재 금액) - ${this.drink.getPrice()}(음료)]`;
    }
    console.log("\n--------------------------------------\n");
    console.log(`음료 정보`);
    console.log(`- 이름: ${this.drink.getName()}`);
    console.log(`- 가격: ${this.drink.getPrice()}원`);
    console.log(`- 개수: ${this.drink.getCount()}개`);
    console.log("\n--------------------------------------\n");
    console.log("결제 내역");
    console.log(`- 금액: ${paymentPrice}원`);
    console.log(paymentMessage);
    console.log("\n======================================\n");
    console.log(
      "결제를 진행하시려면 '진행'을 입력해 주시고, 끝내려면 '끝'을 입력해 주세요."
    );
  }
}

module.exports = PaymentStage;
