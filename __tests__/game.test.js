import battleShipGame from "../src/game";

test("Playing an automatic battleship game", () => {
  expect(battleShipGame()).toBe("Hay un ganador");
});
