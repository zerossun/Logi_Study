const result = document.querySelector('#result');
const result1 = document.querySelector('#result1');
const lottoBtn = document.querySelector('#lottoBtn');
const bonusBtn = document.querySelector('#bonusBtn');

const RAN = 'ran';

const candiates1 = () =>
  Array(45)
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
  const random = candiate.sort(() => Math.random() - 0.5);
  let slice = random.slice(0, 4).sort((a, b) => {
    return a - b;
  });
  
  for (let i = 0; i < slice.length; i++) {
    set(slice[i], i);
  }
}

function hidden() {
  result.classList.remove('hidden');
  random();
}
function bonusB() {
  const candiate = candiates1();
  const bonus = candiate[candiate.length - 1];
  result1.classList.add(RAN);
  result1.innerText = bonus;
}

lottoBtn.addEventListener('click', hidden);
bonusBtn.addEventListener('click', bonusB);
