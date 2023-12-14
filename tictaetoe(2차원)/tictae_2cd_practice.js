// 2차원 배열
// 행과 열을 각각 나눠서 2차원 배열

// html 영역 지정
const { body } = document;
const Table = document.createElement('table');
const Result = document.createElement('div');
const rows = [];

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
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === target) {
        rowIndex = ri;
        cellIndex = ci;
      }
    });
  });
  // 세 칸 다 채워졌을 때(무엇이든 검사할 때는 false로)
  let hasWinner = false;
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

const callback = (e) => {
  // e.stopPropagation(); 이벤트 버블링 현상을 막아주는 메서드
  if (e.target.textContent) {
    //칸에 글자가 있는가?
    console.log('빈칸이 아닙니다.');
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
    Result.textContent = `${turn}님이 승리`;
    Table.removeEventListener('click', callback); // 함수 안에서 자기자신 쓸 수 있음. 이벤트 버블링으로 각 td에 넣어주는 것이 아닌 table 전체에 넣어줌.

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
    Result.textContent = '무승부';
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

// 하단의 테이블 html 만드는 코드
// <table>
//   <tr>
//     <td></td>
//     <td></td>
//     <td></td>
//   </tr>
//   <tr>
//     <td></td>
//     <td></td>
//     <td></td>
//   </tr>
//   <tr>
//     <td></td>
//     <td></td>
//     <td></td>
//   </tr>
// </table>

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
  rows.push(cells);
  // table의 자식요소로 지정
  Table.append(Tr);
}
// body의 자식요소로 지정
Table.addEventListener('click', callback);
body.append(Table);
body.append(Result);
