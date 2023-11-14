const { tap } = require("node:test/reporters");
const { run } = require("node:test");
const path = require("node:path");

const ROOT_PATH = "./specs";
const MODULES = ["Launcher", "LauncherLogger"];
const MODELS = ["Card", "Cash", "Drink", "DrinkManager"];
const COMMON = ["CustomError", "utils"];

const pathModules = MODULES.map((module) =>
  path.resolve(`${ROOT_PATH}/${module}.spec`)
);
const pathModels = MODELS.map((model) =>
  path.resolve(`${ROOT_PATH}/models/${model}.spec`)
);
const pathCommon = COMMON.map((common) =>
  path.resolve(`${ROOT_PATH}/common/${common}.spec`)
);

run({ files: [...pathModules, ...pathModels, ...pathCommon] })
  .compose(tap)
  .pipe(process.stdout);
