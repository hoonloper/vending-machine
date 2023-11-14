const { tap } = require("node:test/reporters");
const { run } = require("node:test");
const path = require("node:path");

const ROOT_PATH = "./specs";
const MODULES = ["Launcher", "LauncherLogger"];
const STAGES = [
  "CardStage",
  "CashStage",
  "DrinkStage",
  "PaymentStage",
  "StageManager",
].slice(0, 3); // 각 스테이지 테스트 코드 작성시 하나씩 풀기
const MODELS = ["Card", "Cash", "Drink", "DrinkManager"];
const COMMON = ["CustomError", "utils"];

const pathStages = STAGES.map((stage) =>
  path.resolve(`${ROOT_PATH}/stages/${stage}.spec`)
);
const pathModules = MODULES.map((module) =>
  path.resolve(`${ROOT_PATH}/${module}.spec`)
);
const pathModels = MODELS.map((model) =>
  path.resolve(`${ROOT_PATH}/models/${model}.spec`)
);
const pathCommon = COMMON.map((common) =>
  path.resolve(`${ROOT_PATH}/common/${common}.spec`)
);

run({ files: [...pathStages, ...pathModules, ...pathModels, ...pathCommon] })
  .compose(tap)
  .pipe(process.stdout);
