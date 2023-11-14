const { describe, it } = require("node:test");
const LauncherLogger = require("../app/LauncherLogger");
const assert = require("assert");
const { COMMAND } = require("../app/common/constant");

describe("런처 로거 테스트", () => {
  const WELCOME_MESSAGE =
    "\n\n👋 안녕하세요. 저희 자판기를 찾아주셔서 감사합니다.\n\n";
  const REUSE_MESSAGE = `- 재이용: '${COMMAND.RETRY}'\n- 사용 내역: '${COMMAND.HISTORY}'\n- 퇴장: 아무키나 입력`;
  const BYE_MESSAGE = "🙇 이용해 주셔서 감사합니다 🙇";

  it("환영 메시지 가져오기", () => {
    assert.strictEqual(WELCOME_MESSAGE, LauncherLogger.getWelcomeMessage());
  });
  it("환영 메시지 로깅", () => {
    assert.doesNotThrow(() => LauncherLogger.logWelcomeMessage());
  });
  it("재이용 메시지 가져오기", () => {
    assert.strictEqual(REUSE_MESSAGE, LauncherLogger.getReuseMessage());
  });
  it("재이용 메시지 로깅", () => {
    assert.doesNotThrow(() => LauncherLogger.logReuseMessage());
  });
  it("끝 메시지 가져오기", () => {
    assert.strictEqual(BYE_MESSAGE, LauncherLogger.getByeMessage());
  });
  it("끝 메시지 로깅", () => {
    assert.doesNotThrow(() => LauncherLogger.logByeMessage());
  });
});
