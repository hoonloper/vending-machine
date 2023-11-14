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
  describe("실패", () => {});
});
