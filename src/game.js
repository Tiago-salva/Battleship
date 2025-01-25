import Player from "./playerClass.js";
import renderBoard from "./domManager.js";

function battleShipGame() {
  function checkWinner(currentPlayer, opponent) {
    if (opponent.playerGameboard.allShipsSunk() === true) {
      winner = currentPlayer.name;
      return true;
    }

    return false;
  }

  function handleHumanClick(cellDiv, opponent) {
    const coordinates = cellDiv.dataset.coordinates.split(",").map(Number);
    humanPlayer.attack(opponent, coordinates);
    renderBoard(opponent, handleHumanClick);

    if (checkWinner(humanPlayer, opponent)) {
      console.log(`Ganaste ${winner}!`);
      setTimeout(() => {
        resetGame();
      }, 1000);
      return;
    }

    gameTurn = computerPlayer;
    gameTurnText.textContent = gameTurn.name;
    setTimeout(() => {
      computerTurn();
    }, 1000);
  }

  function computerTurn() {
    computerPlayer.attack(humanPlayer);
    renderBoard(humanPlayer, handleHumanClick);

    if (checkWinner(computerPlayer, humanPlayer)) {
      console.log(`You win: ${winner.name}`);
      return;
    }

    gameTurn = humanPlayer;
    gameTurnText.textContent = gameTurn.name;
  }

  function resetGame() {
    humanPlayer.playerGameboard.gameboard = Array(10)
      .fill()
      .map(() => Array(10).fill(0));
    computerPlayer.playerGameboard.gameboard = Array(10)
      .fill()
      .map(() => Array(10).fill(0));
    battleShipGame();
  }

  const humanPlayer = new Player("Valentin", "human");
  const computerPlayer = new Player("Gustavo", "computer");
  const gameTurnText = document.querySelector(".game-turn");
  let winner = null;
  let gameTurn = humanPlayer;
  gameTurnText.textContent = gameTurn.name;

  humanPlayer.playerGameboard.placeShip(2, [2, 6]);
  computerPlayer.playerGameboard.placeShip(2, [5, 1], false);

  renderBoard(humanPlayer, handleHumanClick);
  renderBoard(computerPlayer, handleHumanClick);
}

battleShipGame();
