import Ship from "./shipClass.js";

export default class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(0));

    this.ships = new Map();
  }

  missedAttacks = [];

  getShipAtCoordinates(row, col) {
    return this.ships.get(`${row},${col}`) || null;
  }

  // Recibe las coordenadas y luego crea un ship llamando a la clase shipClass
  placeShip(length, coordinates, isHorizontal = true) {
    let [row, col] = coordinates;
    // Si las coorrdenadas sobresalen del tablero, devuelve false
    if (
      row < 0 ||
      row >= this.board.length ||
      col < 0 ||
      col >= this.board.length
    ) {
      return false;
    }

    // Si el final del barco sobresale del board, devuelve false
    if (isHorizontal && col + length > this.board[0].length) {
      return false;
    }
    if (!isHorizontal && row + length > this.board.length) {
      return false;
    }

    const ship = new Ship(length);

    for (let i = 0; i < ship.length; i++) {
      this.ships.set(`${row},${col}`, ship);
      this.board[row][col] = 1;
      ship.position.push([row, col]);

      if (isHorizontal) {
        col++;
      } else {
        row++;
      }
    }
    return true;
  }

  // Recibe coordenadas y se fija si en esas coordenadas hay algun barco,
  // De ser asi llama a la funcion hit del barco
  // De lo contrario, almacena las coordenadas en missedAttacks
  receiveAttack(coordinates) {
    const [row, col] = coordinates;

    if (
      row < 0 ||
      row >= this.board.length ||
      col < 0 ||
      col >= this.board.length
    ) {
      return false;
    }

    if (this.board[row][col] === 1) {
      const hittedShip = this.getShipAtCoordinates(row, col);
      this.board[row][col] = "X";
      hittedShip.isSunk();
    } else {
      this.missedAttacks.push(coordinates);
      this.board[row][col] = "O";
    }
  }

  // Debe de verificar si todos los barcon han sido hundidos
  allShipsSunk() {}
}
