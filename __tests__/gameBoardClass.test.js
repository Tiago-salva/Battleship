import Gameboard from "../src/gameboardClass.js";

// Tests for placing ships
test("Placing a ship", () => {
  const gameBoard = new Gameboard();
  gameBoard.placeShip(3, [2, 6]);

  expect(gameBoard.gameboard[2][6]).toBe(1);
  expect(gameBoard.gameboard[2][8]).toBe(1);
});

test("Placing a multiple ships", () => {
  const gameBoard = new Gameboard();
  gameBoard.placeShip(3, [2, 6]);
  gameBoard.placeShip(4, [9, 7]);
  gameBoard.placeShip(1, [5, 1]);
  gameBoard.placeShip(2, [6, 3]);

  expect(gameBoard.gameboard[2][6]).toBe(1);
  expect(gameBoard.gameboard[9][7]).toBeFalsy();
  expect(gameBoard.gameboard[5][1]).toBe(1);
  expect(gameBoard.gameboard[6][3]).toBe(1);
});

test("Placing a multiple ships on both directions", () => {
  const gameBoard = new Gameboard();

  gameBoard.placeShip(3, [2, 6]);
  gameBoard.placeShip(4, [4, 5]);
  gameBoard.placeShip(3, [5, 1], false);
  gameBoard.placeShip(2, [6, 3], false);
  gameBoard.placeShip(3, [8, 6], false);

  expect(gameBoard.gameboard[2][6]).toBe(1);
  expect(gameBoard.gameboard[4][5]).toBe(1);
  expect(gameBoard.gameboard[5][1]).toBe(1);
  expect(gameBoard.gameboard[6][3]).toBe(1);
  expect(gameBoard.gameboard[8][6]).toBeFalsy();
});

// Tests for the attacks (receiving, missing and not valid)
test("Receiving an attack", () => {
  const gameBoard = new Gameboard();
  gameBoard.placeShip(2, [2, 6]);
  gameBoard.placeShip(3, [5, 1]);

  gameBoard.receiveAttack([2, 6]);
  gameBoard.receiveAttack([5, 1]);

  expect(gameBoard.gameboard[2][6] && gameBoard.gameboard[5][1]).toBe("X");
});

test("Missing an attack", () => {
  const gameBoard = new Gameboard();
  gameBoard.receiveAttack([2, 6]);

  expect(gameBoard.missedAttacks).toStrictEqual([[2, 6]]);
});

test("The attack it's not valid", () => {
  const gameBoard = new Gameboard();

  expect(gameBoard.receiveAttack([-1, 11])).toBeFalsy();
});

// Test for getting a ship form coordinates
test("Getting a ship from coordinates", () => {
  const gameBoard = new Gameboard();
  gameBoard.placeShip(2, [2, 6]);

  expect(gameBoard.getShipAtCoordinates([2], [6]).position).toStrictEqual([
    [2, 6],
    [2, 7],
  ]);
});

// Test for checking if all the ships are sinked
test("Checking if all the ships are sinked (Good path)", () => {
  const gameBoard = new Gameboard();
  gameBoard.placeShip(2, [2, 7]);
  gameBoard.placeShip(3, [8, 4]);

  gameBoard.receiveAttack([2, 7]);
  gameBoard.receiveAttack([2, 8]);

  gameBoard.receiveAttack([8, 4]);
  gameBoard.receiveAttack([8, 5]);
  gameBoard.receiveAttack([8, 6]);

  expect(gameBoard.allShipsSunk()).toBe(true);
});

test("Checking if all the ships are sinked (Bad path)", () => {
  const gameBoard = new Gameboard();
  gameBoard.placeShip(2, [2, 7]);
  gameBoard.placeShip(3, [8, 4]);

  gameBoard.receiveAttack([2, 7]);
  gameBoard.receiveAttack([2, 8]);

  gameBoard.receiveAttack([8, 4]);
  gameBoard.receiveAttack([8, 6]);

  expect(gameBoard.allShipsSunk()).toBe(true);
});
