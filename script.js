let playerX = "X";
let playerO = "O";

let player = playerX;
let startingPlayer = playerX;

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gamecells;

let winningconds = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let gameover = false;
let restart;

let scoreX = 0;
let scoreO = 0;
let historyList;

window.onload = function () {
  gamecells = document.getElementsByClassName("gamecell");
  for (let cell of gamecells) {
    cell.addEventListener("click", placecell);
  }
  restart = document.getElementById("gamerestart");
  restart.addEventListener("click", restartgame);

  historyList = document.getElementById("gameHistory");
};

function placecell() {
  if (gameover) {
    return;
  }
  const index = parseInt(this.getAttribute("data-cell-index"));
  if (gameBoard[index] != "") {
    return;
  }
  this.innerText = player;
  gameBoard[index] = player;

  checkwinner();

  if (!gameover) {
    player = player == playerO ? playerX : playerO;
  }
}

function checkwinner() {
  for (let wincond of winningconds) {
    let a = gameBoard[wincond[0]];
    let b = gameBoard[wincond[1]];
    let c = gameBoard[wincond[2]];

    if (a == b && b == c && a != "") {
      for (let i = 0; i < gameBoard.length; i++) {
        if (wincond.includes(i)) {
          gamecells[i].classList.add("winning-game-cell");
        }
      }

      gameover = true;

      updateScoreAndHistory(a);
      return;
    }
  }

  if (!gameBoard.includes("") && !gameover) {
    gameover = true;
    updateScoreAndHistory("Draw");
  }
}

function updateScoreAndHistory(winner) {
  const li = document.createElement("li");

  if (winner === "Draw") {
    li.innerText = "Match result: Draw";
  } else {
    li.innerText = `Winner: Player ${winner}`;
    if (winner === "X") {
      scoreX++;
      document.getElementById("scoreX").innerText = scoreX;
    } else {
      scoreO++;
      document.getElementById("scoreO").innerText = scoreO;
    }
  }
  historyList.appendChild(li);
}

// RESTARTING THE GAME:
function restartgame() {
  gameover = false;
  gameBoard = ["", "", "", "", "", "", "", "", ""];

  startingPlayer = startingPlayer == playerX ? playerO : playerX;
  player = startingPlayer;

  for (let gamecell of gamecells) {
    gamecell.innerText = "";
    gamecell.classList.remove("winning-game-cell");
  }
}
