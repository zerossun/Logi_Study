// 클로저에 관한 아주 훌륭한 예제
// const order = (food) => {
//   console.log(food + '을 주문하였습니다.');
//   return function (drink) {
//     return drink + '을 추가로 주문하였습니다.';
//   };
// };

// const orderBuger = order('햄버거');
// const orderPizza = order('피자');
// console.log(orderBuger('coke'));
// console.log(orderPizza('sprite'));

// 💥그리고 더 좋은 방법💥

const order = (food) => {
  return function (drink) {
    return food + '에 ' + drink + '을 추가로 주문하였습니다.';
  };
};

// 이렇게 바꿔보시면 조금 더 명확하게 보이실 거 같습니다!
// 왜냐하면 현재 코드에서는 order 가 실행되는 순간 food 가 바로 출력되기 때문에
// 해당 food 가 클로저(drink 출력 함수)가 접근할 수 있는 변수인지
// 그냥 order 내에 선언된 변수인지 알기가 어려워서 그렇습니다.
// [2]

// toggle 변수의 마지막을 보시면 () 기호가 있는데 이는 함수를 호출하는 것이고
// 해당 코드에서는 아래 클로저 반환 함수를 익명함수로 바로 실행해서 클로저를
// toggle 에 할당하기 위해 함수 전체에 괄호를 쳐서 실행한 것이라고 보시면 됩니다!

// const order = (food) => {
//   return function (drink) {
//     return food + '에 ' + drink + '을 추가로 주문하였습니다.';
//   };
// };

const orderBuger = order('햄버거');
const orderPizza = order('피자');
console.log(orderBuger('coke'));
console.log(orderPizza('sprite'));

// index.html:34 햄버거을 주문하였습니다.
// index.html:34 피자을 주문하였습니다.
// index.html:42 coke을 추가로 주문하였습니다.
// index.html:43 sprite을 추가로 주문하였습니다.

// 하 왜 결과값이 다른건데 = 각각의 자신만의 환경을 가져 공유하지 않는답니다.

var increase = function (num) {
  return ++num;
};

var decrease = function (num) {
  return --num;
};

var predicates = { increase, decrease };

function makeCounter(predicates) {
  var num = 0;

  return function () {
    num = predicates(num);
    return num;
  };
}

var toggle = function outer() {
  var isShow = false;
  return function closure() {
    box.style.display = isShow ? 'block' : 'none';
    isShow = !isShow;
  };
};
console.log(toggle);
var toggle = (function outer() {
  var isShow = false;
  return function closure() {
    box.style.display = isShow ? 'block' : 'none';
    isShow = !isShow;
  };
})();
console.log(toggle);


//class object


//class
class Person {
  //constructor
  constructor(
    name,age
  ){
    this.name = 'ganada';
    this.age = age;
  }
}
//method
speak(){
console.log(`${this.age}: hello:)`)
}
//object
const ganada = new Person('ellei', 20);
console.log(ganada.age);
console.log(ganada.name);
ganada.speak();
