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

  run() {
    const byeMessage = "🙇 이용해 주셔서 감사합니다 🙇";
    const reuseMessage = `- 재이용: '${COMMAND.IN_PROGRESS}'\n- 사용 내역: '${COMMAND.HISTORY}'\n- 퇴장: 아무키나 입력`;
    const welcomeMessage =
      "\n\n👋 안녕하세요. 저희 자판기를 찾아주셔서 감사합니다.\n\n";
    logDivider();
    log(welcomeMessage);

    let launcher = new Launcher();
    let status = null;
    readline.prompt();
    readline.on("line", (input) => {
      if (input === COMMAND.END) {
        closeWithLog(byeMessage);
      }
      if (status === STATUS.COMPLETE) {
        if (input === COMMAND.IN_PROGRESS) {
          status = null;
          log(welcomeMessage);
          launcher.newLauncher();
        } else if (input === COMMAND.HISTORY) {
          launcher.logUsageHistory();
          log(reuseMessage);
          logDivider();
        } else {
          closeWithLog(byeMessage);
        }
        return null;
      }

      try {
        const resultStatus = launcher.run(input) ?? null;

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
