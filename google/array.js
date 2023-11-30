//문제
let names = [
  'Steven Paul Jobs',
  'Bill Gates',
  'Mark Elliot Zuckerberg',
  'Elon Musk',
  'Jeff Bezos',
  'Warren Edward Buffett',
  'Larry Page',
  'Larry Ellison',
  'Tim Cook',
  'Lloyd Blankfein',
];

// 배열함수
// 모든 배열함수가 함수를 매개변수로 받음

// 원래의 for문 사용했을 때,
// for (let i = 0; i < names.length; i++) {
//   console.log(names[i]);
// }
// ex) 아래와 같은 함수를 만들었음.
// function printName(item) {
//   console.log(item);
// }
// 1. forEach() 함수
// names.forEach(printName);
// 이렇게 불러서 쓸 수 있음
// 위의 아이템 forEach안에 넣으면 지가 알아서 줌. 그래서 자주 씀
// forEach가 알아서 회전을 하면서 매번 아이템 하나씩 넘김
// forEach는 요소 뿐만 아닌 index도 넘겨줌

// 다른데 쓰이지 않고 only forEach안에서만 쓸꺼다. = 근데 굳이 이름을 부여할 필요가 없다.
// 익명함수로 만들어 forEach안에 바로 넣어버리면 됨.
// ex)
// names.forEach(function (item) {
//   console.log(item);
// });

// 하지만 위의 친구도 옛방식. 이제는 es6방식으로 사용함. => 화살표 함수
// names.forEach((item) => {
//   console.log(item);
// });

// 위에서 말했든 index도 넘겨줌
// names.forEach((item, index) => {
//   console.log(item, index);
// });

// 2. map()함수
// names.map(()=>{})
// forEach와 같음.
// map은 return을 해주어야 함.
// let data = names.map((item) => {
//   return item;
// });
// console.log(data);
// 위 함수의 결과 값 : (10) ['Steven Paul Jobs', 'Bill Gates', 'Mark Elliot Zuckerberg', 'Elon Musk', 'Jeff Bezos', 'Warren Edward Buffett', 'Larry Page', 'Larry Ellison', 'Tim Cook', 'Lloyd Blankfein']
// forEach와 map 의 차이
// - forEach는 반환값이 없음. 그래서 굳이 변수 만들어서 받을 필요가 없음
// - 반드시 배열을 반환함.(array를 return한다.)
// 배열에 무슨값을 넣어줄지는 return이 결정
// 그래서 만약에 앞에 'my name is ' 를 붙이면 붙여서 return 됨.
let data = names.map((item) => {
  return `My name is ${item}`;
});
console.log(data);
// => map은 반환값이 있다. 그러니 반드시 return을 붙여주어야 한다.
// map 언제 많이 씀?
// ex)
let ceoList = [
  { name: 'Larry Page', age: 23, ceo: true },
  { name: 'Tim cool', age: 40, ceo: true },
  { name: 'Elon Musk', age: 55, ceo: false },
];

let Ceo = ceoList.map((item) => {
  return item.name;
});
console.log(Ceo);
// api에서 원하는 데이터만 가져오고 싶을 때 주로 사용

// 3. filter
// 조건을 넣었을 때 true인 값만 반환
// 결과값도 배열(array)로 반환
// 데이터 필터링 할 때 for 대신 쓰기
let Ceo1 = ceoList.filter((item) => {
  return item.age == 23;
});
console.log(Ceo1);

let Ceo2 = names.filter((item) => {
  return item.startsWith('L');
});
console.log(Ceo2);

// 4. some()함수
// filter 결과값을 다 보여주지만, some은 true, false 값으로 나옴
let Ceo3 = names.some((item) => {
  return item.startsWith('L');
});
console.log(Ceo3);
// 결과값 : true

// 5. every()함수
// some이 한개라도 있는지 없는지에 관하여 boolean값을 리턴했다면, 얘는 전체에 관하여 묻고 값 반환
let Ceo4 = names.every((item) => {
  return item.startsWith('L');
});
console.log(Ceo4);

// 6. find()함수
// filter와의 차이
// filter는 array 값을 반환해줌(조건에 속하는 거 다 반환)
// find는 string 값을 반환해줌(조건에 속하는 맨 반환)
let Ceo5 = names.find((item) => {
  return item.startsWith('L');
});
console.log(Ceo5);
// 7. findIndex()함수
// findIndex 값을 찾아줌
let Ceo6 = names.findIndex((item) => {
  return item.startsWith('L');
});
console.log(Ceo6);
// ===========================
// let initialOnly = names.map((item) => {
//   let splitName = item.split(' '); // 배열의 있는 문자를 기준을 정해주고 자른다.
//   let initial = ''; //initial를 선언후 값을 비워놓는다.
//   splitName.forEach((nameItem) => (initial += nameItem[0])); //splitName에 forEanh를 사용해 initialdp 자른 배열에 0번째 인덱스의 문자를 추가한다.
//   return initial; //추가된 값을 return 시키면 이니셜만 나온다.
// });
// console.log('이니셜 : ', initialOnly);

// let inital = names.map((item) => {
//   let splitN = item.split(' ');
//   let init = '';
//   splitN.forEach((nameItem1) => (init += nameItem1[0]));
//   return init;
// });
// console.log('이니셜1 : ', inital);

//lotto

// let candiate = Array(45);
// console.log(candiate);

// [1, 2, 3, 4, 5].forEach(function (elment) {
//   console.log(elment);
// });

// let testArray = [1,2,3,4,5];
// let sum = 0;
// function getSum(value){
//   sum+= value;
// }

// function test() {
//   let testArray = [1, 2, 3, 4, 5];
//   let sum = 0;
//   function getSum(value) {
//     sum += value;
//   }
//   testArray.forEach(getSum);
//   console.log(sum);
// }
