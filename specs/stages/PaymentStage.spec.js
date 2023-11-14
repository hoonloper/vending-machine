const { describe, beforeEach, it } = require("node:test");
const assert = require("assert");
const PaymentStage = require("../../app/stages/PaymentStage");
const { COMMAND } = require("../../app/common/constant");
const Drink = require("../../app/models/Drink");
const Cash = require("../../app/models/Cash");
const Card = require("../../app/models/Card");

describe("결제 단계 테스트", () => {
  describe("성공", () => {
    let paymentStage;
    beforeEach(() => {
      paymentStage = new PaymentStage();
    });
    it("정상 스테이지로 초기화", () => {
      assert.ok(
        !paymentStage.init([new Drink("콜라", 1200, 3), new Cash(10000)])
      );
      assert.ok(
        !paymentStage.init([
          new Drink("콜라", 1200, 3),
          new Card("1234567812345678", "12/27", "900101"),
        ])
      );
    });
    it("정상 결제 진행 - 현금", () => {
      assert.ok(
        !paymentStage.init([new Drink("콜라", 1200, 3), new Cash(10000)])
      );
      assert.doesNotThrow(() => paymentStage.do(COMMAND.IN_PROGRESS));
    });
    it("정상 로그 출력 - 현금", () => {
      assert.ok(
        !paymentStage.init([new Drink("콜라", 1200, 3), new Cash(10000)])
      );
      assert.doesNotThrow(() => paymentStage.logMessage());
      assert.doesNotThrow(() => paymentStage.run());
    });
    it("정상 결제 진행 - 카드", () => {
      assert.ok(
        !paymentStage.init([
          new Drink("콜라", 1200, 3),
          new Card("1234567812345678", "12/27", "900101"),
        ])
      );
      assert.doesNotThrow(() => paymentStage.do(COMMAND.IN_PROGRESS));
    });
    it("정상 로그 출력 - 카드", () => {
      assert.ok(
        !paymentStage.init([
          new Drink("콜라", 1200, 3),
          new Card("1234567812345678", "12/27", "900101"),
        ])
      );
      assert.doesNotThrow(() => paymentStage.logMessage());
      assert.doesNotThrow(() => paymentStage.run());
    });
  });
  describe("실패", () => {
    let paymentStage;
    beforeEach(() => {
      paymentStage = new PaymentStage();
    });
    it("음료 선택, 결제 수단 선택 없이 결제 진행", () => {
      assert.throws(() => paymentStage.do(COMMAND.IN_PROGRESS));
    });
    it("음료 선택, 결제 수단 선택 없이 로그 출력", () => {
      assert.throws(() => paymentStage.run());
      assert.throws(() => paymentStage.logMessage());
    });
    it("음료 선택, 결제 수단 선택 없이 초기화", () => {
      assert.strictEqual(null, paymentStage.init());
      assert.strictEqual(null, paymentStage.init(123));
    });
    it("잘못된 입력", () => {
      assert.strictEqual(null, paymentStage.do(COMMAND.PAY));
    });
    it("잘못된 stage 정보로 초기화", () => {
      assert.throws(() => paymentStage.init([123, 456]));
    });
  });
});
