import Player from "./playerClass.js";
import renderBoard from "./domManager.js";

function battleShipGame() {
  const lengths = [4, 3, 3, 2];
  let count = 0;
  let isHorizontal = true;

  const rotateShipBtn = document.querySelector(".rotate-ship-btn");
  rotateShipBtn.addEventListener("click", () => {
    isHorizontal = !isHorizontal;
  });

  function handlePlaceShips(cell, player) {
    const coordinates = cell.dataset.coordinates.split(",").map(Number);

    if (
      !player.playerGameboard.placeShip(
        lengths[count],
        coordinates,
        isHorizontal
      )
    ) {
      console.log("Posicion no valida");
      return false;
    }
    console.log(player.playerGameboard.gameboard);
    count++;
    placeShips(player, lengths[count]);

    if (count === 4) {
      console.log("Todos los barcos fueron ubicados");
      console.log(player.playerGameboard.gameboard);
      startGame();
    }
  }

  function placeShips(player, length) {
    renderBoard(player, handlePlaceShips);
    addHighlights(length);

    if (player.playerGameboard.ships.size === 12) return;
  }

  function addHighlights(shipLength) {
    const board = document.querySelector(".gameboard-human");

    board.addEventListener("mouseleave", clearHighlights);

    board.querySelectorAll(".cell-human").forEach((cell) => {
      cell.addEventListener("mousemove", () => {
        clearHighlights();
        const boardSize = 10;
        const index = parseInt(cell.dataset.index);
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;

        let isValidPosition = isHorizontal
          ? col + shipLength <= boardSize
          : row + shipLength <= boardSize;

        if (isValidPosition) {
          highlightCells(index, shipLength, isHorizontal, boardSize);
        } else {
          board.children[index].classList.add("cell-invalid");
        }
      });
    });
  }

  function highlightCells(startIndex, length, vertical, size) {
    const board = document.querySelector(".gameboard-human");
    for (let i = 0; i < length; i++) {
      let index = vertical ? startIndex + i : startIndex + i * size;
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
      gameTurnText.textContent =
        opponent.playerGameboard.gameboard[row][col] === "#"
          ? "You sunk a ship, keep attacking!"
          : "You hit a ship! Attack again";

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
    const randomRow = Math.floor(
      Math.random() * humanPlayer.playerGameboard.gameboard.length
    );
    const randomCol = Math.floor(
      Math.random() * humanPlayer.playerGameboard.gameboard[0].length
    );

    if (humanPlayer.playerGameboard.gameboard[randomRow][randomCol] === "X") {
      console.log("Ya se habia atacado ese barco");
      return computerTurn();
    }

    let validAttack = computerPlayer.attack(humanPlayer, [
      randomRow,
      randomCol,
    ]);

    if (
      humanPlayer.playerGameboard.gameboard[randomRow][randomCol] === "X" ||
      humanPlayer.playerGameboard.gameboard[randomRow][randomCol] === "#"
    ) {
      gameTurnText.textContent =
        humanPlayer.playerGameboard.gameboard[randomRow][randomCol] === "#"
          ? "The computer sunk one of your ships, he's attacking!"
          : "The computer hit your ship! He's attacking again";

      renderBoard(humanPlayer);
      setTimeout(() => {
        computerTurn();
      }, 1500);
    } else {
      while (validAttack === false) {
        console.log("El ataque no es valido");
        const randomRow = Math.floor(
          Math.random() * humanPlayer.playerGameboard.gameboard.length
        );
        const randomCol = Math.floor(
          Math.random() * humanPlayer.playerGameboard.gameboard[0].length
        );
        validAttack = computerPlayer.attack(humanPlayer, [
          randomRow,
          randomCol,
        ]);
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

  function placeRandomShip(length) {
    let placed = false;

    while (!placed) {
      // Generar coordenadas aleatorias
      const row = Math.floor(
        Math.random() * computerPlayer.playerGameboard.gameboard.length
      );
      const col = Math.floor(
        Math.random() * computerPlayer.playerGameboard.gameboard[0].length
      );

      const isHorizontal = Math.random() < 0.5;

      // Intentar colocar el barco
      placed = computerPlayer.playerGameboard.placeShip(
        length,
        [row, col],
        isHorizontal
      );
    }
  }

  function startGame() {
    const rotateShipBtn = document
      .querySelector(".rotate-ship-btn")
      .classList.add("btn-disabled");

    const gameboardHuman = document.querySelector(".gameboard-human");
    gameboardHuman.style.pointerEvents = "none";

    // Colocar los barcos del oponente
    for (let i = 0; i < lengths.length; i++) {
      placeRandomShip(lengths[i]);
    }

    console.log(computerPlayer.playerGameboard.gameboard);

    // Renderizar los tableros para comenzar el juego
    renderBoard(computerPlayer, handleHumanClick);
    renderBoard(humanPlayer);
  }

  const humanPlayer = new Player("Player", "human");
  const computerPlayer = new Player("Computer", "computer");
  const gameTurnText = document.querySelector(".game-turn");
  let winner = null;
  let gameTurn = humanPlayer;
  gameTurnText.textContent = `Place your ships: ${gameTurn.name}!`;

  placeShips(humanPlayer, lengths[0]);
  renderBoard(computerPlayer);
}

battleShipGame();
