const { logs } = require("./utils");

class InvalidError extends Error {
  message;
  constructor(message = "") {
    this.message = message;
    super(`INVALID:${message}`);
  }
  static isError(error) {
    return error instanceof InvalidError;
  }
  getMessage() {
    return this.message;
  }
  logMessage() {
    logs(
      "⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️",
      "잘못된 값을 입력했습니다.",
      `사용자가 입력한 값 -> ${this.getMessage()}`
    );
  }
}
class NotFoundError extends Error {
  message;
  constructor(message = "") {
    this.message = message;
    super(`NOT_FOUND:${message}`);
  }
  static isError(error) {
    return error instanceof NotFoundError;
  }
  getMessage() {
    return this.message;
  }
  logMessage() {
    logs(
      "⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️",
      "입력된 값을 찾을 수 없습니다.",
      `사용자가 입력한 값 -> ${this.getMessage()}`
    );
  }
}
class ServerError extends Error {
  message;
  constructor(message = "") {
    this.message = message;
    super(`SERVER:${message}`);
  }
  static isError(error) {
    return error instanceof ServerError;
  }
  getMessage() {
    return this.message;
  }
  logMessage() {
    logs(
      "🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨",
      "서버 에러입니다. 같은 증상이 반복되면 처음부터 다시 진행해 주시기 바랍니다.",
      `사용자가 입력한 값 -> ${this.getMessage()}`
    );
  }
}

module.exports = { InvalidError, NotFoundError, ServerError };
