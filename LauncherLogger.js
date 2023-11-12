const { log } = require("console");
const { COMMAND } = require("./common/constant");

class LauncherLogger {
  static #welcomeMessage =
    "\n\n👋 안녕하세요. 저희 자판기를 찾아주셔서 감사합니다.\n\n";
  static #reuseMessage = `- 재이용: '${COMMAND.IN_PROGRESS}'\n- 사용 내역: '${COMMAND.HISTORY}'\n- 퇴장: 아무키나 입력`;
  static #byeMessage = "🙇 이용해 주셔서 감사합니다 🙇";

  static getWelcomeMessage() {
    return this.#welcomeMessage;
  }
  static getReuseMessage() {
    return this.#reuseMessage;
  }
  static getByeMessage() {
    return this.#byeMessage;
  }
  static logWelcomeMessage() {
    log(this.getWelcomeMessage());
  }
  static logReuseMessage() {
    log(this.getReuseMessage());
  }
  static logByeMessage() {
    log(this.getByeMessage());
  }
}

module.exports = LauncherLogger;
