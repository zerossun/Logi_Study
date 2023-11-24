/// const, let, var

// (function test() {
//   console.log(a);
//   let a = 'qqwert';
// })();

// (function test() {
//   console.log(a);
//   var a = 'qqwert';
// })();
// closer

let l0 = 'l0';

function fn2() {
  let l2 = 'l2';
  function fn1() {
    let l1 = 'l1';
    console.log(l0, l1, l2);
  }

  fn1();
}
fn2();

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
  function qwerty() {
    num = predicate(num); // num은 predicate(num)과 같다고 정의됨.
    return num;
  }
  return qwerty;
} // 함수를 반홤함!! 함수안에 함수가 있다. 변수나 함수를 참조함!!

var increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

var decreaser = makeCounter(predicates.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2

// 함수의 유효범위는 어디서 실행됐느냐가 아닌 어디서 정의 됐느냐 - 생활코딩
// 함수는 한번만 정의됨.
// ===========================
// then async 비교!!

console.log('node 로 실해ㅇ');
const execute = (a) => {
  return new Promise((resolve, reject) => {
    if (a) reject('asdhaosfaosif');
    setTimeout(() => {
      resolve('성공!!!');
    }, 3000);
  });
};
execute()
  .then((r) => {
    execute()
      .then((r) => {
        console.log(r);
        execute().then((r) => {
          console.log(r);
        });
      })
      .catch();
  })
  .catch((error) => console.log(error));
const test = async () => {
  try {
    const result = await execute();
    const result2 = await execute();
    const result3 = await execute();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
test();
