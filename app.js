const readlineLib = require("readline");
const Launcher = require("./Launcher");
const { log, logs } = require("./common/utils");

const readline = readlineLib.createInterface({
  input: process.stdin,
  output: process.stdout,
});
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
    const byeMessage = "이용해 주셔서 감사합니다.";
    const reuseMessage = "재이용 - '구매' 입력\n퇴장 - '끝' 입력";
    const welcomeMessage = "안녕하세요. 저희 자판기를 찾아주셔서 감사합니다.";
    log(welcomeMessage);

    let launcher = new Launcher();
    let status = null;

    readline.on("line", (input) => {
      if (input === "끝") {
        closeWithLog(byeMessage);
      }
      if (status === "COMPLETE") {
        if (input !== "이용") {
          closeWithLog(byeMessage);
        }
        status = null;
        launcher = Launcher.newLauncher();
        log(welcomeMessage);
        return;
      }
      log("\n입력: " + input);

      try {
        const status = launcher.run(input) ?? null;
        if (status === "COMPLETE") {
          logs(byeMessage, reuseMessage);
          return null;
        }
      } catch (error) {
        log(error);
        const [type, message] = error.message.split(":");

        log(this.ERROR_MAPPER?.[type]?.[message] ?? "다시 시도해 주세요.");
      }
    });
  }
}

function closeWithLog(message) {
  log(message);
  readline.close();
}

const app = new Application();
app.run();
