import Player from "./playerClass.js";
import renderBoard from "./domManager.js";

function battleShipGame() {
  const lengths = [4, 3, 3, 2];
  let count = 0;
  let shipsPlaced = false;

  function handlePlaceShips(cell, player) {
    const coordinates = cell.dataset.coordinates.split(",").map(Number);

    if (!player.playerGameboard.placeShip(lengths[count], coordinates)) {
      console.log("Posicion no valida");
      return;
    }

    console.log(player.playerGameboard.gameboard);
    count++;
    placeShips(player, lengths[count]);

    if (count === 4) {
      console.log("Todos los barcos fueron ubicados");
      shipsPlaced = true;
      return;
    }
  }

  function placeShips(player, length) {
    renderBoard(player, handlePlaceShips);
    addHighlights(length);
  }

  function addHighlights(shipLength) {
    const board = document.querySelector(".gameboard-human");
    let isVertical = false;

    board.addEventListener("mouseleave", clearHighlights);

    board.querySelectorAll(".cell-human").forEach((cell) => {
      cell.addEventListener("mousemove", () => {
        clearHighlights();
        const boardSize = 10;
        const index = parseInt(cell.dataset.index);
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;

        let isValidPosition = isVertical
          ? row + shipLength <= boardSize
          : col + shipLength <= boardSize;

        if (isValidPosition) {
          highlightCells(index, shipLength, isVertical, boardSize);
        } else {
          board.children[index].classList.add("cell-invalid");
        }
      });
    });
  }

  function highlightCells(startIndex, length, vertical, size) {
    const board = document.querySelector(".gameboard-human");
    for (let i = 0; i < length; i++) {
      let index = vertical ? startIndex + i * size : startIndex + i;
      let cell = board.children[index];

      cell.classList.add("cell-highlight");
    }
  }

  function clearHighlights() {
    document
      .querySelectorAll(".cell-highlight, .cell-invalid")
      .forEach((cell) => {
        cell.classList.remove("cell-highlight", "cell-invalid");
      });
  }

  //

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
    if (
      opponent.playerGameboard.gameboard[row][col] === "X" ||
      opponent.playerGameboard.gameboard[row][col] === "#"
    ) {
      gameTurnText.textContent = "You hit a ship! Attack again";
      renderBoard(opponent, handleHumanClick);
      if (checkWinner(humanPlayer, opponent)) {
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

    renderBoard(humanPlayer);

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

  const humanPlayer = new Player("Player", "human");
  const computerPlayer = new Player("Computer", "computer");
  const gameTurnText = document.querySelector(".game-turn");
  let winner = null;
  let gameTurn = humanPlayer;
  gameTurnText.textContent = `Place your ships: ${gameTurn.name}!`;

  // Aca s eva a llamar la funcion para poner los barcos
  // humanPlayer.playerGameboard.placeShip(2, [5, 1]);
  // humanPlayer.playerGameboard.placeShip(3, [3, 7], false);
  // humanPlayer.playerGameboard.placeShip(4, [1, 8], false);
  // humanPlayer.playerGameboard.placeShip(2, [7, 2]);
  placeShips(humanPlayer, lengths[0]);

  if (shipsPlaced) {
    for (let i = 0; i < 4; i++) {
      const randomLength = Math.floor(Math.random() * (4 - 2) + 2);
      placeRandomShip(randomLength);
    }

    console.log(computerPlayer.playerGameboard.gameboard);

    renderBoard(humanPlayer);
    renderBoard(computerPlayer, handleHumanClick);
  }
}

battleShipGame();
