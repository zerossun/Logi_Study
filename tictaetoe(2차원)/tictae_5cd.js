// 2차원 배열
// 행과 열을 각각 나눠서 2차원 배열
// 5x5 게임 기능 추가
// 중복되는 코드가 너무 많다. 중복되는 코드 리팩터링 원함.
// html 영역 지정
const { body } = document;
const container = document.createElement('div');
const start = document.createElement('div');
const startTxt = document.createElement('div');
const Table = document.createElement('table');
const Table5 = document.createElement('table');
const Result = document.createElement('div');
const restart = document.createElement('button');
const three = document.createElement('button');
const five = document.createElement('button');
const resultTxt = document.createElement('div');
let rows = [];
let options = rows;

// turn의 기본값 o으로 잡음.
let turn = 'O';

// [
//  [td, td, td],
//  [td, td, td],
//  [td, td, td],
// ]

// 엇 빼서 하면 안되는건가..
const comPare = (target) => {
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === target) {
        rowIndex = ri; // 하나하나 따로 줘야 하는건가 음 그러면 코드가 더 정신없어 질 거 같은디...
        cellIndex = ci;
      }
    });
  });
};

const checkWinner = (target) => {
  let rowIndex;
  let cellIndex;
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === target) {
        rowIndex = ri;
        cellIndex = ci;
      }
    });
  });
  comPare(target);
  let hasWinner = false;

  // 3x3
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }

  return hasWinner;
};

// 5x5
const checkWinner5 = (target) => {
  let rowIndex;
  let cellIndex;
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === target) {
        rowIndex = ri;
        cellIndex = ci;
      }
    });
  });
  comPare(target);
  let hasWinner = false;

  // 가로줄 검사
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn &&
    rows[rowIndex][3].textContent === turn &&
    rows[rowIndex][4].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn &&
    rows[3][cellIndex].textContent === turn &&
    rows[4][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][4].textContent === turn &&
    rows[1][3].textContent === turn &&
    rows[2][2].textContent === turn &&
    rows[3][1].textContent === turn &&
    rows[4][0].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn &&
    rows[3][3].textContent === turn &&
    rows[4][4].textContent === turn
  ) {
    hasWinner = true;
  }

  console.log(rowIndex, cellIndex);
  return hasWinner;
};

// 3x3
const callback = (e) => {
  if (e.target.textContent) {
    alert('빈칸이 아닙니다.');
    return;
  }
  console.log('빈칸입니다.');
  e.target.textContent = turn;

  if (checkWinner(e.target)) {
    resultTxt.innerText = `${turn}님이 승리`;
    Table.removeEventListener('click', callback);
    return;
  }

  // 무승부
  let count = 0;
  rows.forEach((row) => {
    row.forEach((cell) => {
      if (cell.textContent) {
        count += 1;
      }
    });
  });
  if (count === 9) {
    resultTxt.innerText = '무승부';
    return;
  }
  // 승부확인
  turn = turn === 'O' ? 'X' : 'O';
};

// 5x5
const callback5 = (e) => {
  if (e.target.textContent) {
    alert('빈칸이 아닙니다.');
    return;
  }
  console.log('빈칸입니다.');
  e.target.textContent = turn;

  if (checkWinner5(e.target)) {
    resultTxt.innerText = `${turn}님이 승리`;
    Table5.removeEventListener('click', callback5);
    return;
  }
  // 무승부
  let count = 0;
  rows.forEach((row) => {
    row.forEach((cell) => {
      if (cell.textContent) {
        count += 1;
      }
    });
  });
  if (count === 25) {
    resultTxt.innerText = '무승부';
    return;
  }

  // 승부확인
  turn = turn === 'O' ? 'X' : 'O';
};

function resrtBtn() {
  rows.forEach((row) => {
    row.forEach((cell) => {
      cell.textContent = '';
    });
  });
  resultTxt.innerText = ``;
  Table.addEventListener('click', callback);
  Table5.addEventListener('click', callback5);
}

for (let i = 1; i <= 3; i++) {
  const Tr = document.createElement('tr');
  const cells = [];
  for (let j = 1; j <= 3; j++) {
    const Td = document.createElement('td');
    cells.push(Td);
    Tr.append(Td);
  }
  rows.push(cells);
  Table.append(Tr);
}
// 3x3
function threeBtn() {
  Table.style.display = 'table';
  Table5.style.display = 'none';
  resrtBtn();

  three.removeEventListener('click', threeBtn);
}

// 5x5
function fiveBtn() {
  Table.style.display = 'none';
  Table5.style.display = 'table';
  resrtBtn();
  for (let i = 1; i <= 5; i++) {
    const Tr5 = document.createElement('tr');
    const cells = [];
    for (let j = 1; j <= 5; j++) {
      const Td5 = document.createElement('td');
      cells.push(Td5);
      Tr5.append(Td5);
    }
    rows.push(cells);
    Table5.append(Tr5);
  }
  five.removeEventListener('click', fiveBtn);
}

// body의 자식요소로 지정
Table.addEventListener('click', callback);
Table5.addEventListener('click', callback5);
restart.addEventListener('click', resrtBtn);
three.addEventListener('click', threeBtn);
five.addEventListener('click', fiveBtn);

start.classList.add('start');
container.classList.add('container');
restart.innerText = 'restart';
three.innerText = '3x3';
five.innerText = '5x5';
startTxt.innerText = 'Tic Tae Toe';
body.append(container);
container.append(start, Table, Table5, Result);
start.append(startTxt, three, five);
Result.append(resultTxt, restart);
