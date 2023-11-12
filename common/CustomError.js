class InvalidError extends Error {
  constructor(message) {
    super(`INVALID:${message}`);
  }
  static isInvalidError(error) {
    return error instanceof InvalidError;
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(`NOT_FOUND:${message}`);
  }
  static isNotFoundError(error) {
    return error instanceof NotFoundError;
  }
}
class ServerError extends Error {
  constructor(message) {
    super(`SERVER:${message}`);
  }
  static isServerError(error) {
    return error instanceof ServerError;
  }
}

module.exports = { InvalidError, NotFoundError, ServerError };
