// 1차원 배열

// const cells = document.querySelectorAll('.cell');
// const statusText = document.querySelector('#statusText');
// const restartBtn = document.querySelector('#restartBtn');
// // 모든 바람 조건의 상수가 필요함
// // 조건이 2차원 배열일 경우 const 바람 조건
// // 세개의 셀이 모두 동일한 문자를 갖는 경우, 이를 확인해야 함
// // 하지만 어떤 셀을 확인해야 할지 알아야 함

// ///// * 필요한 변수들 *
// // 1. html 인덱스와 연결할 변수 생성
// // 2. 자리를 표시할 빈배열 생성
// // 3. 현재 플레이어 x로 설정
// // 4. let running = false; <- 게임이 실행중인지 확인 위한 변수 생성
// const winConditions = [
//   // 첫번째 행부터 시작
//   // 가로
//   [0, 1, 2], // <div cellIndex="0" class="cell"></div> 이거를 말하는 듯
//   [3, 4, 5],
//   [6, 7, 8],
//   // 세로
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   // 대각선
//   [0, 4, 8],
//   [2, 4, 6],
// ];
// // 자리 표시자 배열이 필요함. 각각의 빈문자 배열이 필요함.
// let options = ['', '', '', '', '', '', '', '', ''];
// // 현재 플레이어를 추적해야 함. 현재 플레이어를 x와 같이 놔둠.
// let currentPlayer = 'X';
// // 그런 다음 게임이 실행 중인지 추적하기 위해 변수가 필요함.
// // 게임을 초기화할 대 이를 true로 전환
// let running = false;
// ///// * 필요한 변수들 *

// // 이 함수를 초기화하여 모든 것을 처리함. 이거 없으면 암것도 안됨!!
// initialzeGame();

// // 전체 기능 정의한 함수
// // 1. 각각의 셀 클릭할때마다 cellClicked함수 돌아가게
// // 2. restartBtn클릭할 때 첫화면으로
// // 3. statusText은 현재 플레이어에 맞게 지정
// // 4, 게임 진행유무
// function initialzeGame() {
//   // 각각의 셀 클릭할때마다 cellClicked함수 돌아가게
//   cells.forEach((cell) => cell.addEventListener('click', cellClicked));
//   restartBtn.addEventListener('click', restartGame);
//   statusText.textContent = `${currentPlayer}'s turn`;
//   // true로 설정해야 xxx중 하나를 클릭할 수 있음
//   running = true;
// }

// // 셀 클릭
// // 1. html 인덱스를 변수 설정
// // 2. 옵션의 인덱스 번호가 비워져있는지(칸에 아무것도 없는지)/ 게임이 진행중이 아니라면 반환해줘라
// // 3. 아니라면은 셀을 클릭했을 때 업데이트가 되게 해줘(cellindex에 업데이트 해줘)
// // 4. 승자 계산하려면 체크할 때마다 계산도 실시간으로 되야겠지?
// function cellClicked() {
//   // cellIndex의 속성을 얻음( 클릭하는 모든 셀을 참조하는 변수 생성)
//   const cellIndex = this.getAttribute('cellIndex');
//   // options내의 index번호가 비어있거나 게임중이 아니라면
//   if (options[cellIndex] != '' || !running) {
//     // 인덱스 번호가 있는지 확인하고 싶은 경우 옵션 내의 인덱스 번호가 비어있지 않은지 여부(긍까 칸에 아무것도 없냐고 )
//     // 아무것도 하지 않고 반환
//     return;
//   }
//   // 그렇지 않으면 셀함수를 호출. 이를 인수로 전달, 승자 확인 함수 전달
//   updateCell(this, cellIndex);
//   // 일시적으로 업데이트 한 후 이 함수 호출
//   // changePlayer();
//   checkWinner();
// }
// // 업데이트 셀 :
// // 1. 자리가 x or o 인지를 인덱스에 기록해 줘
// // 2. 칸에 x or o를 표시해 줘
// function updateCell(cell, index) {
//   // options을 가져와 index매개변수의 인덱스에서 속편을 현재 플레이어로 설정하므로 자리 표시자를 업데이트 한 다음,
//   options[index] = currentPlayer; // <- 자리가 x or o 인지를 인덱스에 기록해줌(없으면 누가 이긴지 계산 안 됨)
//   // 원래 텍스트 콘텐츠를 클릭한 셀이 현재 플레이어와 같으면 이러한 셀 중 하나의 텍스트 콘텐츠를 변경
//   cell.textContent = currentPlayer; // <- 칸에 x or o를 표시해 줌
// }

