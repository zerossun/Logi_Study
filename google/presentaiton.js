/// const, let, var

(function tset() {
  console.log(a);
  var a = 'qwetry';
})();
// undefined

// (function test(){
//   console.log(b);
//   let b = 'qwerty'
// })();
// ReferenceError: Cannot access 'a' before initialization

// -> 둘이 값이 다르게 나오는 이유. 호이스팅!!!


// closer

// let l0 = 'l0';
// function fn1(){
//   let l1 = 'l1';
//   console.log(l0,l1);
// }
// function fn2(){
//   let l2 = 'l2';
//   console.log(l0,l2);
//   fn1();
// }
// fn2();
// fn1();

// let l0 = 'l0';
// function fn1(){
//   function fn2(){
//     let l2 = 'l2';
//     console.log(l0,l2);
//     fn1();
//   }
//   let l1 = 'l1';
//   fn2();
// }
// fn1();


// =============================
// 질문드렸던 코드
var increase = function (num) {
  return ++num;
};

var decrease = function (num) {
  return --num;
};

var predicates = { increase, decrease };

function makeCounter(predicate) {
  var num = 0; // 0이라고 실행됨.

  return function () {
    num = predicate(num); // num은 predicate(num)과 같다고 정의됨.
    return num;
  };
}

var increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

var decreaser = makeCounter(predicates.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2


// 함수의 유효범위는 어디서 실행됐느냐가 아닌 어디서 정의 됐느냐 - 생활코딩

// ===========================

