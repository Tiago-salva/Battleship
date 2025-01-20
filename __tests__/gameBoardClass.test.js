import Gameboard from "../src/gameboardClass.js";

// Tests for placing ships
test("Placing a ship", () => {
  const gameBoard = new Gameboard();
  gameBoard.placeShip(3, [2, 6]);

  expect(gameBoard.board[2][6]).toBe(1);
  expect(gameBoard.board[2][8]).toBe(1);
});

test("Placing a multiple ships", () => {
  const gameBoard = new Gameboard();
  gameBoard.placeShip(3, [2, 6]);
  gameBoard.placeShip(4, [9, 7]);
  gameBoard.placeShip(1, [5, 1]);
  gameBoard.placeShip(2, [6, 3]);

  expect(gameBoard.board[2][6]).toBe(1);
  expect(gameBoard.board[9][7]).toBeFalsy();
  expect(gameBoard.board[5][1]).toBe(1);
  expect(gameBoard.board[6][3]).toBe(1);
});

test("Placing a multiple ships on both directions", () => {
  const gameBoard = new Gameboard();

  gameBoard.placeShip(3, [2, 6]);
  gameBoard.placeShip(4, [4, 5]);
  gameBoard.placeShip(3, [5, 1], false);
  gameBoard.placeShip(2, [6, 3], false);
  gameBoard.placeShip(3, [8, 6], false);

  expect(gameBoard.board[2][6]).toBe(1);
  expect(gameBoard.board[4][5]).toBe(1);
  expect(gameBoard.board[5][1]).toBe(1);
  expect(gameBoard.board[6][3]).toBe(1);
  expect(gameBoard.board[8][6]).toBeFalsy();
});

// Tests for the attacks (receiving, missing and not valid)
test("Receiving an attack", () => {
  const gameBoard = new Gameboard();
  gameBoard.placeShip(2, [2, 6]);
  gameBoard.placeShip(3, [5, 1]);

  gameBoard.receiveAttack([2, 6]);
  gameBoard.receiveAttack([5, 1]);

  expect(gameBoard.board[2][6] && gameBoard.board[5][1]).toBe("X");
  expect(gameBoard.board).toBe("X");
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
test("Getting a ship form coordinates", () => {
  const gameBoard = new Gameboard();
  gameBoard.placeShip(2, [2, 6]);

  expect(gameBoard.getShipAtCoordinates([2], [6]).position).toStrictEqual([
    [2, 6],
    [2, 7],
  ]);
});
