const DrinkManager = require("./drinks/drink-manager");

class Launcher {
  command;
  drinkManager = new DrinkManager();

  getAllowedCommand() {
    return ["끝", "콜라", "물", "커피", "현금", "카드"];
  }

  validCommand() {
    if (!this.getAllowedCommand().includes(this.command)) {
      throw Error("NOT_FOUND:COMMAND");
    }
  }

  setCommand(newCommand) {
    this.command = newCommand;
  }

  initDrinks() {
    this.drinkManager.addDrink("콜라", 1100);
    this.drinkManager.addDrink("물", 600);
    this.drinkManager.addDrink("커피", 700);
  }
}

module.exports = Launcher;
