import Ship from "../src/shipClass.js";

const firstShip = new Ship(3, 0, false, [2, 6]);

test("Is the ship sunk?", () => {
  expect(firstShip.isSunk()).toBe(false);
});

test("The ship received a hit", () => {
  firstShip.hit();
  expect(firstShip.numberOfHits).toBe(2);
});
