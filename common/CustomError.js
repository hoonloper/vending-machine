class InvalidError extends Error {
  constructor(message) {
    super(`INVALID:${message}`);
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(`NOT_FOUND:${message}`);
  }
}
class ServerError extends Error {
  constructor(message) {
    super(`SERVER:${message}`);
  }
}

module.exports = { InvalidError, NotFoundError, ServerError };
