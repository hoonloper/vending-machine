const { InvalidError } = require("../common/CustomError");
const { COMMAND } = require("../common/constant");
const { log, logDivider } = require("../common/utils");
const Card = require("../models/Card");

class CardStage {
  card;

  run() {
    this.logMessage();
  }

  logMessage() {
    logDivider();
    log(
      "카드번호(16자리), 만료(월/년), 생년월일(6자리)을 ':'로 구분지어 작성해 주세요."
    );
    log("EX: 1234567818273645:12/28:900101");
    logDivider();
  }
  do(command) {
    if (command === COMMAND.IN_PROGRESS) {
      if (this.card instanceof Card) {
        logDivider();
        log("카드 등록이 정상적으로 완료되었습니다.");
        log("결제를 진행하시려면 '결제'를 입력해 주세요.");
        logDivider();
        return this.card;
      }
      this.logInvalidatedValue("카드 정보가 존재하지 않습니다.");
      this.logMessage();
      return null;
    }
    if (command === COMMAND.RETRY) {
      this.card = null;
      this.logMessage();
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
      this.card = new Card(number, expiredDate, birthDay);
    } catch (error) {
      if (error instanceof InvalidError) {
        const [_, message] = error.split(":");
        this.logInvalidatedValue(message);
        return;
      }
      throw error;
    }

    this.done(number, expiredDate, birthDay);
  }

  done(number, expiredDate, birthDay) {
    logDivider();
    log(`고객님의 카드 정보는 다음과 같습니다.\n`);
    log(`- 카드번호: ${number}`);
    log(`- 만료일: ${expiredDate}`);
    log(`- 생년월일: ${birthDay}`);
    log(
      `\n카드 결제 희망 - '${COMMAND.IN_PROGRESS}' 입력\n정보 재입력 희망 - '${COMMAND.RETRY}' 입력\n종료 - '${COMMAND.END}' 입력`
    );
    logDivider();
  }

  logInvalidatedValue(message) {
    logDivider(true);
    log(message);
    logDivider(true);
  }
}

module.exports = CardStage;
