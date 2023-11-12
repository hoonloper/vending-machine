const readlineLib = require("readline");
const Launcher = require("./Launcher");
const { log, logs, logDivider } = require("./common/utils");
const { STATUS, COMMAND } = require("./common/constant");
const {
  ServerError,
  InvalidError,
  NotFoundError,
} = require("./common/CustomError");
const LauncherLogger = require("./LauncherLogger");

const readline = readlineLib.createInterface({
  input: process.stdin,
  output: process.stdout,
});
readline.setPrompt("[>] ");
readline.on("close", () => {
  process.exit();
});

class Application {
  launcher;

  constructor() {
    LauncherLogger.logWelcomeMessage();
    this.launcher = new Launcher();
  }

  #getLauncher() {
    return this.launcher;
  }

  #closeWithLog(message) {
    logDivider();
    log(message);
    readline.close();
  }

  run() {
    const launcher = this.#getLauncher();
    const closeWithLog = this.#closeWithLog;
    let status = null;

    readline.prompt();
    readline.on("line", (command) => {
      // 끝 입력하면 언제든 종료
      if (command === COMMAND.END) {
        launcher.logUsageHistory();
        closeWithLog(LauncherLogger.getByeMessage());
      }

      // 완료됐을 때 핸들링
      if (status === STATUS.COMPLETE) {
        if (command === COMMAND.IN_PROGRESS) {
          status = null;
          LauncherLogger.logWelcomeMessage();
          launcher.newLauncher();
          return null;
        }
        if (command === COMMAND.HISTORY) {
          launcher.logUsageHistory();
          LauncherLogger.logReuseMessage();
          logDivider();
          return null;
        }

        closeWithLog(LauncherLogger.getByeMessage());
      }

      try {
        const resultStatus = launcher.run(command) ?? null;

        if (resultStatus === STATUS.COMPLETE) {
          status = resultStatus;
          logs(
            LauncherLogger.getByeMessage(),
            "\n",
            LauncherLogger.getReuseMessage()
          );
          logDivider();
        }
      } catch (error) {
        logDivider(true);

        const isCustomError =
          ServerError.isError(error) ||
          InvalidError.isError(error) ||
          NotFoundError.isError(error);
        if (isCustomError) {
          error.logMessage();
        } else {
          log("🚨 알 수 없는 에러입니다. 🚨");
          log(error);
        }

        logDivider(true);
      } finally {
        readline.prompt();
      }
    });
  }
}

const app = new Application();
app.run();
