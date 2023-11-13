/* 로깅 관련 유틸 */
const log = (message) => {
  process.stdout.write(message + "\n");
};
const getLoggingDivider = (thin = false) =>
  thin
    ? "\n----------------------------------------------------------------------------\n"
    : "\n============================================================================\n";
const addLineBreakOfTexts = (...texts) => texts.join("\n");

/* 검증 관련 유틸 */
const validString = (value) => typeof value === "string";
const validNumber = (value) => typeof value === "number";
const validFilledString = (value) =>
  validString(value) && value.trim().length > 0;
const validStrictNumber = (value) => validNumber(value) && !Number.isNaN(value);
const validNumberString = (value) => validString(value) && /^\d+$/.test(value);
const validStringRange = (value, minLength = 1, maxLength = 20) =>
  validString(value) &&
  !value.startsWith(" ") &&
  !value.endsWith(" ") &&
  value.length >= minLength &&
  value.length <= maxLength;

module.exports = {
  log,
  getLoggingDivider,
  addLineBreakOfTexts,
  validString,
  validNumber,
  validFilledString,
  validStrictNumber,
  validNumberString,
  validStringRange,
};
