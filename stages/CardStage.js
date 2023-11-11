const { InvalidError } = require("../common/CustomError");
const { COMMAND } = require("../common/constant");
const { log, logDivider } = require("../common/utils");
const Card = require("../models/Card");

class CardStage {
  card;

  run() {
    logDivider();
    if (Card.isCard(this.getCard())) {
      log(
        `💵💵💵💵💵 [현재까지 사용한 금액: ${this.getCard().getPrice()}원] 💵💵💵💵💵\n`
      );
      this.done();
    } else {
      this.logMessage();
    }
    logDivider();
  }

  logMessage() {
    log(
      "카드번호(16자리), 만료(월/년), 생년월일(6자리)을 ':'로 구분지어 작성해 주세요."
    );
    log("EX: 1234567818273645:12/28:900101");
  }

  do(command) {
    if (command === COMMAND.IN_PROGRESS) {
      if (Card.isCard(this.getCard())) {
        logDivider();
        log("카드 등록이 정상적으로 완료되었습니다.");
        log("결제를 진행하시려면 '결제'를 입력해 주세요.");
        logDivider();
        return this.getCard();
      }
      logDivider();
      this.logInvalidatedValue("🚨 카드 정보가 존재하지 않습니다. 🚨");
      this.logMessage();
      logDivider();
      return null;
    }
    if (command === COMMAND.RETRY) {
      this.setCard(null);
      logDivider();
      this.logMessage();
      logDivider();
      return null;
    }

    if (command.length !== Card.TOTAL_CARD_INFO_LENGTH) {
      this.logInvalidatedValue(
        "카드 정보를 잘못 입력하셨습니다.\n 다시 시도해 주세요."
      );
      return null;
    }
    const [number, expiredDate, birthDay] = command.split(":");
    try {
      this.setCard(new Card(number, expiredDate, birthDay));
    } catch (error) {
      if (error instanceof InvalidError) {
        const [_, message] = error.split(":");
        this.logInvalidatedValue(message);
        return;
      }
      throw error;
    }

    logDivider();
    this.done();
    logDivider();
  }

  done() {
    log(`고객님의 카드 정보는 다음과 같습니다.\n`);
    log(`- 카드번호: ${this.getCard().getNumber()}`);
    log(`- 만료일: ${this.getCard().getExpiredDate()}`);
    log(`- 생년월일: ${this.getCard().getBirthDay()}`);
    log(
      `\n카드 결제 희망 - '${COMMAND.IN_PROGRESS}'\n정보 재입력 희망 - '${COMMAND.RETRY}'\n종료 - '${COMMAND.END}'`
    );
  }

  logInvalidatedValue(message) {
    logDivider(true);
    log(message);
    logDivider(true);
  }

  copy() {
    const newCardStage = new CardStage();
    newCardStage.setCard(this.getCard().copy());
    return newCardStage;
  }

  getCard() {
    return this.card;
  }
  setCard(card) {
    this.card = card;
  }
}

module.exports = CardStage;
