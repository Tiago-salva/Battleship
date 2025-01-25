import Player from "./playerClass.js";
import renderBoard from "./domManager.js";

const gameTurnText = document.querySelector(".game-turn");
let winner = null;
let gameTurn = humanPlayer;

function checkWinner(currentPlayer, opponent) {
  if (opponent.playerGameboard.allShipsSunk() === true) {
    winner = currentPlayer.name;
    return true;
  }

  return false;
}

export default function handleHumanClick(cellDiv, opponent) {
  const coordinates = cellDiv.dataset.coordinates.split(",").map(Number);
  gameTurnText.textContent = gameTurn;
  humanPlayer.attack(opponent, coordinates);
  renderBoard(opponent);

  if (checkWinner(humanPlayer, opponent)) {
    console.log(`Ganaste: ${winner.name}`);
    return;
  }

  gameTurn = computerPlayer;
  setTimeout(() => {
    computerTurn();
  }, 1000);
}

function computerTurn() {
  gameTurnText.textContent = gameTurn;
  computerPlayer.attack(humanPlayer);
  renderBoard(humanPlayer);

  if (checkWinner(computerPlayer, humanPlayer)) {
    console.log(`You win: ${winner.name}`);
    return;
  }

  gameTurn = humanPlayer;
}

function battleShipGame() {
  const humanPlayer = new Player("Valentin", "human");
  const computerPlayer = new Player("Gustavo", "computer");

  humanPlayer.playerGameboard.placeShip(2, [2, 6]);
  computerPlayer.playerGameboard.placeShip(2, [5, 1], false);

  renderBoard(humanPlayer);
  renderBoard(computerPlayer);
}

battleShipGame();
