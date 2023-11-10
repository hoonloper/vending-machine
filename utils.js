const log = (message) => {
  process.stdout.write(message);
};

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

export {
  log,
  validString,
  validNumber,
  validFilledString,
  validStrictNumber,
  validNumberString,
  validStringRange,
};
