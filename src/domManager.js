import handleHumanClick from "./game.js";

export default function renderBoard(player) {
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
      cellDiv.dataset.coordinates = `${rowIndex},${colIndex}`;
      cellDiv.textContent = cell;
      gameboardContainer.appendChild(cellDiv);
      if (player.type === "computer")
        cellDiv.addEventListener("click", () =>
          handleHumanClick(cellDiv, player)
        );
    });
  });
}
