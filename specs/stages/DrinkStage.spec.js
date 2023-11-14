const { describe, beforeEach, it } = require("node:test");
const assert = require("assert");
const { COMMAND } = require("../../app/common/constant");
const DrinkStage = require("../../app/stages/DrinkStage");
const Drink = require("../../app/models/Drink");

describe("음료 단계 테스트", () => {
  describe("성공", () => {
    let drinkStage;
    beforeEach(() => {
      drinkStage = new DrinkStage();
    });
    it("음료 입력", () => {
      assert.ok(Drink.isDrink(drinkStage.do("콜라")));
    });
    it("로그 실행", () => {
      assert.strictEqual(null, drinkStage.run());
      assert.strictEqual(null, drinkStage.logMessage());
    });
    it("복사 검증", () => {
      // 음료를 등록
      assert.ok(Drink.isDrink(drinkStage.do("콜라")));

      // 깊은 복사 검증
      const copyDrinkStage = drinkStage.copy();
      assert.ok(copyDrinkStage instanceof DrinkStage);
      assert.notStrictEqual(copyDrinkStage, drinkStage);
      assert.strictEqual(true, copyDrinkStage !== drinkStage);
    });
  });
});
