import Player from "./playerClass";

export default function battleShipGame() {
  function randomCoordenates(opponent) {
    const randomRow = Math.floor(
      Math.random() * opponent.playerGameboard.gameboard.length
    );
    const randomCol = Math.floor(
      Math.random() * opponent.playerGameboard.gameboard[0].length
    );

    return [randomRow, randomCol];
  }

  function checkWinner(currentPlayer, opponent) {
    if (opponent.playerGameboard.allShipsSunk() === true) {
      winner = currentPlayer.name;
      return true;
    }

    return false;
  }

  const humanPlayer = new Player("Valentin", "human");
  const computerPlayer = new Player("Gustavo", "computer");
  let winner = null;
  let gameTurn = humanPlayer;

  humanPlayer.playerGameboard.placeShip(2, [2, 6]);
  computerPlayer.playerGameboard.placeShip(2, [5, 1], false);

  // Mas tarde agregar que cuando alguien le de a un barco, no cambie el turno
  while (winner === null) {
    if (gameTurn === humanPlayer) {
      const playerCoordenates = randomCoordenates(computerPlayer);
      humanPlayer.attack(computerPlayer, playerCoordenates);
      checkWinner(humanPlayer, computerPlayer);
      gameTurn = computerPlayer;
    } else {
      computerPlayer.attack(humanPlayer);
      checkWinner(computerPlayer, humanPlayer);
      gameTurn = humanPlayer;
    }
  }

  return {
    winner,
    humanPlayerBoard: humanPlayer.playerGameboard.gameboard,
    computerPlayerBoard: computerPlayer.playerGameboard.gameboard,
  };
}
