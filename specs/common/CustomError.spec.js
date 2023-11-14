const { describe, it } = require("node:test");
const {
  InvalidError,
  NotFoundError,
  ServerError,
} = require("../../common/CustomError");
const assert = require("assert");

describe("커스텀 에러 테스트", () => {
  describe("성공", () => {
    it("InvalidError 생성", () => {
      const error = new InvalidError();
      assert.strictEqual("", error.getMessage());
    });
    it("InvalidError 생성자", () => {
      const message = "테스트 메시지";
      const error = new InvalidError(message);
      assert.strictEqual(message, error.getMessage());
    });
    it("InvalidError Error의 자식", () => {
      const error = new InvalidError();
      assert.strictEqual(true, error instanceof Error);
    });

    it("NotFoundError 생성", () => {
      const error = new NotFoundError();
      assert.strictEqual("", error.getMessage());
    });
    it("NotFoundError 생성자", () => {
      const message = "테스트 메시지";
      const error = new NotFoundError(message);
      assert.strictEqual(message, error.getMessage());
    });
    it("NotFoundError Error의 자식", () => {
      const error = new NotFoundError();
      assert.strictEqual(true, error instanceof Error);
    });

    it("ServerError 생성", () => {
      const error = new ServerError();
      assert.strictEqual("", error.getMessage());
    });
    it("ServerError 생성자", () => {
      const message = "테스트 메시지";
      const error = new ServerError(message);
      assert.strictEqual(message, error.getMessage());
    });
    it("ServerError Error의 자식", () => {
      const error = new ServerError();
      assert.strictEqual(true, error instanceof Error);
    });
  });

  describe("실패", () => {
    it("InvalidError 잘못된 생성자", () => {
      assert.throws(() => new InvalidError(-1), InvalidError);
      assert.throws(() => new InvalidError(true), InvalidError);
      assert.throws(() => new InvalidError([]), InvalidError);
      assert.throws(() => new InvalidError({}), InvalidError);
    });
    it("NotFoundError 잘못된 생성자", () => {
      assert.throws(() => new NotFoundError(-1), InvalidError);
      assert.throws(() => new NotFoundError(true), InvalidError);
      assert.throws(() => new NotFoundError([])), InvalidError;
      assert.throws(() => new NotFoundError({})), InvalidError;
    });
    it("ServerError 잘못된 생성자", () => {
      assert.throws(() => new ServerError(-1), InvalidError);
      assert.throws(() => new ServerError(true), InvalidError);
      assert.throws(() => new ServerError([]), InvalidError);
      assert.throws(() => new ServerError({}), InvalidError);
    });
  });
});
