const board = document.getElementById("board");
const diceDiv = document.getElementById("dice");
const turnDiv = document.getElementById("turn");

const COLORS = ["red", "green", "yellow", "blue"];
let currentPlayer = 0;
let playerPositions = [0, 0, 0, 0]; // Starting positions

// Create the board (15x15 = 225 cells)
for (let i = 0; i < 225; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");

  // Define home zones
  if (i < 6 * 15 && i % 15 < 6) cell.classList.add("home-red");
  else if (i < 6 * 15 && i % 15 >= 9) cell.classList.add("home-green");
  else if (i >= 9 * 15 && i % 15 < 6) cell.classList.add("home-yellow");
  else if (i >= 9 * 15 && i % 15 >= 9) cell.classList.add("home-blue");

  board.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");

// Create one token per player
const tokens = COLORS.map(color => {
  const token = document.createElement("div");
  token.classList.add("token", color);
  cells[0].appendChild(token); // Start all at cell 0
  return token;
});

function rollDice() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceDiv.textContent = "Roll: " + roll;

  moveToken(currentPlayer, roll);

  // Change player
  currentPlayer = (currentPlayer + 1) % 4;
  turnDiv.textContent = `Player Turn: ${capitalize(COLORS[currentPlayer])} ${getEmoji(currentPlayer)}`;
}

function moveToken(playerIndex, roll) {
  let currentPos = playerPositions[playerIndex];
  cells[currentPos].innerHTML = ""; // Remove token from current cell

  currentPos += roll;
  if (currentPos >= cells.length) currentPos = cells.length - 1;

  cells[currentPos].appendChild(tokens[playerIndex]);
  playerPositions[playerIndex] = currentPos;
}

function getEmoji(index) {
  return ["🔴", "🟢", "🟡", "🔵"][index];
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
