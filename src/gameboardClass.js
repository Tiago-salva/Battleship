import Ship from "./shipClass.js";

export default class Gameboard {
  constructor() {
    this.gameboard = Array(10)
      .fill()
      .map(() => Array(10).fill(0));

    this.ships = new Map();
  }

  directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  getShipAtCoordinates(row, col) {
    return this.ships.get(`${row},${col}`) || null;
  }

  blockAdjacentCells(row, col, boardSize) {
    this.directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 &&
        newRow < boardSize &&
        newCol >= 0 &&
        newCol < boardSize
      ) {
        if (this.gameboard[newRow][newCol] === 0) {
          this.gameboard[newRow][newCol] = "/";
        }
      }
    });
  }

  // Receive the coordinates, and then creates a ship, calling the clase shipClass
  placeShip(length, coordinates, isHorizontal) {
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

    // Check if the position of the ship it's already occuped
    for (let i = 0; i < ship.length; i++) {
      if (this.gameboard[row][col] === 1 || this.gameboard[row][col] === "/") {
        return false;
      }

      if (isHorizontal) {
        col++;
      } else {
        row++;
      }
    }

    // Restart the variables
    [row, col] = coordinates;

    // Add every position of the ship
    for (let i = 0; i < ship.length; i++) {
      this.ships.set(`${row},${col}`, ship);
      this.gameboard[row][col] = 1;
      ship.position.push([row, col]);
      this.blockAdjacentCells(row, col, 10);

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
      if (hittedShip.isSunk()) {
        hittedShip.position.forEach((position) => {
          const [row, col] = position;
          this.gameboard[row][col] = "#";
        });
      }
      return true;
    } else if (
      this.gameboard[row][col] === 0 ||
      this.gameboard[row][col] === "/"
    ) {
      this.gameboard[row][col] = "O";
      return;
    }
    return false;
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
