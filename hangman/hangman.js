const first = document.querySelector('#first');
const content = document.querySelector('#content');
const end = document.querySelector('#end');
const start = document.querySelector('.start');
const quiz = document.querySelector('.quiz');
const quiz_header = document.querySelector('.quiz_header');
const quiz_img = document.querySelector('.quiz_img');
const quiz_choice = document.querySelector('.quiz_choice');

const images = ['0.jpg', '1.jpg', '2.jpg'];
const HIDDEN = 'hidden';

const quiz_Q = [
  {
    // quizImg: images[0],
    quizAsw: ['순정', '애정', '우정', '감정'],
    aswDesc: '화란아, 나도 "순정"이 있다.',
  },
  {
    // quizImg: images[1],
    quizAsw: ['발발타', '잘잘타', '달달타', '팔팔타'],
    aswDesc: '아수라"발발타"...',
  },
  {
    // quizImg: images[2],
    quizAsw: ['숙대', '고대', '이대', '연대'],
    aswDesc: '나 "이대" 나온 여자야',
  },
  {
    // quizImg: images[3],
    quizAsw: ['10억', '3억', '7억', '5억'],
    aswDesc: '한 끗인데 "5억"을 태워?!',
  },
  {
    // quizImg: images[4],
    quizAsw: ['한강대교', '양화대교', '마포대교', '올림픽대로'],
    aswDesc: '"마포대교"는 무너졌냐 이 XX야',
  },
  {
    // quizImg: images[5],
    quizAsw: ['객기', '아트', '예술', '작품(으)'],
    aswDesc: '크.... 그 양반 갈 때도 아주 "예술"로 가는구만.',
  },
  {
    // quizImg: images[6],
    quizAsw: ['달건이', '거렁뱅이', '건달', '타짜'],
    aswDesc: '내가 "달건이" 생활을 열일곱에 시작했다.',
  },
  {
    // quizImg: images[7],
    quizAsw: ['부산', '남원', '수원', '창원'],
    aswDesc: 'XX...고향이 "남원"이라메...',
  },
];

const quiz_List = (index) => {
  // let quizQ = `
  // <em>${index + 1}</em>
  // <img>${quiz_Q[index].quizImg}</img>
  // `;
  let choiceQ = `
  <label for = "choice1">
    <input type="radio" id="choice1" name="choice1" value="1">
    <span>${quiz_Q[index].quizAsw[0]}</span>
  </label>
  <label for = "choice2">
    <input type="radio" id="choice2" name="choice2" value="2">
    <span>${quiz_Q[index].quizAsw[1]}</span>
  </label>
  <label for = "choice3">
    <input type="radio" id="choice3" name="choice3" value="3">
    <span>${quiz_Q[index].quizAsw[2]}</span>
  </label>
  <label for = "choice4">
    <input type="radio" id="choice4" name="choice4" value="4">
    <span>${quiz_Q[index].quizAsw[3]}</span>
  </label>
  `;
};
quiz_choice.innerHTML = quiz_Q;

function startBtn(e) {
  e.preventDefault();
  first.classList.add(HIDDEN);
  content.classList.remove(HIDDEN);
}

for (i = 0, i < quiz_Q.length; i++; ) {
  quiz_List(quiz_Q[i]);
  console.log('1234');
}

start.addEventListener('click', startBtn);