// // 플레이어 변경
// // 1. currentPlayer가 x이면 o로 변경해주고 아니면 x로 바꿔줘라.
// // 2. 바꿨으면 statusText를 `${currentPlayer}'s turn`로 써줘라
// function changePlayer() {
//   // 다음 플레이어를 현재 항목으로 변경
//   // 현재 플레이어 속편을 설정하고 삼항 연산자를 사용
//   // 조건 : 현재 플레이어가 X와 같으면 현재 플레이어를 O로 할당하고 그렇지 않으면 X로 할당해라
//   currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
//   statusText.textContent = `${currentPlayer}'s turn`;
// }

// // 누가 위너인지 체크

// // 1. 이기는 편 변수 지정(if문을 써서 게임 끝낼지 안 끝낼지 정해야 하는데 그걸 얘의 값으로 지정함)
// // 2. for문으로 승자가 있는지 없는지 확인해야 됨.
// // 2-1. winConditions 배열 각각의 변수로 지정해서,
// // 2-2. 모든 변수가 비어있다면 게임을 계속 진행하고,
// // 2-3. 변수의 값 2개가 같다면 루프를 벗어나고 이기는 편이라고 지정해라.
// // 3. 만약 이겼다면 statusText 텍스트를 `${currentPlayer}wins!`해주고 게임 멈춰줘.
// // 3-1. 하지만 만약 이기는 사람도 없고 options 값에 공백이 없다면 statusText 텍스트를 `Draw`해주고 게임 멈춰줘.
// // 3-2. 그것도 아니라면 플레이러를 변경해 줘.
// function checkWinner() {
//   // 누군가 이기면 속편을 false로 설정. 이것을 true로 바꾼다
//   let roundWon = false; // true로도 변경해도 됨. 다만 if문에서 roundWon != true로 같이 변경해야됨.

//   // for문을 이용하여 배열 내의 모든 승리 조건 반복
//   for (let i = 0; i < winConditions.length; i++) {
//     // 승리 조건 내의 각 내부 배열을 반복하지만 이러한 각 배열을 임시 변수 내에 저장
//     const condition = winConditions[i];
//     const cellA = options[condition[0]];
//     const cellB = options[condition[1]];
//     const cellC = options[condition[2]];

//     if (cellA == '' || cellB == '' || cellC == '') {
//       continue;
//       // 각 칸이 빈공간과 같다면 반복해줘라
//     }
//     // 승자가 있다는 의미
//     if (cellA == cellB && cellB == cellC) {
//       roundWon = true;
//       // 더 이상 이 루프를 계속할 필요가 없기에 벗어나기(벗어나려면 true 해야됨 하 이거였네)
//       break;
//     }
//   }
//   if (roundWon) {
//     // roundWon = true일 시, roundWon != true 변경해야됨(roundWon = false로 하면 결과는 안나오고 반복됨)
//     statusText.textContent = `${currentPlayer}wins!`;
//     // running = false;있어야 게임이 끝나고 칸 클릭했을 때 표시가 생기지 않음.
//     // (주석 처리하면 x가 계속 나옴, true로 변경하면 계속 찍힘. false가 게임 끝남을 알고 막아주는 기능인듯.)
//     running = false;
//   }
//   // 남은 공백이 없으면 무승부
//   else if (!options.includes('')) {
//     statusText.textContent = `Draw!`;
//     // running = false;없어도 크게 영향을 끼치지 않음
//     running = false;
//   } else {
//     changePlayer();
//   }
//   // 옵션을 선택한 다음 포함 방법을 사용하여 공백이 있는지 확인.
//   // 우리 배열에는 공백이 포함되어 있으면 옵션에 공백이 포함되지 않은 경우 논리 연산자가 없다.
//   // 이것이 사실이면 상태 텍스트를 무승부
// }

// // 리셋게임 버튼
// // 1. 현재 플레이러르 x라고 설정해 줘
// // 2. options 값을 다 비운 걸로 변수 지정해 줘
// // 3. statusText 텍스트를 `${currentPlayer}'s turn`해주고
// // 4. cell 값을 다 지워줘라
// function restartGame() {
//   currentPlayer = 'X';
//   options = ['', '', '', '', '', '', '', '', ''];
//   statusText.textContent = `${currentPlayer}'s turn`;
//   cells.forEach((cell) => (cell.textContent = ''));
//   // running = false;없어도 크게 영향을 끼치지 않음
//   // running = true;
// }

// ====================================================

// 이게 왜 되는것인가 이제 하나하나 씹뜯맛즐 할 시간

// 작성 코드 설명 리스트

