// let candiate = Array(45);
// let fill = candiate.fill();

// fill.forEach(function (elment, index) {
//   console.log(elment, index + 1);
// });
// console.log(candiate);

// // 숫자야구
// var question = document.getElementById('question');
// var result = document.getElementById('result');
// var answer_form = document.getElementById('answer_form');
// var answer = document.getElementById('answer');
// var remainedChance = document.getElementById('remainedChance');
// var number_candidate;
// var number_picked;
// var wrongAnswerNumbers = 0;

// function random_number() {
//   number_candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   number_picked = [];
//   for (var i = 0; i < 4; i += 1) {
//     var picked = number_candidate.splice(
//       Math.floor(Math.random() * (9 - i)),
//       1
//     )[0];
//     number_picked.push(picked);
//   }
// }

// random_number();

// console.log(number_picked); // 뽑힌 4자리 숫자 확인용

// answer.maxLength = 4;
// answer.focus();
// remainedChance.innerHTML = 10;

// answer_form.addEventListener('submit', function (event) {
//   event.preventDefault();
//   question.textContent = '';
//   if (answer.value === number_picked.join('')) {
//     // 정답을 맞췄을 경우
//     result.textContent = 'Home run!';
//     answer.value = '';
//     answer.focus();
//     random_number();
//     console.log(number_picked);
//     wrongAnswerNumbers = 0;
//     remainedChance.innerHTML = 10;
//   } else {
//     var answer_array = answer.value.split('');
//     var strike = 0;
//     var ball = 0;
//     wrongAnswerNumbers += 1;
//     remainedChance.innerHTML -= 1;
//     if (wrongAnswerNumbers > 10) {
//       // 10번 넘게 틀린 경우
//       result.textContent =
//         'You missed 10 chances! The answer was ' + number_picked.join('');
//       answer.value = '';
//       answer.focus();
//       random_number();
//       console.log(number_picked); // 새 문제 확인용
//       wrongAnswerNumbers = 0;
//       remainChance.innerHTML = 10;
//     } else {
//       // 10번 미만으로 틀린 경우
//       for (var i = 0; i < 4; i += 1) {
//         if (Number(answer_array[i]) === number_picked[i]) {
//           strike += 1;
//         } else if (number_picked.indexOf(Number(answer_array[i])) > -1) {
//           ball += 1;
//         }
//       }
//       result.textContent = strike + ' strike ' + ball + ' ball ';
//       answer.value = '';
//       answer.focus();
//     }
//     console.log(number_picked); // 새 문제 확인용
//   }
// });

// sort

// let items = [
//   { name: 'Edward', value: 21 },
//   { name: 'Sharpe', value: 37 },
//   { name: 'And', value: 45 },
//   { name: 'The', value: -12 },
//   { name: 'Magnetic', value: 13 },
//   { name: 'Zeros', value: 37 },
// ];

// items.sort(function (a, b) {
//   if (a.value > b.value) {
//     return 1;
//   }
//   if (a.value < b.value) {
//     return -1;
//   }
//   0;
//   // console.log(items);
//   return 0;
// });

// items.sort(function (a, b) {
//   let nameA = a.name.toUpperCase();
//   let nameB = b.name.toUpperCase();

//   if (nameA < nameB) {
//     return -1;
//   }
//   if (nameA > nameB) {
//     return 1;
//   }
//   console.log(items);
//   return 0;
// });

// 배열 정리

// concat() : 두개 이상의 배열을 병합하는 데 사용

// const array1 = ['a', 'b', 'c'];
// const array2 = ['d', 'e', 'f'];
// const array3 = array1.concat(array2);
// console.log(array3);
// // ["a", "b", "c", "d", "e", "f"]

// // copyWithin() :
// const array4 = ['a', 'b', 'c', 'd', 'e'];
// console.log(array4.copyWithin(2, 3, 4));
// console.log(array4.copyWithin(1, 3));
// // ['a','a','a','a','a']

// //join() : 배열의 모든 요소를 연결해 하나의 문자열로 만듬
// const elment = ['fire', 'air', 'water'];
// console.log(elment.join()); // fire,air,water
// console.log(elment.join('')); // fireairwater
// console.log(elment.join('-')); // fire-air-water

