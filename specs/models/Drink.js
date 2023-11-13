const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");
const Drink = require("../../models/Drink");

describe("음료 모델 테스트", () => {
  const NAME = "콜라";
  const PRICE = 1200;
  const COUNT = 5;

  describe("성공", () => {
    let drink = null;
    beforeEach(() => {
      drink = new Drink(NAME, PRICE, COUNT);
    });

    it("음료 인스턴스 생성(기본 게터)", () => {
      assert.strictEqual(NAME, drink.getName());
      assert.strictEqual(PRICE, drink.getPrice());
      assert.strictEqual(COUNT, drink.getCount());
    });

    it("음료 판매", () => {
      assert.strictEqual(COUNT, drink.getCount());
      drink.sold();
      drink.sold();
      drink.sold();
      drink.sold();
      drink.sold();
      assert.strictEqual(COUNT - 5, drink.getCount());
    });

    it("음료 개수 검증", () => {
      assert.strictEqual(true, drink.hasCount());

      drink.sold();
      assert.ok(drink.hasCount());
      drink.sold();
      assert.ok(drink.hasCount());
      drink.sold();
      assert.ok(drink.hasCount());
      drink.sold();
      assert.ok(drink.hasCount());
    });

    it("음료 인스턴스 검증", () => {
      assert.ok(Drink.isDrink(drink));
    });

    it("음료 복사 검증", () => {
      const copyDrink = drink.copy();
      assert.ok(copyDrink instanceof Drink);
      assert.notStrictEqual(copyDrink, drink);
      assert.strictEqual(true, copyDrink !== drink);
      drink.sold();
      assert.strictEqual(true, copyDrink.getCount() > drink.getCount());
    });
  });
});
