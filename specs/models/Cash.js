const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");
const Cash = require("../../models/Cash");
const { InvalidError } = require("../../common/CustomError");

describe("현금 모델 테스트", () => {
  const PRICE = 10_000;

  describe("성공", () => {
    let cash = null;
    beforeEach(() => {
      cash = new Cash(PRICE);
    });

    it("현금 인스턴스 생성(기본 게터)", () => {
      assert.strictEqual(PRICE, cash.getPrice());
    });

    it("현금 증가 + 감소", () => {
      const first = 10_000;
      const second = 20_000;
      const third = 30_000;

      let price = first;
      assert.strictEqual(price, cash.getPrice());

      price += second;
      cash.increasePrice(second);
      assert.strictEqual(price, cash.getPrice());

      price += third;
      cash.increasePrice(third);
      assert.strictEqual(price, cash.getPrice());

      price -= third;
      cash.decreasePrice(third);
      assert.strictEqual(price, cash.getPrice());

      price -= second;
      cash.decreasePrice(second);
      assert.strictEqual(price, cash.getPrice());

      price -= first;
      cash.decreasePrice(first);
      assert.strictEqual(price, cash.getPrice());
    });

    it("현금 금액 검증", () => {
      assert.strictEqual(true, cash.hasPrice());
      cash.decreasePrice(PRICE);
      assert.strictEqual(false, cash.hasPrice());
    });

    it("현금 인스턴스 검증", () => {
      assert.ok(Cash.isCash(cash));
    });

    it("현금 복사 검증", () => {
      const copyCash = cash.copy();
      assert.ok(copyCash instanceof Cash);
      assert.notStrictEqual(copyCash, cash);
      assert.strictEqual(true, copyCash !== cash);
      cash.decreasePrice(PRICE);
      assert.strictEqual(true, copyCash.getPrice() > cash.getPrice());
      cash.increasePrice(PRICE);
      cash.increasePrice(PRICE);
      assert.strictEqual(true, copyCash.getPrice() < cash.getPrice());
      cash.decreasePrice(PRICE);
      assert.strictEqual(copyCash.getPrice(), cash.getPrice());
    });
  });
  describe("실패", () => {
    let cash = null;
    beforeEach(() => {
      cash = new Cash(PRICE);
    });

    it("잘못된 생성자 주입", () => {
      assert.throws(() => new Cash(null), InvalidError);
      assert.throws(() => new Cash(-1), InvalidError);
      assert.throws(() => new Cash("1000"), InvalidError);
      assert.throws(() => new Cash(true), InvalidError);
    });

    it("잘못된 현금을 입력했을 때", () => {
      assert.throws(() => cash.increasePrice(-1), InvalidError);
      assert.throws(() => cash.decreasePrice(-1), InvalidError);
      assert.throws(
        () => cash.decreasePrice(Number.MAX_SAFE_INTEGER),
        InvalidError
      );
    });

    it("음료 인스턴스 검증", () => {
      assert.strictEqual(false, Cash.isCash(new Error()));
    });
  });
});
