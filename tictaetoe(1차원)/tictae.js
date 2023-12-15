const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');

const winConditions = [
  // 첫번째 행부터 시작
  // 가로
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // 세로
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // 대각선
  [0, 4, 8],
  [2, 4, 6],
];

// let options = ['', '', '', '', '', '', '', '', ''];

const initOptions = Array(8).fill('');
let options = initOptions;
let currentPlayer = 'X';
let running = false;

initialzeGame();
function initialzeGame() {
  cells.forEach((cell) => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}
function cellClicked() {
  const cellIndex = this.getAttribute('cellIndex');
  if (options[cellIndex] != '' || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA == '' || cellB == '' || cellC == '') {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer}wins!`;
    running = false;
  } else if (!options.includes('')) {
    statusText.textContent = `Draw!`;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = 'X';
  let options = initOptions;
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ''));
  running = true;
}
