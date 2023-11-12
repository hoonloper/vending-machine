const { logs } = require("./utils");

class InvalidError extends Error {
  constructor(message = "") {
    super(message);
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
      `입력된 값 -> ${this.getMessage()}`
    );
  }
}
class NotFoundError extends Error {
  constructor(message = "") {
    super(message);
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
      `입력된 값 -> ${this.getMessage()}`
    );
  }
}
class ServerError extends Error {
  constructor(message = "") {
    super(message);
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
      `입력된 값 -> ${this.getMessage()}`
    );
  }
}

module.exports = { InvalidError, NotFoundError, ServerError };
