const STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
  COMPLETE: "COMPLETE",
};
const MODEL_KEY = {
  DRINK: "DRINK",
  CARD: "CARD",
  CASH: "CASH",
  PAYMENT: "PAYMENT",
};
const COMMAND = {
  IN_PROGRESS: "진행",
  RETRY: "다시",
  PAY: "결제",
  END: "끝",
};

module.exports = { STATUS, MODEL_KEY, COMMAND };
