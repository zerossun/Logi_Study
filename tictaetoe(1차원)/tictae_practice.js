// 1차원 배열
// 행하나를 배열로 잡음

// html 영역 지정
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');


///// * 필요한 변수들 *
// 1. html 인덱스와 연결할 변수 생성
// 2. 자리를 표시할 빈배열 생성
// 3. 현재 플레이어 x로 설정
// 4. let running = false; <- 게임이 실행중인지 확인 위한 변수 생성

// html 인덱스와 연결할 변수 생성
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

// 자리 표시자 배열이 필요함. 각각의 빈문자 배열이 필요함.
let options = ['', '', '', '', '', '', '', '', ''];
// 현재 플레이어를 추적해야 함. 현재 플레이어를 x와 같이 놔둠.
let currentPlayer = 'X';
// 그런 다음 게임이 실행 중인지 추적하기 위해 변수가 필요함.
// 게임을 초기화할 때 이를 true로 전환
let running = false;

initialzeGame();
// 이 함수를 초기화하여 모든 것을 처리함. 이거 없으면 암것도 안됨!!
// 전체 기능 정의한 함수
function initialzeGame() {
  // 각각의 셀 클릭할때마다 cellClicked함수 돌아가게
  cells.forEach((cell) => cell.addEventListener('click', cellClicked));
  // restartBtn클릭할 때 첫화면으로
  restartBtn.addEventListener('click', restartGame);
  // statusText은 현재 플레이어에 맞게 지정
  statusText.textContent = `${currentPlayer}'s turn`;
  // true로 설정해야 xxx중 하나를 클릭할 수 있음
  running = true;
}

// 셀 클릭
function cellClicked() {
  // cellIndex의 속성을 얻음(클릭하는 모든 셀을 참조하는 변수 생성)
  const cellIndex = this.getAttribute('cellIndex');
  // 옵션의 인덱스 번호가 비워져있는지(칸에 아무것도 없는지)/ 게임이 진행중이 아니라면 반환해줘라
  if (options[cellIndex] != '' || !running) {
    return;
  }
  // 아니라면은 셀을 클릭했을 때 업데이트가 되게 해줘라(cellindex에 업데이트 해줘)
  updateCell(this, cellIndex);
  // 일시적으로 업데이트 한 후 이 함수 호출 = > 승자 계산 위해 체크할 때마다 실시간으로 계산해줘라.
  checkWinner();
}


// 업데이트 셀 :
function updateCell(cell, index) {
  options[index] = currentPlayer; // <- 자리가 x or o 인지를 인덱스에 기록해줌(없으면 누가 이긴지 계산 안 됨)
  cell.textContent = currentPlayer; // <- 칸에 x or o를 표시해 줌
}

// 플레이어 변경
function changePlayer() {
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
  // currentPlayer가 x이면 o로 변경해주고 아니면 x로 바꿔줘라.
  statusText.textContent = `${currentPlayer}'s turn`;
  // 바꿨으면 statusText를 `${currentPlayer}'s turn`로 써줘라
}

// 누가 위너인지 체크
function checkWinner() {
  // 속편을 false로 설정. 누군가 이기면 이것을 true로 바꾼다
  let roundWon = false; // true로도 변경해도 됨. 다만 if문에서 roundWon != true로 같이 변경해야됨.

  // for문을 이용하여 배열 내의 모든 승리 조건 반복
  
  for (let i = 0; i < winConditions.length; i++) {
    // 승리 조건 내의 각 내부 배열을 반복하지만 이러한 각 배열을 임시 변수 내에 저장
    // 행내의 배열을 각각 변수로 지정
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    // 배열이 하나가 비어있다면 반복
    if (cellA == '' || cellB == '' || cellC == '') {
      continue;
      // 각 칸이 빈공간과 같다면 반복해줘라
    }
    // 배열의 값 2개가 같다면,
    if (cellA == cellB && cellB == cellC) {
      // 게임에서 이겼다.
      roundWon = true;
      // 루프에서 벗어나기
      break;
    }
  }
  if (roundWon) 
  {
    // 이겼다면 statusText 텍스트를 `${currentPlayer}wins!`해줘라.
    statusText.textContent = `${currentPlayer}wins!`;
    // running = false;있어야 게임이 끝나고 칸 클릭했을 때 표시가 생기지 않음.
    running = false;
  }
  // 남은 공백이 없으면 무승부
  else if (!options.includes('')) {
    statusText.textContent = `Draw!`;
  } else {
    // 그것도 아니라면 플레이어 변경해줘라.
    changePlayer();
  }
}

// 리셋게임 버튼
function restartGame() {
  // 현재 플레이러르 x라고 설정해 줘
  currentPlayer = 'X';
  // options 값을 다 비운 걸로 변수 지정해 줘
  options = ['', '', '', '', '', '', '', '', ''];
  // statusText 텍스트를 `${currentPlayer}'s turn`해주고
  statusText.textContent = `${currentPlayer}'s turn`;
  // cell 값을 다 지워줘라
  cells.forEach((cell) => (cell.textContent = ''));
  running = true;
}

