const readlineLib = require("readline");
const Launcher = require("./Launcher");
const { log, logs, logDivider } = require("./common/utils");
const { STATUS, COMMAND } = require("./common/constant");

const readline = readlineLib.createInterface({
  input: process.stdin,
  output: process.stdout,
});
readline.setPrompt("[>] ");
readline.on("close", () => {
  process.exit();
});

class Application {
  ERROR_MAPPER = {
    NOT_FOUND: {
      COMMAND: "잘못된 명령어입니다.",
      DRINK: "찾는 음료가 없습니다.",
    },
  };
  launcher;

  constructor() {
    this.launcher = new Launcher();
  }

  getLauncher() {
    return this.launcher;
  }

  run() {
    const byeMessage = "🙇 이용해 주셔서 감사합니다 🙇";
    const reuseMessage = `- 재이용: '${COMMAND.IN_PROGRESS}'\n- 사용 내역: '${COMMAND.HISTORY}'\n- 퇴장: 아무키나 입력`;
    const welcomeMessage =
      "\n\n👋 안녕하세요. 저희 자판기를 찾아주셔서 감사합니다.\n\n";
    logDivider();
    log(welcomeMessage);

    const launcher = this.getLauncher();
    let status = null;

    readline.prompt();
    readline.on("line", (command) => {
      // 끝 입력하면 언제든 종료
      if (command === COMMAND.END) {
        closeWithLog(byeMessage);
      }

      // 완료됐을 때 핸들링
      if (status === STATUS.COMPLETE) {
        if (command === COMMAND.IN_PROGRESS) {
          status = null;
          log(welcomeMessage);
          launcher.newLauncher();
          return null;
        }
        if (command === COMMAND.HISTORY) {
          launcher.logUsageHistory();
          log(reuseMessage);
          logDivider();
          return null;
        }

        closeWithLog(byeMessage);
      }

      try {
        const resultStatus = launcher.run(command) ?? null;

        if (resultStatus === STATUS.COMPLETE) {
          status = resultStatus;
          logs(byeMessage, "\n", reuseMessage);
          logDivider();
        }
      } catch (error) {
        log(error);

        const [type, message] = error.message.split(":");
        log(this.ERROR_MAPPER?.[type]?.[message] ?? "다시 시도해 주세요.");
      } finally {
        readline.prompt();
      }
    });
  }
}

function closeWithLog(message) {
  logDivider();
  log(message);
  readline.close();
}

const app = new Application();
app.run();
