export default function renderBoard(player, handleClick = null) {
  // Depending of the type of the player, it will select a different board container
  const gameboardContainer =
    player.type == "computer"
      ? document.querySelector(".gameboard-computer")
      : document.querySelector(".gameboard-human");

  gameboardContainer.innerHTML = "";

  player.playerGameboard.gameboard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = "";

      if (player.type === "computer" && handleClick) {
        cellDiv.classList.add("cell-computer");
        cellDiv.addEventListener("click", () => handleClick(cellDiv, player));
      } else if (player.type === "human") {
        cellDiv.classList.add("cell-human");
        cellDiv.addEventListener("click", () => handleClick(cellDiv, player));
      }

      if (
        player.type === "human" &&
        player.playerGameboard.gameboard[rowIndex][colIndex] === 1
      ) {
        cellDiv.classList.add("cell-with-ship");
      }

      if (player.playerGameboard.gameboard[rowIndex][colIndex] === "O") {
        cellDiv.classList.add("cell-empty");
      }

      if (player.playerGameboard.gameboard[rowIndex][colIndex] === "X") {
        cellDiv.classList.add("cell-full");
      }

      if (player.playerGameboard.gameboard[rowIndex][colIndex] === "#") {
        cellDiv.classList.add("cell-sunk");
        cellDiv.textContent = "X";
      }

      cellDiv.dataset.index = rowIndex * 10 + colIndex;
      cellDiv.dataset.coordinates = `${rowIndex},${colIndex}`;
      gameboardContainer.appendChild(cellDiv);
    });
  });
}
