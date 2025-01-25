import Ship from "./shipClass.js";

export default class Gameboard {
  constructor() {
    this.gameboard = Array(10)
      .fill()
      .map(() => Array(10).fill(0));

    this.ships = new Map();
  }

  missedAttacks = [];

  getShipAtCoordinates(row, col) {
    return this.ships.get(`${row},${col}`) || null;
  }

  // Receive the coordinates, and then creates a ship, calling the clase shipClass
  placeShip(length, coordinates, isHorizontal = true) {
    let [row, col] = coordinates;
    // If the coordinates stick out from the board, return false
    if (
      row < 0 ||
      row >= this.gameboard.length ||
      col < 0 ||
      col >= this.gameboard.length
    ) {
      return false;
    }

    // If all the ship stick out from the gameboard, return false
    if (isHorizontal && col + length > this.gameboard[0].length) {
      return false;
    }
    if (!isHorizontal && row + length > this.gameboard.length) {
      return false;
    }

    const ship = new Ship(length);

    for (let i = 0; i < ship.length; i++) {
      this.ships.set(`${row},${col}`, ship);
      this.gameboard[row][col] = 1;
      ship.position.push([row, col]);

      if (isHorizontal) {
        col++;
      } else {
        row++;
      }
    }
    return true;
  }

  receiveAttack(coordinates) {
    const [row, col] = coordinates;

    if (
      row < 0 ||
      row >= this.gameboard.length ||
      col < 0 ||
      col >= this.gameboard.length
    ) {
      return false;
    }

    // If there's a ship, then attack
    if (this.gameboard[row][col] === 1) {
      const hittedShip = this.getShipAtCoordinates(row, col);
      this.gameboard[row][col] = "X";
      hittedShip.hit();
      hittedShip.isSunk();
    } else {
      this.missedAttacks.push(coordinates);
      this.gameboard[row][col] = "O";
    }
  }

  allShipsSunk() {
    const checkedShips = new Set();

    for (const ship of this.ships.values()) {
      if (checkedShips.has(ship)) continue;

      if (!ship.isSunk()) return false;

      checkedShips.add(ship);
    }

    return true;
  }
}
