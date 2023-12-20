// 2차원 배열
// 행과 열을 각각 나눠서 2차원 배열

// html 영역 지정
const { body } = document;
const Table = document.createElement('table');
const Table5 = document.createElement('table');
const Result = document.createElement('div');
const restart = document.createElement('button');
const three = document.createElement('button');
const five = document.createElement('button');
const resultTxt = document.createElement('div');
restart.innerText = 'restart';
three.innerText = '3x3';
five.innerText = '5x5';
let rows = [];
let options = rows;
Result.append(restart, resultTxt, three, five);

// turn의 기본값 o으로 잡음.
let turn = 'O';

// [
//  [td, td, td],
//  [td, td, td],
//  [td, td, td],
// ]

// 내가 선택한 td 알아내는 방법.
// forEach로 이중반복문 돌려서 찾기
// target은 td중에 하나
// 하나씩 비교해보고 index(ri, ci)가 몇번째줄 몇번째 칸인지 알려줌
const checkWinner = (target) => {
  let rowIndex;
  let cellIndex;
  // 열의 숫자와 인덱스를 넘겨줌
  rows.forEach((row, ri) => {
    // 셀의 숫자와 인덱스를 넘겨줌
    row.forEach((cell, ci) => {
      // 만약 셀의 수와
      if (cell === target) {
        rowIndex = ri;
        cellIndex = ci;
      }
    });
  });
  // 세 칸 다 채워졌을 때(무엇이든 검사할 때는 false로)
  let hasWinner = false;

  // 3x3
  // 가로줄 검사
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

  console.log(rowIndex, cellIndex);
  return hasWinner;
};

const checkWinner5 = (target) => {
  let rowIndex;
  let cellIndex;
  // 열의 숫자와 인덱스를 넘겨줌
  rows.forEach((row, ri) => {
    // 셀의 숫자와 인덱스를 넘겨줌
    row.forEach((cell, ci) => {
      // 만약 셀의 수와
      if (cell === target) {
        rowIndex = ri;
        cellIndex = ci;
      }
    });
  });
  // 세 칸 다 채워졌을 때(무엇이든 검사할 때는 false로)
  let hasWinner = false;

  // 5x5
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

const callback = (e) => {
  // e.stopPropagation(); //이벤트 버블링 현상을 막아주는 메서드
  if (e.target.textContent) {
    //칸에 글자가 있는가?
    alert('빈칸이 아닙니다.');
    return; // else 안쓰고 return으로 해도 됨
    //table을 진짜 콜백 안에서 가져오고 싶다!
    // e.currentTarget; 진짜 이벤트를 붙이는 애한테 지정. target은 어디에 붙을지 모름.
  }
  //빈칸이면?
  console.log('빈칸입니다.');
  e.target.textContent = turn;

  // 승부 판단하기
  // checkWinner(e.target); //e.target == td태그
  if (checkWinner(e.target)) {
    resultTxt.innerText = `${turn}님이 승리`;
    Table.removeEventListener('click', callback); // 함수 안에서 자기자신 쓸 수 있음. 이벤트 버블링으로 각 td에 넣어주는 것이 아닌 table 전체에 넣어줌.
    return;
  }
  // else if (checkWinner5(e.target)) {
  //   resultTxt.innerText = `${turn}님이 승리`;
  //   Table5.removeEventListener('click', callback);
  //   return;
  // }

  // if (checkWinner5(e.target)) {
  //   resultTxt.innerText = `${turn}님이 승리`;
  //   Table5.removeEventListener('click', callback);
  //   return;
  // }
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
  // if (turn === 'O') {
  //   turn = 'X';
  // } else if (turn === 'X') {
  //   turn = 'O';
  // }
  // 삼항연산자로
};

const callback5 = (e) => {
  // 빈칸이 아니다.
  if (e.target.textContent) {
    alert('빈칸이 아닙니다.');
    return;
  }
  // 빈칸이다
  // 턴 돌리기
  e.target.textContent = turn;
  if (checkWinner(e.target)) {
    resultTxt.innerText = `${turn}님이 승리`;
    Table.removeEventListener('click', callback);
    return;
  }

  // 무승부
  let count = 0;
  // forEach로 행을 하나씩 뿌리고, 또 cell을 하나씩 뿌린다. 클릭 시마다 1씩 올라가게
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
  // if (turn === 'O') {
  //   turn = 'X';
  // } else if (turn === 'X') {
  //   turn = 'O';
  // }
  // 삼항연산자로
};

function resrtBtn() {
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
  Table.style.display = 'block';
  Table5.style.display = 'none';
  // i가 3보다 작고 같다면 반복
  for (let i = 1; i <= 3; i++) {
    const Tr = document.createElement('tr');
    const cells = [];
    // 빈배열 하나 더 추가하여
    for (let j = 1; j <= 3; j++) {
      // 반복될 때마다 td를 만들어 cell 배열에 넣어줘라
      // 태그 만들 때 변수로 빼놓는 게 편함
      const Td = document.createElement('td');
      cells.push(Td);
      // tr의 자식요소로 지정
      Tr.append(Td);
    }
    // row에 cell배열 추가
    rows.push(cells);
    // table의 자식요소로 지정
    Table.append(Tr);
  }
}

// 5x5
function fiveBtn() {
  Table.style.display = 'none';
  Table5.style.display = 'block';
  for (let i = 1; i <= 5; i++) {
    const Tr5 = document.createElement('tr');
    const cells = [];
    // 빈배열 하나 더 추가하여
    for (let j = 1; j <= 5; j++) {
      // 반복될 때마다 td를 만들어 cell 배열에 넣어줘라
      // 태그 만들 때 변수로 빼놓는 게 편함
      const Td5 = document.createElement('td');
      cells.push(Td5);
      // tr의 자식요소로 지정
      Tr5.append(Td5);
    }
    // row에 cell배열 추가
    rows.push(cells);
    // table의 자식요소로 지정
    Table5.append(Tr5);
  }
}

// body의 자식요소로 지정
Table.addEventListener('click', callback);
Table5.addEventListener('click', callback5);
restart.addEventListener('click', resrtBtn);
three.addEventListener('click', threeBtn);
five.addEventListener('click', fiveBtn);
body.append(Table, Table5);
body.append(Result);
