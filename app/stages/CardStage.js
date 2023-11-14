const { InvalidError } = require("../common/CustomError");
const { COMMAND } = require("../common/constant");
const {
  log,
  getLoggingDivider,
  addLineBreakOfTexts,
} = require("../common/utils");
const Card = require("../models/Card");

class CardStage {
  card = null;

  run() {
    const card = this.#getCard();

    const divider = getLoggingDivider();
    const message = Card.isCard(card)
      ? addLineBreakOfTexts(
          `💵💵💵💵💵 [현재까지 사용한 금액: ${card.getPrice()}원] 💵💵💵💵💵`,
          this.#done()
        )
      : this.getMessage();
    log(addLineBreakOfTexts(divider, message, divider));

    return null;
  }

  getMessage() {
    return addLineBreakOfTexts(
      "카드번호(16자리), 만료(월/년), 생년월일(6자리)을 ':'로 구분지어 작성해 주세요.",
      "EX: 1234567818273645:12/28:900101"
    );
  }

  do(command) {
    return command === COMMAND.IN_PROGRESS
      ? this.#progress()
      : command === COMMAND.RETRY
      ? this.#retry()
      : this.#execute(command);
  }

  #progress() {
    const card = this.#getCard();

    const divider = getLoggingDivider();
    const message = Card.isCard(card)
      ? addLineBreakOfTexts(
          "카드 등록이 정상적으로 완료되었습니다.",
          "결제를 진행하시려면 '결제'를 입력해 주세요."
        )
      : addLineBreakOfTexts(
          "🚨 카드 정보가 존재하지 않습니다. 🚨",
          this.getMessage()
        );
    log(addLineBreakOfTexts(divider, message, divider));

    return Card.isCard(card) ? card : null;
  }

  #retry() {
    this.#setCard(null);

    const divider = getLoggingDivider();
    log(addLineBreakOfTexts(divider, this.getMessage(), divider));

    return null;
  }

  #execute(command) {
    if (command.length !== Card.TOTAL_CARD_INFO_LENGTH) {
      log("카드 정보를 잘못 입력하셨습니다.\n다시 시도해 주세요.");
      throw new InvalidError(command);
    }

    const [number, expiredDate, birthDay] = command.split(":");
    this.#setCard(new Card(number, expiredDate, birthDay));

    const divider = getLoggingDivider();
    const message = this.#done();
    log(addLineBreakOfTexts(divider, message, divider));

    return null;
  }

  #done() {
    const card = this.#getCard();

    return addLineBreakOfTexts(
      `고객님의 카드 정보는 다음과 같습니다.\n`,
      `- 카드번호: ${card.getNumber()}`,
      `- 만료일: ${card.getExpiredDate()}`,
      `- 생년월일: ${card.getBirthDay()}`,
      `\n카드 결제 희망 - '${COMMAND.IN_PROGRESS}'\n정보 재입력 희망 - '${COMMAND.RETRY}'\n종료 - '${COMMAND.END}'`
    );
  }

  copy() {
    const newCardStage = new CardStage();
    newCardStage.#setCard(this.#getCard().copy());

    return newCardStage;
  }

  #getCard() {
    return this.card;
  }
  #setCard(card) {
    this.card = card;
  }
}

module.exports = CardStage;
