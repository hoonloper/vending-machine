const readlineLib = require("readline");
const Launcher = require("./Launcher");

const readline = readlineLib.createInterface({
  input: process.stdin,
  output: process.stdout,
});
readline.on("close", () => {
  process.exit();
});

// TODO: 사용된 모든 console.log 바꾸기
class Application {
  START_MESSAGE =
    "안녕하세요. 저희 자판기를 찾아주셔서 감사합니다.\n구매 희망 - '구매', 나가기 - '끝' 입력";
  END_MESSAGE = "이용해 주셔서 감사합니다.";
  ERROR_MAPPER = {
    NOT_FOUND: {
      COMMAND: "잘못된 명령어입니다.",
      DRINK: "찾는 음료가 없습니다.",
    },
  };
  RETRY_MESSAGE = "다시 이용하시려면 '이용'을 입력해 주세요.";

  run() {
    const startMessage = this.START_MESSAGE;
    const endMessage = this.END_MESSAGE;
    const retryMeesage = this.RETRY_MESSAGE;
    console.log(startMessage);
    const sendEndMessage = () => {
      console.log(endMessage);
      readline.close();
    };

    let launcher = new Launcher();
    let status = null;

    readline.on("line", (input) => {
      if (input === "끝" || status === "END") {
        sendEndMessage();
      }
      if (status === "COMPLETE") {
        if (input !== "이용") {
          sendEndMessage();
          return;
        }
        status = null;
        launcher = new Launcher();
        console.log(startMessage);
        return;
      }
      console.log("\n입력: " + input);

      launcher.setCommand(input);
      try {
        // launcher.validCommand(input); 완성되면 허용 키워드 입력해야 함
        status = launcher.run() ?? null;

        if (status === "COMPLETE") {
          console.log(endMessage);
          console.log(retryMeesage);
          return;
        }
      } catch (error) {
        console.log(error);
        const [type, message] = error.message.split(":");

        console.log(
          this.ERROR_MAPPER?.[type]?.[message] ?? "다시 시도해 주세요."
        );
      }
    });
  }
}
const app = new Application();
app.run();
