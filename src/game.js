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
    const [row, col] = coordinates;
    if (humanPlayer.attack(opponent, coordinates) === false) {
      gameTurnText.textContent = "The attack it's not valid, try again";
      return;
    }

    // Si se ataco a un barco, el jugador vuelve a atacar
    humanPlayer.attack(opponent, coordinates);
    if (opponent.playerGameboard.gameboard[row][col] === "X") {
      gameTurnText.textContent = "You hit a ship! Attack again";
      renderBoard(opponent, handleHumanClick);
      console.log("hola");
      if (checkWinner(humanPlayer, opponent)) {
        console.log("hola1");
        gameTurnText.textContent = `You won: ${winner}!`;
        setTimeout(() => {
          resetGame();
        }, 2000);
        return;
      }
      return;
    }

    renderBoard(opponent, handleHumanClick);

    gameTurn = computerPlayer;
    gameTurnText.textContent = `The ${gameTurn.name} it's calcualting the attack`;
    const computerBoard = document.querySelector(".gameboard-computer");
    computerBoard.style.pointerEvents = "none";
    setTimeout(() => {
      computerTurn();
    }, 1500);
  }

  function computerTurn() {
    const computerBoard = document.querySelector(".gameboard-computer");
    let validAttack = computerPlayer.attack(humanPlayer);

    while (validAttack === false) {
      console.log("El ataque no es valido");
      validAttack = computerPlayer.attack(humanPlayer);
    }

    renderBoard(humanPlayer, handleHumanClick);

    if (checkWinner(computerPlayer, humanPlayer)) {
      gameTurnText.textContent = "Oh no! The computer won";
      return;
    }

    gameTurn = humanPlayer;
    gameTurnText.textContent = `It's your turn: ${gameTurn.name}`;
    computerBoard.style.pointerEvents = "auto";
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

  const humanPlayer = new Player("Player", "human");
  const computerPlayer = new Player("Computer", "computer");
  const gameTurnText = document.querySelector(".game-turn");
  let winner = null;
  let gameTurn = humanPlayer;
  gameTurnText.textContent = `It's your turn: ${gameTurn.name}`;

  humanPlayer.playerGameboard.placeShip(2, [5, 1]);
  humanPlayer.playerGameboard.placeShip(3, [3, 7], false);
  humanPlayer.playerGameboard.placeShip(4, [1, 8], false);
  humanPlayer.playerGameboard.placeShip(2, [7, 2]);
  // humanPlayer.playerGameboard.placeShip(2, [2, 6]);
  // computerPlayer.playerGameboard.placeShip(2, [5, 1], false);

  function placeRandomShip(length, isHorizontal = true) {
    let placed = false;

    while (!placed) {
      // Generar coordenadas aleatorias
      const row = Math.floor(
        Math.random() * computerPlayer.playerGameboard.gameboard.length
      );
      const col = Math.floor(
        Math.random() * computerPlayer.playerGameboard.gameboard[0].length
      );

      // Intentar colocar el barco
      placed = computerPlayer.playerGameboard.placeShip(
        length,
        [row, col],
        isHorizontal
      );
    }
  }

  for (let i = 0; i < 4; i++) {
    const randomLength = Math.floor(Math.random() * (4 - 2) + 2);
    placeRandomShip(randomLength);
  }

  console.log(computerPlayer.playerGameboard.gameboard);

  renderBoard(humanPlayer);
  renderBoard(computerPlayer, handleHumanClick);
}

battleShipGame();
