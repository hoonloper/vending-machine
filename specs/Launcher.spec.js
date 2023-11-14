const { describe, it, todo, beforeEach } = require("node:test");
const Launcher = require("../app/Launcher");
const assert = require("assert");
const { STATUS, COMMAND } = require("../app/common/constant");

describe("런처 E2E 테스트", () => {
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
    let launcher;
    beforeEach(() => {
      launcher = new Launcher();
    });
    it("현금 결제 흐름", () => {
      let status = null;
      for (const command of CASH_COMMAND_FLOW) {
        assert.strictEqual(null, status);
        status = launcher.run(command);
      }
      assert.strictEqual(STATUS.COMPLETE, status);
      assert.doesNotThrow(() => launcher.logUsageHistory());
      assert.doesNotThrow(() => launcher.newLauncher());
    });
    it("카드 결제 흐름", () => {
      let status = null;
      for (const command of CARD_COMMAND_FLOW) {
        assert.strictEqual(null, status);
        status = launcher.run(command);
      }
      assert.strictEqual(STATUS.COMPLETE, status);
      assert.doesNotThrow(() => launcher.logUsageHistory());
      assert.doesNotThrow(() => launcher.newLauncher());
    });
    it("결제 내역이 없을 때 log 출력", () => {
      assert.strictEqual(undefined, launcher.logUsageHistory());
    });
  });
  todo("실패에 대한 예외는 많아서 여유 있을 때 작성");
});
