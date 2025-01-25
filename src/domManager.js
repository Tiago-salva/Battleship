export default function renderBoard(player, handleClick) {
  // Depending of the type of the player, it will select a different board container
  const gameboardContainer =
    player.type == "computer"
      ? document.querySelector(".gameboard-computer-container")
      : document.querySelector(".gameboard-human-container");

  gameboardContainer.innerHTML = "";

  player.playerGameboard.gameboard.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell;
      // Solo es estetico, removerlo mas tarde

      if (cellDiv.textContent === "O") {
        cellDiv.classList.add("cell-empty");
      }
      if (cellDiv.textContent === "X") {
        cellDiv.classList.add("cell-full");
      }

      cellDiv.dataset.coordinates = `${rowIndex},${colIndex}`;
      gameboardContainer.appendChild(cellDiv);
      if (player.type === "computer")
        cellDiv.addEventListener("click", () => handleClick(cellDiv, player));
    });
  });
}
