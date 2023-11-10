const log = (message) => {
  process.stdout.write(message + "\n");
};
const logs = (...messages) => {
  messages.forEach((message) => {
    log(message);
  });
};
const logDivider = (thin) => {
  if (thin) {
    log(
      "\n----------------------------------------------------------------------------\n"
    );
  } else {
    log(
      "\n============================================================================\n"
    );
  }
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

module.exports = {
  log,
  logs,
  logDivider,
  validString,
  validNumber,
  validFilledString,
  validStrictNumber,
  validNumberString,
  validStringRange,
};