// //entries() : 배열의 각 인덱스에 대한 키/값 쌍을 포함하는 배열 반복자
// const array5 = ['a', 'b', 'c '];
// const iterator1 = array5.entries();
// console.log(iterator1.next().value);
// console.log(iterator1.next().value);

// // shift() : 첫번째 요소를 제거하고 제거된 요소 반환
// const array6 = [1, 2, 3];
// const firstElement = array6.shift();
// console.log(array6);
// console.log(firstElement);

// // slice(): 배열의 내용을 변경합니다아아아아악!!
// const months = ['jan', 'march', 'april', 'june'];
// months.splice(1, 0, 'feb');
// console.log(months);

// //fill() : 배열의 인덱스 범위 내에 있는 모든 요소를 정적값으로 변경
// const arr = Array(3).fill({});
// arr[0].hi = 'hi';
// console.log(arr);

// const months1 = ['march', 'jan', 'feb', 'dec'];
// months1.sort();
// console.log(months1);

// const array7 = [1, 20, 4, 50, 14, 100000];
// array7.sort();
// console.log(array7);

// let items1 = [
//   { name: 'Edward', value: 21 },
//   { name: 'Sharpe', value: 37 },
//   { name: 'And', value: 45 },
//   { name: 'The', value: -12 },
//   { name: 'Magnetic', value: 13 },
//   { name: 'Zeros', value: 37 },
// ];
// // items1.sort((a, b) => {
// //   if (a.value > b.value) {
// //     return 1;
// //   }
// //   if (a.value < b.value) {
// //     return -1;
// //   }
// //   return 0;
// // });
// // console.log(items1);

// // sort()
// // 1. 콜백함수를 매개변수로 받음
// // 2. 리턴 값이 음수 : 첫번째 요소가 두번째 요소보다 앞에 배치, 양수 : 두번째 요소가 첫번째 요소보다 앞에 배치

// items1.sort((a, b) => {
//   let nameA1 = a.name.toUpperCase();
//   let nameA2 = a.name.toUpperCase();

//   if (nameA1 < nameA2) {
//     return -1;
//   }
//   if (nameA1 > nameA2) {
//     return 1;
//   }
//   return 0;
// });
// console.log(items1);

// let list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

// let mapped = list.map((el, i) => {
//   return { indxe: i, value: el.toLowerCase() };
// });

// mapped.sort((a, b) => {
//   return +(a.value > b.value) || +(a.value === b.value) - 1;
// });
// let result = mapped.map(function (el) {
//   return list[el.index];
// });
// console.log(result);

// ///////////
// let stringArray = ['blue', 'humpback', 'beluga'];

// let numericStringArray = ['80', '9', '700'];
// let numberArray = [40, 1, 5, 200];
// let mixedNumericArray = ['80', '9', '700', 40, 1, 5, 200];

// function compareNumbers(a, b) {
//   return a - b;
// }

// console.log('stringArray:', stringArray.join());
// // stringArray: blue,humpback,beluga
// console.log('Sorted:', stringArray.sort());
// // ['beluga', 'blue', 'humpback']
// console.log('numberArray:', numberArray.join());

// let named = prompt('이름');
// if (named == 'nada') {
//   let psword = prompt('비번');
//   if (psword == 'yap') {
//     alert('welcome');
//   } else {
//     alert('turn back');
//   }
// } else {
//   alert('취소되었습니다');
// }

// 전위형 증가 연산자
// let i = 0;
// while (++i < 5) console.log(i);
// 답 : 1,2,3,4
// 왜?? = ++i는 i를 먼저 증가 시키고 새로운 값을 반환, 그래서 첫번째 값이 1.(1+1 / 2+1 ....)

// 후위형 증가 연산자
// let i = 0;
// while (i++ < 5) console.log(i);
// 답 : 1,2,3,4,5
// 왜?? = 기존값을 먼저 반환, 그래서 첫번째 값이 0.(0+1 / 1+1 ....)

// for (i = 2; i <= 10; i++) {
//   if (i % 2 == 0) {
//     console.log('짝수');
//   }
// }

// for (let i = 0; i < 3; i++) {
//   console.log(`number ${i}!`);
// }
