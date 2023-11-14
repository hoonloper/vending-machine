const { tap } = require("node:test/reporters");
const { run } = require("node:test");
const path = require("node:path");

const ROOT_PATH = "./specs";
const MODELS = ["Card", "Cash", "Drink", "DrinkManager"];
const COMMON = ["CustomError", "utils"];

const pathModels = MODELS.map((model) =>
  path.resolve(`${ROOT_PATH}/models/${model}.spec`)
);
const pathCommon = COMMON.map((common) =>
  path.resolve(`${ROOT_PATH}/common/${common}.spec`)
);

run({ files: [...pathModels, ...pathCommon] })
  .compose(tap)
  .pipe(process.stdout);
