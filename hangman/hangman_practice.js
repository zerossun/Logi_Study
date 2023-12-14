// html 영역 지정
const first = document.querySelector('#first');
const content = document.querySelector('#content');
const end = document.querySelector('#end');
const start = document.querySelector('.start');
const quiz = document.querySelector('.quiz');
const quiz_header = document.querySelector('.quiz_header');
const quiz_img = document.querySelector('.quiz_img');
const quiz_choice = document.querySelector('.quiz_choice');
const quiz__desc = document.querySelector('.quiz__desc');
const next = document.querySelector('.next');
const score = document.querySelector('.score');
const replay = document.querySelector('.replay');

// 이미지 배열
const images = [
  './img/0.png',
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/7.png',
];
// css 숨김 기능
const HIDDEN = 'hidden';

// 문제 배열
const quiz_Q = [
  {
    quizImg: images[0],
    quizAsw: ['순정', '애정', '우정', '감정'],
    quizCho: '순정',
    aswDesc: '화란아, 나도 "순정"이 있다.',
  },
  {
    quizImg: images[1],
    quizAsw: ['발발타', '잘잘타', '달달타', '팔팔타'],
    quizCho: '발발타',
    aswDesc: '아수라 "발발타"...',
  },
  {
    quizImg: images[2],
    quizAsw: ['숙대', '고대', '이대', '연대'],
    quizCho: '이대',
    aswDesc: '나 "이대" 나온 여자야',
  },
  {
    quizImg: images[3],
    quizAsw: ['10억', '3억', '7억', '5억'],
    quizCho: '5억',
    aswDesc: '한 끗인데 "5억"을 태워?!',
  },
  {
    quizImg: images[4],
    quizAsw: ['한강대교', '양화대교', '마포대교', '올림픽대로'],
    quizCho: '마포대교',
    aswDesc: '"마포대교"는 무너졌냐 이 XX야',
  },
  {
    quizImg: images[5],
    quizAsw: ['객기', '아트', '예술', '작품(으)'],
    quizCho: '예술',
    aswDesc: '크.... 그 양반 갈 때도 아주 "예술"로 가는구만.',
  },
  {
    quizImg: images[6],
    quizAsw: ['신사', '양반', '타짜', '인간'],
    quizCho: '신사',
    aswDesc: '어이 젊은 친구, "신사"답게 행동해.',
  },
  {
    quizImg: images[7],
    quizAsw: ['무기', '비수', '화투', '상처'],
    quizCho: '비수',
    aswDesc: '싸늘하다. 가슴에 비수가 날아와 꽃힌다.',
  },
];

// 익명함수 내에 지역변수로 각 html 코드 제작.
// 위에서 선언한 변수에 html 집어넣기
// 파라미터를 index로 지정 후 하단의 next 버튼 기능에서 함수에 따라 파라미터 수가 바뀔 수 있도록 제작
const quiz_List = (index) => {
  let quizI = `
  <em>${index + 1}</em>
  `;
  let quizQ = `
  <img src=${quiz_Q[index].quizImg}></img>
  `;
  let choiceQ = `
  <div>
    <label for = "choice1">
    <p>1️⃣ </p>
      <span>${quiz_Q[index].quizAsw[0]}</span>
    </label>
  </div>
  <div>
    <label for = "choice2">
    <p>2️⃣ </p>
      <span>${quiz_Q[index].quizAsw[1]}</span>
    </label>
  </div>
  <div>
    <label for = "choice3">
    <p>3️⃣ </p>
      <span>${quiz_Q[index].quizAsw[2]}</span>
    </label>
  </div>
  <div>
    <label for = "choice4">
    <p>4️⃣ </p>
      <span>${quiz_Q[index].quizAsw[3]}</span>
    </label>
  </div>
  `;
  let quizD = `
  <div>${quiz_Q[index].aswDesc}</div>
  `;
  quiz_header.innerHTML = quizI;
  quiz_choice.innerHTML = choiceQ;
  quiz_img.innerHTML = quizQ;
  quiz__desc.innerHTML = quizD;

  //위의 label spand의 모든 요소를 변수로 지정
  const quizChoiceSpan = content.querySelectorAll('.quiz_choice label span');
  // quizChoiceSpan수만큼 변수내애 choiceSelectedr라는 클릭 이벤트 리스너를 넣어줘라.
  for (let i = 0; i < quizChoiceSpan.length; i++) {
    quizChoiceSpan[i].setAttribute('onclick', 'choiceSelected(this)');
  }
  // css적 요소
  next.classList.add(HIDDEN);
  quiz__desc.classList.add(HIDDEN);
};

// span 클릭 시 일어나는 기능.
function choiceSelected(answer) {
  // 매개변수의 innerText 변수로 지정 / 클릭한 span의 텍스트
  let userAnsewr = answer.innerText;
  // 배열의 인덱스에 맞는[현재 카운트 수] quizCho(문제답)을 변수로 지정
  let currentAnswer = quiz_Q[quizCount].quizCho;
  // 만약 클릭한 span의 텍스트와 현재 카운트의 문제 답이 같다면,
  // = 로 할 시, = : 할당연산자 같다라는 평가 아닌 값이 대입됨. 애초에 안됨.
  // == 로 할 시, == : 값만 같으면 true라고는 나옴. 하지만, 데이터 종류가 달라도 같게 나옴
  // === 로 할 시, === : 엄격하게 관리, 데이터 종류도 같은지 확인해줌.
  if (userAnsewr === currentAnswer) {
    // score 점수를 1점 높여줘라
    quizScore = quizScore + 1;
  }
  // css적 요소
  next.classList.remove(HIDDEN);
  quiz__desc.classList.remove(HIDDEN);
}

// '다음 문제' 버튼 클릭 시 이벤트 리스너 기능
next.addEventListener('click', () => {
  // 정확히 지정하기에 화살표 함수 사용
  // 만약 현 카운터 수가 문제 배열의 수 -1 이랑 같다면 하단의 css를 조정해줘라.
  if (quizCount == quiz_Q.length - 1) {
    next.classList.add(HIDDEN);
    content.classList.add(HIDDEN);
    end.classList.remove(HIDDEN);
    // 아니마련 1을 더해줘라.
  } else {
    quizCount++;
  }
  // 함수 호출
  quiz_List(quizCount);
  // socre안의 텍스트 지정
  score.innerText = `당신의 점수는 ${quizScore} 입니다`;
});

// '시작하기' 버튼 클릭 시 이벤트 리스너 기능
function startBtn(e) {
  e.preventDefault();
  first.classList.add(HIDDEN);
  content.classList.remove(HIDDEN);
  // 문제 수, 점수 0으로 지정
  quizScore = 0;
  quizCount = 0;
  // 함수 호출
  quiz_List(quizCount, quizScore);
}

start.addEventListener('click', startBtn);

// '시작하기' 버튼 클릭 시 이벤트 리스너 기능. css 조정
replay.addEventListener('click', () => {
  content.classList.add(HIDDEN);
  end.classList.add(HIDDEN);
  first.classList.remove(HIDDEN);
});
