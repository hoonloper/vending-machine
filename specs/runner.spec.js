const { tap } = require("node:test/reporters");
const { run } = require("node:test");
const path = require("node:path");

const ROOT_PATH = "./specs";
const MODELS = ["Card", "Cash", "Drink", "DrinkManager"];

const pathModels = MODELS.map((model) =>
  path.resolve(`${ROOT_PATH}/models/${model}.spec`)
);

run({ files: pathModels }).compose(tap).pipe(process.stdout);
