const assert = require("assert");
const { describe, it } = require("node:test");
const {
  log,
  getLoggingDivider,
  addLineBreakOfTexts,
  validString,
  validNumber,
  validFilledString,
  validStrictNumber,
  validNumberString,
} = require("../../app/common/utils");

describe("유틸 테스트", () => {
  describe("성공", () => {
    it("로그 테스트", () => {
      assert.doesNotThrow(() => log("로그 출력"));
    });
    it("굵은 구분선 가져오기", () => {
      const divider =
        "\n============================================================================\n";
      assert.strictEqual(divider, getLoggingDivider());
    });
    it("얇은 구분선 가져오기", () => {
      const divider =
        "\n----------------------------------------------------------------------------\n";
      assert.strictEqual(divider, getLoggingDivider(true));
    });
    it("텍스트들 사이에 줄바꿈 추가", () => {
      const text1 = "가나다라마바사";
      const text2 = "abcdefg";
      const text3 = "1234567";
      const text = text1 + "\n" + text2 + "\n" + text3;
      assert.strictEqual(text, addLineBreakOfTexts(text1, text2, text3));
    });
    it("문자열 타입 검증", () => {
      assert.ok(validString(""));
      assert.ok(validString("123"));
      assert.ok(validString("abc"));
      assert.ok(validString("가나다"));
    });
    it("채워진 문자열 검증", () => {
      assert.ok(validFilledString("t"));
      assert.ok(validFilledString("123"));
      assert.ok(validFilledString("abc"));
      assert.ok(validFilledString("가나다"));
    });
    it("숫자 타입 검증", () => {
      assert.ok(validNumber(0));
      assert.ok(validNumber(-1));
      assert.ok(validNumber(1));
      assert.ok(validNumber(Number.MAX_SAFE_INTEGER));
      assert.ok(validNumber(Number.MIN_SAFE_INTEGER));
      assert.ok(validNumber(NaN));
    });
    it("엄격한 숫자 타입 검증", () => {
      assert.ok(validStrictNumber(0));
      assert.ok(validStrictNumber(-1));
      assert.ok(validStrictNumber(1));
      assert.ok(validStrictNumber(Number.MAX_SAFE_INTEGER));
      assert.ok(validStrictNumber(Number.MIN_SAFE_INTEGER));
    });
    it("숫자 문자열 검증", () => {
      assert.ok(validNumberString("0"));
      assert.ok(validNumberString("123"));
      assert.ok(validNumberString("1000100101021301203"));
      assert.ok(validNumberString(`${Number.MAX_SAFE_INTEGER}`));
    });
  });
  describe("실패", () => {
    it("문자열 타입 검증", () => {
      assert.strictEqual(false, validString(1));
      assert.strictEqual(false, validString(true));
      assert.strictEqual(false, validString([]));
      assert.strictEqual(false, validString({}));
      assert.strictEqual(false, validString(null));
      assert.strictEqual(false, validString(undefined));
    });
    it("채워진 문자열 검증", () => {
      assert.strictEqual(false, validFilledString(""));
      assert.strictEqual(false, validFilledString(1));
      assert.strictEqual(false, validFilledString(true));
      assert.strictEqual(false, validFilledString([]));
      assert.strictEqual(false, validFilledString({}));
      assert.strictEqual(false, validFilledString(null));
      assert.strictEqual(false, validFilledString(undefined));
    });
    it("숫자 타입 검증", () => {
      assert.strictEqual(false, validNumber(""));
      assert.strictEqual(false, validNumber(true));
      assert.strictEqual(false, validNumber([]));
      assert.strictEqual(false, validNumber({}));
      assert.strictEqual(false, validNumber(null));
      assert.strictEqual(false, validNumber(undefined));
    });
    it("엄격한 숫자 타입 검증", () => {
      assert.strictEqual(false, validStrictNumber(""));
      assert.strictEqual(false, validStrictNumber(true));
      assert.strictEqual(false, validStrictNumber([]));
      assert.strictEqual(false, validStrictNumber({}));
      assert.strictEqual(false, validStrictNumber(NaN));
      assert.strictEqual(false, validStrictNumber(null));
      assert.strictEqual(false, validStrictNumber(undefined));
    });
    it("숫자 문자열 검증", () => {
      assert.strictEqual(false, validNumberString("123@"));
      assert.strictEqual(false, validNumberString("한글"));
      assert.strictEqual(false, validNumberString(true));
      assert.strictEqual(false, validNumberString([]));
      assert.strictEqual(false, validNumberString({}));
      assert.strictEqual(false, validNumberString(null));
      assert.strictEqual(false, validNumberString(undefined));
    });
  });
});
