const { describe, it } = require("node:test");
const {
  InvalidError,
  NotFoundError,
  ServerError,
} = require("../../app/common/CustomError");
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
      assert.ok(error instanceof Error);
    });
    it("InvalidError의 인스턴스 여부", () => {
      const error = new InvalidError();
      assert.ok(InvalidError.isError(error));
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
      assert.ok(error instanceof Error);
    });
    it("NotFoundError의 인스턴스 여부", () => {
      const error = new NotFoundError();
      assert.ok(NotFoundError.isError(error));
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
      assert.ok(error instanceof Error);
    });
    it("ServerError의 인스턴스 여부", () => {
      const error = new ServerError();
      assert.ok(ServerError.isError(error));
    });
  });

  describe("실패", () => {
    it("InvalidError 잘못된 생성자", () => {
      assert.throws(() => new InvalidError(-1), InvalidError);
      assert.throws(() => new InvalidError(true), InvalidError);
      assert.throws(() => new InvalidError([]), InvalidError);
      assert.throws(() => new InvalidError({}), InvalidError);
    });
    it("InvalidError의 인스턴스 아님", () => {
      assert.strictEqual(false, InvalidError.isError(new Error()));
    });

    it("NotFoundError 잘못된 생성자", () => {
      assert.throws(() => new NotFoundError(-1), InvalidError);
      assert.throws(() => new NotFoundError(true), InvalidError);
      assert.throws(() => new NotFoundError([])), InvalidError;
      assert.throws(() => new NotFoundError({})), InvalidError;
    });
    it("NotFoundError의 인스턴스 아님", () => {
      assert.strictEqual(false, NotFoundError.isError(new Error()));
    });

    it("ServerError 잘못된 생성자", () => {
      assert.throws(() => new ServerError(-1), InvalidError);
      assert.throws(() => new ServerError(true), InvalidError);
      assert.throws(() => new ServerError([]), InvalidError);
      assert.throws(() => new ServerError({}), InvalidError);
    });
    it("ServerError의 인스턴스 아님", () => {
      assert.strictEqual(false, ServerError.isError(new Error()));
    });
  });
});
