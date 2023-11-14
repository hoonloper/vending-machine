const { describe, beforeEach, it } = require("node:test");
const CardStage = require("../../app/stages/CardStage");
const assert = require("assert");
const { COMMAND } = require("../../app/common/constant");
const Card = require("../../app/models/Card");

describe("카드 단계 테스트", () => {
  const CARD_NUMBER = "1234567818273645:12/28:900101";
  describe("성공", () => {
    let cardStage;
    beforeEach(() => {
      cardStage = new CardStage();
    });
    it("번호 입력", () => {
      assert.strictEqual(null, cardStage.do(CARD_NUMBER));
    });
    it("카드 등록", () => {
      assert.strictEqual(null, cardStage.do(CARD_NUMBER));
      assert.ok(Card.isCard(cardStage.do(COMMAND.IN_PROGRESS)));
    });
    it("재등록", () => {
      assert.strictEqual(null, cardStage.do(CARD_NUMBER));
      assert.strictEqual(null, cardStage.do(COMMAND.RETRY));
      assert.strictEqual(null, cardStage.do(CARD_NUMBER));
      assert.ok(Card.isCard(cardStage.do(COMMAND.IN_PROGRESS)));
      assert.strictEqual(null, cardStage.run());
    });
    it("카드 정보 없을 때 진행하기", () => {
      assert.strictEqual(null, cardStage.do(COMMAND.IN_PROGRESS));
    });
    it("카드 메시지 가져오기", () => {
      const message =
        "카드번호(16자리), 만료(월/년), 생년월일(6자리)을 ':'로 구분지어 작성해 주세요.\nEX: 1234567818273645:12/28:900101";
      assert.strictEqual(message, cardStage.getMessage());
    });
    it("복사 검증", () => {
      // 카드를 등록했을 때
      assert.strictEqual(null, cardStage.do(CARD_NUMBER));
      assert.ok(Card.isCard(cardStage.do(COMMAND.IN_PROGRESS)));

      // 깊은 복사 검증
      const copyCardStage = cardStage.copy();
      assert.ok(copyCardStage instanceof CardStage);
      assert.notStrictEqual(copyCardStage, cardStage);
      assert.strictEqual(true, copyCardStage !== cardStage);
    });
  });
});
