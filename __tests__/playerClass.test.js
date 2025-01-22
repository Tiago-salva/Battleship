import Player from "../src/playerClass";

test("Player attacking", () => {
  const playerOne = new Player("human");
  const playerComputer = new Player("computer");
  playerComputer.playerGameboard.placeShip(2, [2, 6]);

  playerOne.attack(playerComputer, [2, 6]);

  expect(playerComputer.playerGameboard.gameboard[2][6]).toBe("X");
  expect(
    playerComputer.playerGameboard.getShipAtCoordinates(2, 6).isSunk()
  ).toBeFalsy();
});

test("Computer attacking", () => {
  const playerOne = new Player("human");
  const playerComputer = new Player("computer");
  playerOne.playerGameboard.placeShip(2, [2, 6]);
  playerComputer.attack(playerOne, [2, 6]);

  expect(playerOne.playerGameboard.gameboard[2][6]).toBe("X");
});
