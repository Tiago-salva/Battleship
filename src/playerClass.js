import Gameboard from "./gameboardClass.js";

export default class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.playerGameboard = new Gameboard();
  }

  attack(opponent, coordinates) {
    if (this.type === "computer") {
      if (
        opponent.playerGameboard.gameboard[coordinates] === "X" ||
        opponent.playerGameboard.gameboard[coordinates] === "O"
      ) {
        return false;
      }

      return opponent.playerGameboard.receiveAttack(coordinates);
    }

    return opponent.playerGameboard.receiveAttack(coordinates);
  }
}
