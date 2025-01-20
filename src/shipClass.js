export default class Ship {
  constructor(length) {
    this.length = length;
    this.numberOfHits = 0;
    this.sunk = false;
    this.position = [];
  }

  hit() {
    this.numberOfHits += 1;
  }

  isSunk() {
    return this.numberOfHits === this.length;
  }
}
