const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");
const Cash = require("../../models/Cash");
const { InvalidError } = require("../../common/CustomError");

describe("음료 모델 테스트", () => {
  const ALLOWED_CASH_LIST = [100, 500, 1_000, 5_000, 10_000];
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
});
