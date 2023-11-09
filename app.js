const readlineLib = require("readline");
const Launcher = require("./launcher");

const readline = readlineLib.createInterface({
  input: process.stdin,
  output: process.stdout,
});
readline.on("close", () => {
  process.exit();
});

// TODO: 사용된 모든 console.log 바꾸기
class Application {
  START_MESSAGE = "안녕하세요. 저희 자판기를 찾아주셔서 감사합니다.";
  END_MESSAGE = "이용해 주셔서 감사합니다.";
  ERROR_MAPPER = {
    NOT_FOUND: {
      COMMAND: "잘못된 명령어입니다.",
      DRINK: "찾는 음료가 없습니다.",
    },
  };

  run() {
    console.log(this.START_MESSAGE);
    const launcher = new Launcher();
    launcher.initDrinks();

    readline.on("line", (input) => {
      if (input === "exit") {
        console.log(this.END_MESSAGE);
        readline.close();
      }
      console.log("입력 : " + input);

      launcher.setCommand(input);
      try {
        launcher.validCommand(input);
      } catch (error) {
        const [type, message] = error.message.split(":");

        console.log(ERROR_MAPPER?.[type]?.[message] ?? "다시 시도해 주세요.");
      }
    });
  }
}
const app = new Application(readlineLib);
app.run();
