const readlineLib = require("readline");

const readline = readlineLib.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Application {
  run() {
    readline.on("line", (input) => {
      if (input === "exit") {
        readline.close();
      }
    });
  }
}
readline.on("close", () => {
  process.exit();
});

const app = new Application(readlineLib);
app.run();
