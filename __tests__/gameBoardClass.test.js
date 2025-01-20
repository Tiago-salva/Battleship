import Gameboard from "../src/gameboardClass.js";

test("Placing a ship", () => {
  const gameBoard = new Gameboard();
  gameBoard.placeShip(2, [2, 6]);

  expect(gameBoard.board[2][6]).toBe(1);
});

test("Receiving an attack", () => {
  const gameBoard = new Gameboard();
  gameBoard.placeShip(2, [2, 6]);
  gameBoard.receiveAttack([2, 6]);

  expect(gameBoard.board[2][6]).toBe(2);
});