///// * 필요한 변수들 *
// 1. html 인덱스와 연결할 변수 생성
// 2. 자리를 표시할 빈배열 생성
// 3. 현재 플레이어 x로 설정
// 4. let running = false; <- 게임이 실행중인지 확인 위한 변수 생성
///// * 필요한 변수들 *

///// * 기능을 위해 만들어야 하는 함수 *

// 1] 전체 기능 정의한 함수
// 1. 각각의 셀 클릭할때마다 cellClicked함수 돌아가게
// 2. restartBtn클릭할 때 첫화면으로
// 3. statusText은 현재 플레이어에 맞게 지정
// 4, 게임 진행유무

// 2] 셀 클릭
// 1. html 인덱스를 변수 설정
// 2. 옵션의 인덱스 번호가 비워져있는지(칸에 아무것도 없는지)/ 게임이 진행중이 아니라면 반환해줘라
// 3. 아니라면은 셀을 클릭했을 때 업데이트가 되게 해줘(cellindex에 업데이트 해줘)
// 4. 승자 계산하려면 체크할 때마다 계산도 실시간으로 되야겠지?

// 3] 업데이트 셀
// 1. 자리가 x or o 인지를 인덱스에 기록해 줘
// 2. 칸에 x or o를 표시해 줘

// 4] 플레이어 변경
// 1. currentPlayer가 x이면 o로 변경해주고 아니면 x로 바꿔줘라.
// 2. 바꿨으면 statusText를 `${currentPlayer}'s turn`로 써줘라

// 5] 누가 위너인지 체크
// 1. 이기는 편 변수 지정(if문을 써서 게임 끝낼지 안 끝낼지 정해야 하는데 그걸 얘의 값으로 지정함)
// 2. for문으로 승자가 있는지 없는지 확인해야 됨.
// 2-1. winConditions 배열 각각의 변수로 지정해서,
// 2-2. 모든 변수가 비어있다면 게임을 계속 진행하고,
// 2-3. 변수의 값 2개가 같다면 루프를 벗어나고 이기는 편이라고 지정해라.
// 3. 만약 이겼다면 statusText 텍스트를 `${currentPlayer}wins!`해주고 게임 멈춰줘.
// 3-1. 하지만 만약 이기는 사람도 없고 options 값에 공백이 없다면 statusText 텍스트를 `Draw`해주고 게임 멈춰줘.
// 3-2. 그것도 아니라면 플레이러를 변경해 줘.

// 6] 리셋게임 버튼
// 1. 현재 플레이러르 x라고 설정해 줘
// 2. options 값을 다 비운 걸로 변수 지정해 줘
// 3. statusText 텍스트를 `${currentPlayer}'s turn`해주고
// 4. cell 값을 다 지워줘라

// ====================================================

// const cells = document.querySelectorAll('.cell');
// const statusText = document.querySelector('#statusText');
// const restartBtn = document.querySelector('#restartBtn');

// const winConditions = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// let options = ['', '', '', '', '', '', '', '', ''];
// let nowPlayer = 'X';
// let running = false;

// allFun();
// // 전체 기능 정의
// // 1. 각각의 셀 클릭할때마다 cellClicked함수 돌아가게
// // 2. restartBtn클릭할 때 첫화면으로
// // 3. statusText은 현재 플레이어에 맞게 지정
// // 4, 게임 진행유무
// function allFun() {
//   cells.forEach((cel) => cel.addEventListener('click', cellClicked));
//   restartBtn.addEventListener('click', restartGame);
//   statusText.textContent = `${nowPlayer}'s turn`;
//   running = true;
// }

// // function initialzeGame() {
// //   // 각각의 셀 클릭할때마다 cellClicked함수 돌아가게
// //   cells.forEach((cell) => cell.addEventListener('click', cellClicked));
// //   restartBtn.addEventListener('click', restartGame);
// //   statusText.textContent = `${currentPlayer}'s turn`;
// //   // true로 설정해야 xxx중 하나를 클릭할 수 있음
// //   running = true;
// // }

// // 셀 클릭
// // 1. html 인덱스를 변수 설정
// // 2. 옵션의 인덱스 번호가 비워져있는지(칸에 아무것도 없는지)/ 게임이 진행중이 아니라면 반환해줘라
// // 3. 아니라면은 셀을 클릭했을 때 업데이트가 되게 해줘(cellindex에 업데이트 해줘)
// // 4. 승자 계산하려면 체크할 때마다 계산도 실시간으로 되야겠지?
// function cellClicked() {
//   const cellIndex = this.getAttribute('cellIndex');
//   if ((options[cellIndex] = '' || !running)) {
//     return;
//   }
//   updateCell(this, cellIndex);
//   whowinner();
// }
// // function cellClicked() {
// //   const cellIndex = this.getAttribute('cellIndex');

