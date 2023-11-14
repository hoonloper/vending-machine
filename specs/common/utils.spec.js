const assert = require("assert");
const { describe, it } = require("node:test");
const {
  getLoggingDivider,
  addLineBreakOfTexts,
  validString,
  validNumber,
  validFilledString,
  validStrictNumber,
  validNumberString,
} = require("../../common/utils");

describe("유틸 테스트", () => {
  describe("성공", () => {
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
});
