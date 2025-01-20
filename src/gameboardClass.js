import Ship from "./shipClass.js";

export default class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(0));

    this.ships = [];
  }

  missedAttacks = [];

  // Recibe las coordenadas y luego crea un ship llamando a la clase shipClass
  placeShip(length, coordinates) {
    const ship = new Ship(length, 0, false, coordinates);
    this.ships.push(ship);
    const [row, col] = coordinates;
    this.board[row][col] = 1;
  }

  // Recibe coordenadas y se fija si en esas coordenadas hay algun barco,
  // De ser asi llama a la funcion hit del barco
  // Si no le dio a ningun barco, entonces almacenar las coordenadas en missedAttacks
  receiveAttack(coordinates) {
    const [row, col] = coordinates;
    if (this.board[row][col] === 1) {
      for (const ship of this.ships) {
        if (ship.position[0] === row && ship.position[1] === col) {
          this.board[row][col] = 2;
        }
      }
    }
  }

  // Debe de verificar si todos los barcon han sido hundidos
  allShipsSunk() {}
}
