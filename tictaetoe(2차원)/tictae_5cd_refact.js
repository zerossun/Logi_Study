// 2차원 배열
// 중복되는 코드가 너무 많다. 중복되는 코드 리팩터링 원함.
// 릭패터링
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

// turn의 기본값 o으로 잡음.
let turn = 'O';

// [
//  [td, td, td],
//  [td, td, td],
//  [td, td, td],
// ]

// 엇 빼서 하면 안되는건가..
const comPare = (target) => {
  let rowIndex, cellIndex;
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === target) {
        rowIndex = ri;
        cellIndex = ci;
      }
    });
  });
  return { rowIndex, cellIndex };
};

const checkWinner = (target) => {
  console.log('checkWinner');
  const { rowIndex, cellIndex } = comPare(target);
  // 행 체크(rowIndex의 cell 순회)
  //rowFilled = 빈배열(rows)[rowindex]랄 순회하면서 모든 cell이 같은 텍스트로 채워졌는지 체크
  const rowFilled = rows[rowIndex].every((cell) => cell.textContent === turn);
  // 열 체크
  // columnFilled 빈배열(rows)을 순회하면서 모든 row[cellIndex] 같은 텍스트로 채워졌는지 체크
  const columnFilled = rows.every((row) => row[cellIndex].textContent === turn);
  // 대각선 체크
  // 로우 길이
  // lenth = 배열의 수
  const length = rows.length;
  // 우상향 대각선 체크
  // [i][lastIndex - i] => 0, 4 / 1, 3  / 2, 2 /  ...
  const positiveDiagonalChecks = [];
  // 마지막 인덱스
  const lastIndex = length - 1;
  for (let i = 0; i < length; i++) {
    // 배열을 순회하면서 대각선 인덱스(0,4 / 1,3.. )의 텍스트가 채워졌는지 체크
    positiveDiagonalChecks.push(rows[i][lastIndex - i].textContent === turn);
  }
  // positiveDiagonalFilled = 모든 대각선 인덱스가 같은 텍스트로 채워졌는지 체크
  const positiveDiagonalFilled = positiveDiagonalChecks.every((check) => check);
  // 우하향 대각선 체크
  const nagativeDiagonalChecks = [];
  for (let i = 0; i < length; i++) {
    // 배열을 순회하면서 대각선 인덱스(0,0 / 1,1.. )의 텍스트가 채워졌는지 체크
    nagativeDiagonalChecks.push(rows[i][i].textContent === turn);
  }
  // negativeDiagonalFilled = 모든 대각선 인덱스가 같은 텍스트로 채워졌는지 체크
  const negativeDiagonalFilled = nagativeDiagonalChecks.every((check) => check);
  return (
    rowFilled || // 행체크 값 또는
    columnFilled || // 얄체크 값 또는
    positiveDiagonalFilled || // 우상향 값 또는
    negativeDiagonalFilled // 우하향 값 중 반환
  );
};

const callback = (e) => {
  console.log('callback');
  if (e.target.textContent) {
    alert('빈칸이 아닙니다.');
    return;
  }

  e.target.textContent = turn;
  if (checkWinner(e.target)) {
    resultTxt.innerText = `${turn}님이 승리`;
    Table.removeEventListener('click', callback);
    Table5.removeEventListener('click', callback);
    return;
  }
  // 무승부
  // forEach로 행을 하나씩 뿌리고, 또 cell을 하나씩 뿌린다. 클릭 시마다 1씩 올라가게
  let count = 0;
  rows.forEach((row) => {
    row.forEach((cell) => {
      if (cell.textContent) {
        count += 1;
      }
    });
  });

  // 원방식 cout수를 직접 조정하여 승패를 갈랐음.
  // if (count === 9) {
  //   resultTxt.innerText = '무승부';
  //   return;
  // }

  const length = rows.length;
  const tiePoint = length * length;
  if (count === tiePoint) {
    resultTxt.innerText = '무승부';
    return;
  }
  // 승부확인
  turn = turn === 'O' ? 'X' : 'O';
};

function resrtBtn() {
  console.log('resrtBtn');
  rows.forEach((row) => {
    row.forEach((cell) => {
      cell.textContent = '';
    });
  });
  resultTxt.innerText = ``;
  Table.addEventListener('click', callback);
  Table5.addEventListener('click', callback);
}

// 3x3
function threeBtn() {
  console.log('threeBtn');
  Table.style.display = 'table';
  Table5.style.display = 'none';
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
  three.removeEventListener('click', threeBtn);
}

// 5x5
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
function fiveBtn() {
  console.log('fiveBtn');
  Table.style.display = 'none';
  Table5.style.display = 'table';

  five.removeEventListener('click', fiveBtn);
}

// body의 자식요소로 지정
Table.addEventListener('click', callback);
Table5.addEventListener('click', callback);
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
