const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');
// 모든 바람 조건의 상수가 필요함
// 조건이 2차원 배열일 경우 const 바람 조건
// 세개의 셀이 모두 동일한 문자를 갖는 경우, 이를 확인해야 함
// 하지만 어떤 셀을 확인해야 할지 알아야 함
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
// 게임을 초기화할 대 이를 true로 전환
let running = false;

//필요한 다양한 함수를 모두 생성

//함수 초기화

// 이 함수를 초기화하여 모든 것을 처리함
initialzeGame();
function initialzeGame() {
  // 셀에 이벤트 처리
  cells.forEach((cell) => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  // true로 설정해야 xxx중 하나를 클릭할 수 있음
  running = true;
  console.log('1234');
}
// 셀 클릭
function cellClicked() {
  // cellIndex의 속성을 얻음
  const cellIndex = this.getAttribute('cellIndex');
  // options내의 index번호가 비어있거나 게임중이 아니라면
  if ((options = [cellIndex] != '' || !running)) {
    // 아무것도 하지 않고 반환
    return;
  }
  // 그렇지 않으면 셀함수를 호출. 이를 인수로 전달, 승자 확인 함수 전달
  updateCell(this, cellIndex);
  // 일시적으로 업데이트 한 후 이 함수 호출
  changePlayer();
  checkWinner();
  console.log('1234');
}
// 업데이트 셀 :
function updateCell(cell, index) {
  // options을 가져와 index매개변수의 인덱스에서 속편을 현재 플레이어로 설정하므로 자리 표시자를 업데이트 한 다음,
  options[index] = currentPlayer;
  // 원래 텍스트 콘텐츠를 클릭한 셀이 현재 플레이어와 같으면 이러한 셀 중 하나의 텍스트 콘텐츠를 변경
  cell.textContent = currentPlayer;
}
function changePlayer() {
  // 다음 플레이어를 현재 항목으로 변경
  // 현재 플레이어 속편을 설정하고 삼항 연산자를 사용
  // 조건 : 현재 플레이어가 X와 같으면 현재 플레이어를 O로 할당하고 그렇지 않으면 X로 할당해라
  currentPlayer = changePlayer == 'X' ? 'O' : 'X';
  gu;
  statusText.textContent = `${currentPlayer}'s turn`;
  console.log('1234');
}
function checkWinner() {}
function restartGame() {}
