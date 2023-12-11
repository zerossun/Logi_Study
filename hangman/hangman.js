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


const images = ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png"];
const HIDDEN = 'hidden';



const quiz_Q = [
  {
    quizImg: images[0],
    quizAsw: ['순정','애정','우정','감정'],
    quizCho: ' 순정',
    aswDesc: '화란아, 나도 "순정"이 있다.',
  },
  {
    quizImg: images[1],
    quizAsw: ['발발타', '잘잘타', '달달타', '팔팔타'],
    quizCho: ' 발발타',
    aswDesc: '아수라 "발발타"...',
  },
  {
    quizImg: images[2],
    quizAsw: ['숙대', '고대', '이대', '연대'],
    quizCho: ' 이대',
    aswDesc: '나 "이대" 나온 여자야',
  },
  {
    quizImg: images[3],
    quizAsw: ['10억', '3억', '7억', '5억'],
    quizCho: ' 5억',
    aswDesc: '한 끗인데 "5억"을 태워?!',
  },
  {
    quizImg: images[4],
    quizAsw: ['한강대교', '양화대교', '마포대교', '올림픽대로'],
    quizCho: ' 마포대교',
    aswDesc: '"마포대교"는 무너졌냐 이 XX야',
  },
  {
    quizImg: images[5],
    quizAsw: ['객기', '아트', '예술', '작품(으)'],
    quizCho: ' 예술',
    aswDesc: '크.... 그 양반 갈 때도 아주 "예술"로 가는구만.',
  },
  {
    quizImg: images[6],
    quizAsw: ['신사', '양반', '타짜', '인간'],
    quizCho: ' 신사',
    aswDesc: '어이 젊은 친구, "신사"답게 행동해.',
  },
  {
    quizImg: images[7],
    quizAsw: ['무기', '비수', '화투', '상처'],
    quizCho: ' 비수',
    aswDesc: '싸늘하다. 가슴에 비수가 날아와 꽃힌다.',
  },
];

let quizCount = 0;
let quizScore = 0;

const quiz_List = (index) => {
  let quizI = `
  <em>${index + 1}</em>
  `;
  let quizQ = `
  <div>${quiz_Q[index].quizImg}</div>
  `
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
  let quizD = `
  <div>${quiz_Q[index].aswDesc}</div>
  `
  quiz_header.innerHTML = quizI;
  quiz_choice.innerHTML = choiceQ;
  quiz_img.innerHTML = quizQ;
  quiz__desc.innerHTML = quizD;


//   for(i=0; i<images.length; i++){
//     const image = document.createElement("img");
//     image.src =  `img/${images[i]}`
//     quiz_img.append(image)
//   }

// let imaagee = () => {
//   images.map((item, index) => {
//     return item, index+1;
//   })

// }
// const changeImage = images[Math.floor(Math.random() * images.length)];
// const changeImage = () =>
// images.map((item, index) => {
//       return item, index+1;
//     })
// ;


// console.log(changeImage);

// const image = document.createElement("img");
// image.src =  `img/${changeImage}`
// document.body.appendChild(image);

  
  const quizChoiceSpan = content.querySelectorAll(".quiz_choice label");
  const quizChoiceInput = content.querySelectorAll(".quiz_choice input");
  for(let i =0; i<quizChoiceSpan.length; i++){
    quizChoiceSpan[i].setAttribute("onclick", "choiceSelected(this)");
    // quizChoiceInput.disabled = 'true';
    // console.log(quizChoiceSpan)
  }
next.classList.add(HIDDEN); 
quiz__desc.classList.add(HIDDEN);
  };


quiz_List(quizCount);



function choiceSelected(answer){
  let userAnsewr = answer.innerText;
  let currentAnswer = quiz_Q[quizCount].quizCho;
  if(userAnsewr = currentAnswer){
    // quizScore = quizScore +1; 
    console.log(quizScore++);
  }
  next.classList.remove(HIDDEN);
  quiz__desc.classList.remove(HIDDEN);
  console.log(userAnsewr);
  console.log(currentAnswer);
}

next.addEventListener('click',()=>{
  if(quizCount == quiz_Q.length -1){
    next.classList.add(HIDDEN);
    content.classList.add(HIDDEN);
    end.classList.remove(HIDDEN);
  }else{
    quizCount++;
  }
  quiz_List(quizCount);
  console.log(quizCount);
  console.log(quizScore);
})

if(quizCount == quiz_Q.length -1){
  content.classList.add(HIDDEN);
  end.classList.remove(HIDDEN);
}

function startBtn(e) {
  e.preventDefault();
  first.classList.add(HIDDEN);
  content.classList.remove(HIDDEN);
}

score.innerText = `당신의 점수는 ${quizScore} 입니다`;

start.addEventListener('click', startBtn);

replay.addEventListener('click',()=>{
  content.classList.add(HIDDEN);
  end.classList.add(HIDDEN);
  first.classList.remove(HIDDEN);
})