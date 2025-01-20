export default class Ship {
  constructor(lenght, numberOfHits, sunk, position) {
    this.lenght = lenght;
    this.numberOfHits = numberOfHits;
    this.sunk = sunk;
    this.position = position;
  }

  hit() {
    this.numberOfHits += 1;
  }

  isSunk() {
    return this.numberOfHits === this.lenght;
  }
}
