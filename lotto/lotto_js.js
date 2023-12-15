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

/// mdn보기만 하지말고 응용 해야 됨. 쓰고 보니 기본적인 걸 몰랐네

// 씨.. 한건데 왜 모르는거야... 당연함 되는구나 이러고 넘겼으니 아니 이걸 다 외워야 해? 그래야하군.
// 는 무슨 이해를 해야 함. 이 아래가 고작 sort 메스드로 시작했다는 게 믿기지 않는군.
var stringArray = ['Blue', 'Humpback', 'Beluga'];
var numericStringArray = ['80', '9', '700'];
var mixedNumericArray = ['80', '9', '700', 40, 1, 5, 200];

function compareNumber(a, b) {
  return b - a;
}

// 오 왜 [1, 200, 40, 5] 이렇게 나오지..?
// 왜냐하면 sort는 유니코드를 따르기 때문이지
// 나는!! 숫자가 순차적으로 잘 나오길 원해!! 그렇다면 compareFunction 사용하시면 되겠습니다.
// example
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function (a, b) {
  return a - b;
});
console.log(numbers);

var numberArray = [40, 1, 5, 200];
numberArray.sort(function (a, b) {
  return a - b;
});
console.log(numberArray);

console.log(numberArray.join()); // 1, 200, 40, 5

// 문자이길 원함.
let items = [
  { name: 'Edward', value: 21 },
  { name: 'Magnetic', value: 13 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Zeros', value: 37 },
];

// 배열 내 문자열!만! 순서대로 나열하는 방법
// 문자열 비교 : localeCompare();
// let arr = items.map(({ name }) => name);
// arr.sort(function (a, b) {
//   return a.localeCompare(b);
// });
//배열 내 숫자 순서대로 나열하는 방법
// items.sort(function (a, b) {
//   return a.value - b.value;
// });
// 배열 내 문자열 기준으로 순서대로 나열하는 방법
items.sort((a, b) => a.name.localeCompare(b.name));
console.log(items);

// console.log(arr);

// 하 내가 해냄...

var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

// 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
var mapped = list.map(function (el, i) {
  return { index: i, value: el };
});
console.log(mapped);
// 축소 치를 포함한 매핑 된 배열의 소트
mapped.sort(function (a, b) {
  return +(a.value > b.value) || +(a.value === b.value) - 1;
});
console.log(mapped);

// 결과 순서를 위한 컨테이너
var result2 = mapped.map(function (el) {
  return list[el.index];
});
console.log(result2);

// 문자열 비교
// localeCompare = 이거는 문자열의 오름차순을 해주는건가.
const arr5 = ['ant', 'can', 'ben', 'bell'];
arr5.sort((a, b) => {
  return a[0] === b[0] ? a.localeCompare(b) : a[0].localeCompare(b[0]);
});
console.log(arr5);

// 아니.. 왜 코드는 하나였는데 모르는 건 4개야 창조경제 도랐네 진자.....
// 화살표 함수 중괄호 있는 거 없는 거 구분
// 추가로 처리하는 구문이 있는 경우만 중괄호 쓰기!!!!!

// 화살표 함수
// 내가 지금까지 알았던 거는
const abc = function () {
  console.log('화살표');
};
abc();

// 이거였는데
const efg = () => {
  console.log('화살표!');
};
efg();

// 놀랍게도 중괄호를 뺄 수 있었답니다.
const hij = () => console.log('화살표~');
hij();

// 그러면 중괄호를 언제 쓰느냐
// 하단처럼
const lmn = () => {
  console.log('이렇게 쓰는 것이다');
  const sub = 123;
  return sub;
};
lmn();

// 매개변수가 있는 함수에서는 어떻게 쓸까요

// 기존
(function (a) {
  return a + 100;
});

// 화살표함수로 변형
(a) => {
  return a + 100;
};

// 놀랍게도 중괄호와 return을 없애도 잘 됩디다.
(a) => a + 100;

// 더욱더 놀라운 거는 소괄호도 없애도 된다는 사실 여기는 안됨..
(a) => a + 100;

// 화살표 함수 특 : 간결한 본문은 return하면 안됨. 블록 본문에만 return 해야 함.(정말 놀라워~)
// 간결한 본문이란 : (params) => { object: literal }

// 이러면 반환 안됨.
const func = () => {
  foo: 1;
};
func();

// 나는 반환을 하고 싶다고~!! => 객체를 괄호로 묶으면 해결
const func1 = () => ({ foo: 1 });

// 메서드로 사용 못함.
// 왜죠? 당연함 가리키는 방향이 없음. 그래서 윈도우 가리킴. 하 여기까지만 팔까. 너무 멀리와버렸는데
const obj = {
  i: 10,
  b: () => console.log(this.i, this), // window
  c() {
    console.log(this.i.this); // undefined
  },
};
obj.b();
obj.c();

// 인수의 바인딩이 없음.
function foo(n) {
  const f = () => argument[0] + n;
}

// 실제로 사용해보는 화살표 함수

// 익명함수로 사용. 안에 아무것도 없으니 빈 값 반환
const empty = () => {};

(() => 'foobar')();
// foobar 반환
// 큰괄호가 전체를 감싸고 있으니 이거는 즉시 호출함수

const simple = (a) => (a > 15 ? 15 : a);
simple(16); // 15
simple(13); // 13

const arr = [5, 6, 13, 0, 1, 18, 23];


// 아니 sort식이랑 똑같이 써도 같은 값이 나오는데
// reduce는 뭐임 진자. 얘는 그냥 진자 배열의 합을 더한다고 생각해도 되는거야??
const sum = arr.reduce((a, b) => 

);
console.log(sum);
