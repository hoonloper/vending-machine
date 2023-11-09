const readlineLib = require("readline");
const DrinkManager = require("./drinks/drink-manager");

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
  drinkManager = new DrinkManager();

  run() {
    console.log(this.START_MESSAGE);
    this.initDrinks();

    readline.on("line", (input) => {
      if (input === "exit") {
        console.log(this.END_MESSAGE);
        readline.close();
      }
      console.log("입력 : " + input);
    });
  }

  initDrinks() {
    this.drinkManager.addDrink("콜라", 1100);
    this.drinkManager.addDrink("물", 600);
    this.drinkManager.addDrink("커피", 700);
  }
}
const app = new Application(readlineLib);
app.run();
