const { describe, beforeEach, it } = require("node:test");
const assert = require("assert");
const StageManager = require("../../app/stages/StageManager");
const { STATUS, COMMAND, MODEL_KEY } = require("../../app/common/constant");
const Drink = require("../../app/models/Drink");
const Cash = require("../../app/models/Cash");
const Card = require("../../app/models/Card");

describe("스테이지 관리자 테스트", () => {
  const CASH_COMMAND_FLOW = [
    "콜라",
    "현금",
    "10000",
    COMMAND.IN_PROGRESS,
    COMMAND.PAY,
    COMMAND.IN_PROGRESS,
  ];
  const CARD_COMMAND_FLOW = [
    "콜라",
    "카드",
    "1234567818273645:12/28:900101",
    COMMAND.IN_PROGRESS,
    COMMAND.PAY,
    COMMAND.IN_PROGRESS,
  ];
  describe("성공", () => {
    let stageManager;
    beforeEach(() => {
      stageManager = new StageManager();
    });
    it("현금 결제 흐름", () => {
      let status = null;
      for (const command of CASH_COMMAND_FLOW) {
        assert.strictEqual(null, status);
        status = stageManager.run(command);
      }
      assert.strictEqual(STATUS.COMPLETE, status);
    });
    it("카드 결제 흐름", () => {
      let status = null;
      for (const command of CARD_COMMAND_FLOW) {
        assert.strictEqual(null, status);
        status = stageManager.run(command);
      }
      assert.strictEqual(STATUS.COMPLETE, status);
    });
    it("초기화", () => {
      assert.doesNotThrow(() => stageManager.initStage());
    });
    it("복사 검증", () => {
      // 한번 모든 흐름을 진행한 후
      let status = null;
      for (const command of CARD_COMMAND_FLOW) {
        assert.strictEqual(null, status);
        status = stageManager.run(command);
      }
      assert.strictEqual(STATUS.COMPLETE, status);

      // 깊은 복사 검증
      const copyStageManager = stageManager.copy();
      assert.ok(copyStageManager instanceof StageManager);
      assert.notStrictEqual(copyStageManager, stageManager);
      assert.ok(copyStageManager !== stageManager);
    });
    it("흐름이 완료된 후 stage 가져오기 - 현금", () => {
      let status = null;
      for (const command of CASH_COMMAND_FLOW) {
        assert.strictEqual(null, status);
        status = stageManager.run(command);
      }
      assert.strictEqual(STATUS.COMPLETE, status);

      const [drink, cash] = stageManager.getSelectedStages();
      assert.ok(Drink.isDrink(drink));
      assert.ok(Cash.isCash(cash));
    });
    it("흐름이 완료된 후 stage 가져오기 - 카드", () => {
      let status = null;
      for (const command of CARD_COMMAND_FLOW) {
        assert.strictEqual(null, status);
        status = stageManager.run(command);
      }
      assert.strictEqual(STATUS.COMPLETE, status);

      const [drink, card] = stageManager.getSelectedStages();
      assert.ok(Drink.isDrink(drink));
      assert.ok(Card.isCard(card));
    });
  });
  describe("실패", () => {
    it("잘못된 생성자", () => {
      assert.throws(() => new StageManager("JUICE"));
      assert.throws(() => new StageManager(MODEL_KEY.DRINK, null));
    });
    it("잘못된 생성자가 들어간 채로 실행", () => {
      const stageManager = new StageManager(MODEL_KEY.DRINK, [1, 2]);
      let status = null;
      assert.throws(() => {
        for (const command of CASH_COMMAND_FLOW) {
          assert.strictEqual(null, status);
          status = stageManager.run(command);
        }
        assert.strictEqual(STATUS.COMPLETE, status);
      });
    });
  });
});