// //   if (options[cellIndex] != '' || !running) {
// //     return;
// //   }

// //   updateCell(this, cellIndex);

// //   checkWinner();
// // }
// // 3] 업데이트 셀
// // 1. 자리가 x or o 인지를 인덱스에 기록해 줘
// // 2. 칸에 x or o를 표시해 줘
// // 업데이트
// function updateCell(cell, index) {
//   options[index] = nowPlayer;
//   cell.textContent = nowPlayer;
// }

// // function updateCell(cell, index) {
// //   options[index] = currentPlayer; // <- 자리가 x or o 인지를 인덱스에 기록해줌(없으면 누가 이긴지 계산 안 됨)
// //   cell.textContent = currentPlayer; // <- 칸에 x or o를 표시해 줌
// // }

// // 플레이어 변경
// // 1. currentPlayer가 x이면 o로 변경해주고 아니면 x로 바꿔줘라.
// // 2. 바꿨으면 statusText를 `${currentPlayer}'s turn`로 써줘라
// function changePlayer() {
//   nowPlayer = nowPlayer == 'X' ? 'O' : 'X';
//   statusText.textContent = `${nowPlayer}'s turn`;
// }

// // function changePlayer() {
// //   currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
// //   statusText.textContent = `${currentPlayer}'s turn`;
// // }

// function whowinner() {
//   let winner = false;

//   for (i = 0; i < winConditions.length; i++) {
//     const cellAll = winConditions[i];
//     const cellA = options[cellAll[0]];
//     const cellB = options[cellAll[1]];
//     const cellC = options[cellAll[2]];

//     if (cellA == '' || cellB == '' || cellC == '') {
//       continue;
//     }
//     if (cellA == cellB && cellB == cellC) {
//       winner = false;
//       break;
//     }
//   }
//   if (winner) {
//     statusText.textContent = `${nowPlayer}wins!`;
//     running = false;
//   } else if (!options.includes('')) {
//     statusText.textContent = `Draw`;
//     running = false;
//   } else {
//     changePlayer();
//   }
// }

// // function checkWinner() {
// //   let roundWon = false; // true로도 변경해도 됨. 다만 if문에서 roundWon != true로 같이 변경해야됨.

// //   for (let i = 0; i < winConditions.length; i++) {
// //     const condition = winConditions[i];
// //     const cellA = options[condition[0]];
// //     const cellB = options[condition[1]];
// //     const cellC = options[condition[2]];
// //     if (cellA == '' || cellB == '' || cellC == '') {
// //       continue;
// //     }
// //     if (cellA == cellB && cellB == cellC) {
// //       roundWon = false;
// //       break;
// //     }
// //   }
// //   if (roundWon) {
// //     statusText.textContent = `${currentPlayer}wins!`;
// //     running = false;
// //   } else if (!options.includes('')) {
// //     statusText.textContent = `Draw!`;
// //     // running = false;
// //     running = false;
// //   } else {
// //     changePlayer();
// //   }
// // }

// // function restartGame() {
// //   nowPlayer = 'X';
// //   options = ['', '', '', '', '', '', '', '', ''];
// //   statusText.textContent = `${nowPlayer}'s turn`;
// //   cells.forEach((cel) => (cel.textContent = ''));
// // }
// function restartGame() {
//   currentPlayer = 'X';
//   options = ['', '', '', '', '', '', '', '', ''];
//   statusText.textContent = `${nowPlayer}'s turn`;
//   cells.forEach((cell) => (cell.textContent = ''));
//   // running = false;없어도 크게 영향을 끼치지 않음
//   // running = true;
// }

// ==========================================================
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');

const winConditions = [
  // 첫번째 행부터 시작
  // 가로
  [0, 1, 2], // <div cellIndex="0" class="cell"></div> 이거를 말하는 듯
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

let options = ['', '', '', '', '', '', '', '', ''];
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
  options[index] = currentPlayer; // <- 자리가 x or o 인지를 인덱스에 기록해줌(없으면 누가 이긴지 계산 안 됨)
  cell.textContent = currentPlayer; // <- 칸에 x or o를 표시해 줌
}

function changePlayer() {
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false; // true로도 변경해도 됨. 다만 if문에서 roundWon != true로 같이 변경해야됨.

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

    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = 'X';
  options = ['', '', '', '', '', '', '', '', ''];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ''));
  // running = true;
}
