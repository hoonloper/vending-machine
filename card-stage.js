const Card = require("./card");

class CardStage {
  card;
  do(command) {
    if (command === "네") {
      if (this.card instanceof Card) {
        console.log("카드 등록이 정상적으로 완료되었습니다.");
        console.log("결제를 진행하시려면 '결제'를 입력해 주세요.");
        return this.card;
      }
      console.log("카드 정보가 존재하지 않습니다.");
      this.logMessage();
      return null;
    }
    if (command === "재입력") {
      this.card = null;
      this.logMessage();
      return null;
    }

    if (!this.validCardInfo(command)) {
      this.logMessage();
      return null;
    }
    const [number, expiredDate, birthDay] = command.split(":");
    console.log(command);
    this.card = new Card(number, expiredDate, birthDay);
    console.log(`고객님의 카드 정보는 다음과 같습니다.`);
    console.log("------------------------------------");
    console.log(`- 카드번호: ${number}`);
    console.log(`- 만료일: ${expiredDate}`);
    console.log(`- 생년월일: ${birthDay}`);
    console.log("------------------------------------");
    console.log(
      "카드 결제를 희망하시면 '네', 정보 재입력을 희망하시면 '재입력', 끝내려면 '끝'을 입력해 주세요."
    );
  }

  validCardInfo(command) {
    if (!(typeof command === "string")) {
      throw Error("SERVER:TYPE");
    }
    const splitedCommand = command.split(":");
    if (splitedCommand.length !== 3) {
      console.log("잘못 입력된 카드 정보가 존재합니다.");
      return false;
    }

    const number = splitedCommand[0];
    if (number.length !== 16 || isNaN(Number(number))) {
      console.log("카드 번호를 잘못 입력했습니다.");
      return false;
    }

    const expired = splitedCommand[1];
    if (!expired.includes("/")) {
      console.log("만료 일자를 잘못 입력했습니다.");
      return false;
    }
    const splitedExpired = expired.split("/");
    if (
      splitedExpired[0].length !== 2 ||
      isNaN(Number(splitedExpired[0])) ||
      splitedExpired[1].length !== 2 ||
      isNaN(Number(splitedExpired[1]))
    ) {
      console.log("만료 일자를 잘못 입력했습니다.");
      return false;
    }

    const birthDay = splitedCommand[2];
    if (birthDay.length !== 6 || isNaN(Number(birthDay))) {
      console.log("생년월일을 잘못 입력했습니다.");
      return false;
    }

    return true;
  }

  run() {
    this.logMessage();
  }

  logMessage() {
    console.log(
      "카드번호(16자리), 만료(일/월), 생년월일(6자리)을 ':'로 구분지어 작성해 주세요."
    );
    console.log("======================================");
  }
}

module.exports = CardStage;
