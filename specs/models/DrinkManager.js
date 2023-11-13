const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");
const DrinkManager = require("../../models/DrinkManager");
const { InvalidError } = require("../../common/CustomError");
const Drink = require("../../models/Drink");
const { validStrictNumber, validFilledString } = require("../../common/utils");

describe("음료 매니저 모델 테스트", () => {
  const DRINK_LIST = [
    new Drink("콜라", 1100, 3),
    new Drink("물", 600, 3),
    new Drink("커피", 700, 3),
  ];
  describe("성공", () => {
    let drinkManager = null;
    beforeEach(() => {
      drinkManager = new DrinkManager(NAME, PRICE, COUNT);
    });

    it("음료 매니저 인스턴스 생성(기본 게터)", () => {
      drinkManager.getDrinkList().forEach((drink, index) => {
        const DRINK = DRINK_LIST[index];
        assert.ok(Drink.isDrink(drink));
        assert.ok(validFilledString(drink.getName()));
        assert.ok(validStrictNumber(drink.getPrice()));
        assert.ok(validStrictNumber(drink.getCount()));
        assert.strictEqual(DRINK.getName(), drink.getName());
        assert.strictEqual(DRINK.getPrice(), drink.getPrice());
        assert.strictEqual(DRINK.getCount(), drink.getCount());
      });
    });

    it("음료 매니저 음료 이름 목록 가져오기", () => {
      drinkManager.getDrinkNameList().forEach((name, index) => {
        const NAME = DRINK_LIST[index].getName();
        assert.strictEqual(NAME, name);
      });
    });

    it("음료 매니저 이름에 맞는 음료 가져오기", () => {
      const drink = drinkManager.getDrinkByName("콜라");
      assert.ok(Drink.isDrink(drink));
      const emptyDrink = drinkManager.getDrinkByName("없는음료");
      assert.strictEqual(null, emptyDrink);
    });

    it("음료 복사 검증", () => {
      const copyDrinkManager = drinkManager.copy();
      assert.ok(copyDrinkManager instanceof DrinkManager);
      assert.notStrictEqual(copyDrinkManager, drinkManager);
      assert.strictEqual(true, copyDrinkManager !== drinkManager);
    });
  });
});
