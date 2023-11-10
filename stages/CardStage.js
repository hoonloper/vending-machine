const { COMMAND } = require("../common/constant");
const {
  log,
  logDivider,
  validFilledString,
  validNumberString,
} = require("../common/utils");
const Card = require("../models/Card");

class CardStage {
  card;
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

    if (!this.validCardInfo(command)) {
      this.logMessage();
      return null;
    }
    const [number, expiredDate, birthDay] = command.split(":");
    this.card = new Card(number, expiredDate, birthDay);
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

  validCardInfo(command) {
    if (!validFilledString(command)) {
      throw Error("SERVER:TYPE");
    }
    const splitedCommand = command.split(":");
    if (splitedCommand.length !== 3) {
      this.logInvalidatedValue("잘못 입력된 카드 정보가 존재합니다.");
      return false;
    }
    const [number, expired, birthDay] = splitedCommand;
    if (!this.validCardNumber(number)) {
      return false;
    }

    if (!this.validExpiredDate(expired)) {
      return false;
    }

    if (!this.validBirthDay(birthDay)) {
      return false;
    }

    return true;
  }

  validCardNumber(number) {
    if (number.length !== 16 || !validNumberString(number)) {
      this.logInvalidatedValue("카드 번호를 잘못 입력했습니다.");
      return false;
    }
    return true;
  }

  validExpiredDate(expired) {
    if (!expired.includes("/") || expired.length !== 5) {
      this.logInvalidatedValue("만료 일자를 잘못 입력했습니다.");
      return false;
    }
    const [expiredMonth, expiredYear] = expired.split("/");
    const isExpiredMonth =
      expiredMonth.length === 2 && validNumberString(expiredMonth);
    const isExpiredYear =
      expiredYear.length === 2 && validNumberString(expiredYear);
    const currentYear = Number(new Date().getFullYear().toString().slice(2));
    if (
      !isExpiredMonth ||
      !isExpiredYear ||
      Number(expiredMonth) > 12 ||
      Number(expiredMonth) < 1 ||
      expiredYear > 99 ||
      currentYear > expiredYear
    ) {
      this.logInvalidatedValue("만료 일자 범위를 잘못 입력했습니다.");
      return false;
    }
    return true;
  }

  validBirthDay(birthDay) {
    if (birthDay.length !== 6 || !validNumberString(birthDay)) {
      this.logInvalidatedValue("생년월일을 잘못 입력했습니다.");
      return false;
    }
    const year = Number(birthDay.slice(0, 2));
    const month = Number(birthDay.slice(2, 4));
    const day = Number(birthDay.slice(4, 6));
    if (year > 99 || month > 12 || month < 1 || day > 31 || day < 1) {
      this.logInvalidatedValue("생년월일을 잘못 입력했습니다.");
      return false;
    }
    return true;
  }

  logInvalidatedValue(message) {
    logDivider(true);
    log(message);
    logDivider(true);
  }
}

module.exports = CardStage;
