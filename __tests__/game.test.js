import battleShipGame from "../src/game";

test("Playing an automatic battleship game", () => {
  const resultOfTheGame = battleShipGame();

  expect(resultOfTheGame.result.winnerName).toBe("Valentin");
});
