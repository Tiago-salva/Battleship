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
      console.log("El ataque no es valido, intenta de nuevo");
      return;
    }

    // Si se ataco a un barco, el jugador vuelve a atacar
    humanPlayer.attack(opponent, coordinates);
    if (opponent.playerGameboard.gameboard[row][col] === "X") {
      console.log("le diste a un barco");
      renderBoard(opponent, handleHumanClick);
      if (checkWinner(humanPlayer, opponent)) {
        console.log(`Ganaste ${winner}!`);
        setTimeout(() => {
          resetGame();
        }, 1000);
        return;
      }
      return;
    }

    renderBoard(opponent, handleHumanClick);

    gameTurn = computerPlayer;
    gameTurnText.textContent = `It's your turn: ${gameTurn.name}`;
    setTimeout(() => {
      computerTurn();
    }, 1500);
  }

  function computerTurn() {
    let validAttack = computerPlayer.attack(humanPlayer);

    while (validAttack === false) {
      console.log("El ataque no es valido");
      validAttack = computerPlayer.attack(humanPlayer);
    }

    renderBoard(humanPlayer, handleHumanClick);

    if (checkWinner(computerPlayer, humanPlayer)) {
      console.log(`You win: ${winner.name}`);
      return;
    }

    gameTurn = humanPlayer;
    gameTurnText.textContent = `The ${gameTurn.name} it's calcualting the attack`;
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

  const humanPlayer = new Player("Jugador", "human");
  const computerPlayer = new Player("Computadora", "computer");
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

  for (let i = 0; i < 5; i++) {
    const randomLength = Math.floor(Math.random() * (4 - 1) + 1);
    placeRandomShip(randomLength);
  }

  console.log(humanPlayer.playerGameboard.gameboard);

  renderBoard(humanPlayer);
  renderBoard(computerPlayer, handleHumanClick);
}

battleShipGame();
