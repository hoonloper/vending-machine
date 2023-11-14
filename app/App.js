const readlineLib = require("readline");
const Launcher = require("./Launcher");
const {
  log,
  addLineBreakOfTexts,
  getLoggingDivider,
} = require("./common/utils");
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

  run() {
    const launcher = this.#getLauncher();
    let status = null; // 완료 여부 상태

    // 앱 실행
    const execute = (command) =>
      command === COMMAND.END // 끝 입력하면 언제든 종료
        ? closeWithLog(LauncherLogger.getByeMessage())
        : status === STATUS.COMPLETE // 완료됐을 때 핸들링
        ? handleCompleted(command)
        : executeLauncher(command); // 자판기 가동

    // 구매 완료 후 핸들링
    const handleCompleted = (command) =>
      command === COMMAND.RETRY
        ? retry()
        : command === COMMAND.HISTORY
        ? history()
        : closeWithLog(LauncherLogger.getByeMessage());

    // 자판기 가동
    const executeLauncher = (command) => {
      try {
        status = launcher.run(command) ?? null;

        if (status === STATUS.COMPLETE) {
          const completeMessage = addLineBreakOfTexts(
            LauncherLogger.getByeMessage(),
            LauncherLogger.getReuseMessage()
          );
          log(completeMessage);
        }
      } catch (error) {
        const message = checkCustomError(error)
          ? error.getMessage()
          : "🚨 알 수 없는 에러입니다. 🚨";
        const thinDivider = getLoggingDivider(true);
        log(addLineBreakOfTexts(thinDivider, message, thinDivider));
      } finally {
        readline.prompt();
        return null;
      }
    };

    // 커스텀 에러 확인
    const checkCustomError = (error) =>
      ServerError.isError(error) ||
      InvalidError.isError(error) ||
      NotFoundError.isError(error);

    // 종료
    const closeWithLog = (message) => {
      launcher.logUsageHistory();
      log(addLineBreakOfTexts(getLoggingDivider(), message));
      readline.close();
      return null;
    };

    // 다시 이용
    const retry = () => {
      status = null;
      LauncherLogger.logWelcomeMessage();
      launcher.newLauncher();
      return null;
    };

    // 사용 내역 조회
    const history = () => {
      launcher.logUsageHistory();
      LauncherLogger.logReuseMessage();
      log(getLoggingDivider());
      return null;
    };

    // 키 입력 받는 부분
    readline.prompt();
    readline.on("line", execute);
  }
}

const app = new Application();
app.run();
