export default function renderBoard(player, handleClick) {
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
      // Solo es estetico, removerlo mas tarde
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

      cellDiv.dataset.coordinates = `${rowIndex},${colIndex}`;
      gameboardContainer.appendChild(cellDiv);
      if (player.type === "computer")
        cellDiv.addEventListener("click", () => handleClick(cellDiv, player));
    });
  });
}
