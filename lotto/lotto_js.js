const result = document.querySelector('#result');
const result1 = document.querySelector('#result1');
const lottoBtn = document.querySelector('#lottoBtn');
const bonusBtn = document.querySelector('#bonusBtn');

const RAN = 'ran';

const defaultChoicedNums = [];

let choicedNums = defaultChoicedNums;

const setChoicedNums = (paramChoicedNums) => {
  choicedNums = paramChoicedNums;
};

const sortRandomArray = (paramArray) => {
  return paramArray.sort(() => Math.random() - 0.5);
};

const candiates1 = () =>
  Array(8)
    .fill()
    .map((item, index) => {
      return item, index + 1;
    });

const set = (value, index) => {
  setTimeout(function callack() {
    let span = document.createElement('span');
    span.classList.add(RAN);
    span.innerText = value;
    result.append(span);
  }, (index + 1) * 1000);
};

function random() {
  const candiate = candiates1();
  const random = sortRandomArray(candiate);
  console.log('random', random);

  // ?? 로또번호는 6개 아닌가, 랜덤 6개 뽑은걸 왜 또 sort 하는걸까?
  // let slice = random.slice(0, 6).sort((a, b) => {
  //   return a - b;
  // });

  let slice = random.slice(0, 6);
  // 선택된 번호들을 기억
  setChoicedNums(slice);

  for (let i = 0; i < slice.length; i++) {
    set(slice[i], i);
  }
}

function hidden() {
  result.classList.remove('hidden');
  random();
}
function bonusB() {
  if (choicedNums.length === 0) {
    window.alert('아직 번호들을 뽑지 않으셨습니다.');
    return;
  }

  const candiate = candiates1();
  const remainCandiate = candiate.filter((r) => !choicedNums.includes(r));
  console.log('remainCandiate', remainCandiate);
  // TODO slice와 splice 정리하기
  const bonus = sortRandomArray(remainCandiate).slice(0, 1);
  console.log('bonus', bonus);
  result1.classList.add(RAN);
  result1.innerText = bonus;
}

lottoBtn.addEventListener('click', hidden);
bonusBtn.addEventListener('click', bonusB);
