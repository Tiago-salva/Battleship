import Gameboard from "./gameboardClass";

export default class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.playerGameboard = new Gameboard();
  }

  attack(opponent, coordinates = null) {
    if (this.type === "computer") {
      const randomRow = Math.floor(
        Math.random() * opponent.playerGameboard.gameboard.length
      );
      const randomCol = Math.floor(
        Math.random() * opponent.playerGameboard.gameboard[0].length
      );
      return opponent.playerGameboard.receiveAttack([randomRow, randomCol]);
    }

    return opponent.playerGameboard.receiveAttack(coordinates);
  }
}
