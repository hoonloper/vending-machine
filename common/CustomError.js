class InvalidError extends Error {
  constructor(message) {
    super(`INVALID:${message}`);
  }
  static isError(error) {
    return error instanceof InvalidError;
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(`NOT_FOUND:${message}`);
  }
  static isError(error) {
    return error instanceof NotFoundError;
  }
}
class ServerError extends Error {
  constructor(message) {
    super(`SERVER:${message}`);
  }
  static isError(error) {
    return error instanceof ServerError;
  }
}

module.exports = { InvalidError, NotFoundError, ServerError };
