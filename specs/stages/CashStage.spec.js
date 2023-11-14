const { describe, beforeEach, it } = require("node:test");
const assert = require("assert");
const { COMMAND } = require("../../app/common/constant");
const CashStage = require("../../app/stages/CashStage");
const Cash = require("../../app/models/Cash");

describe("현금 단계 테스트", () => {
  const CASH_LIST = ["100", "500", "1000", "5000", "10000"];

  describe("성공", () => {
    let cashStage;
    beforeEach(() => {
      cashStage = new CashStage();
    });
    it("현금 입력", () => {
      for (const cash of CASH_LIST) {
        assert.strictEqual(null, cashStage.do(cash));
      }
    });
    it("현금 등록", () => {
      assert.strictEqual(null, cashStage.do(CASH_LIST.at(-1)));
      assert.ok(Cash.isCash(cashStage.do(COMMAND.IN_PROGRESS)));
    });
    it("현금 결제", () => {
      assert.strictEqual(null, cashStage.do(CASH_LIST.at(-1)));
      assert.ok(Cash.isCash(cashStage.do(COMMAND.IN_PROGRESS)));
      assert.strictEqual(null, cashStage.run());
    });
    it("입력 가능 현금 메시지 가져오기", () => {
      const message = `허용된 금액 단위 / ⭐️ 숫자만 입력해 주세요! ⭐️`;
      const price = CASH_LIST.map((cash) => `- ${cash}원`).join("\n");

      assert.strictEqual(message + "\n" + price, cashStage.getMessage());
    });
    it("현금 정보 없을 때 진행하기", () => {
      assert.strictEqual(null, cashStage.do(COMMAND.IN_PROGRESS));
    });
    it("복사 검증", () => {
      // 현금을 등록했을 때
      assert.strictEqual(null, cashStage.do(CASH_LIST.at(-1)));
      assert.ok(Cash.isCash(cashStage.do(COMMAND.IN_PROGRESS)));

      // 깊은 복사 검증
      const copyCashStage = cashStage.copy();
      assert.ok(copyCashStage instanceof CashStage);
      assert.notStrictEqual(copyCashStage, cashStage);
      assert.strictEqual(true, copyCashStage !== cashStage);
    });
  });
  describe("실패", () => {
    let cashStage;
    beforeEach(() => {
      cashStage = new CashStage();
    });
    it("잘못된 현금을 입력했을 때", () => {
      assert.throws(() => {
        assert.strictEqual(null, cashStage.do(Number.MIN_SAFE_INTEGER));
        assert.ok(Cash.isCash(cashStage.do(COMMAND.IN_PROGRESS)));
      });
      assert.throws(() => {
        assert.strictEqual(null, cashStage.do(Number.MAX_SAFE_INTEGER));
        assert.ok(Cash.isCash(cashStage.do(COMMAND.IN_PROGRESS)));
      });
    });
  });
});
