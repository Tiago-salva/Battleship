import Ship from "../src/shipClass.js";

const firstShip = new Ship(3);

test("Is the ship sunk?", () => {
  expect(firstShip.isSunk()).toBeFalsy();
});

test("The ship received a hit", () => {
  firstShip.hit();
  expect(firstShip.numberOfHits).toBe(1);
});
