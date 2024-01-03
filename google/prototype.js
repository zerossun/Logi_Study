/////////////
//prototype

// let abc = 'abc';
// console.log(abc.constructor);

// String.prototype.measure = function () {
//   return this.length;
// };

// console.log('abcccc'.measure());

// let student = {
//   name: 'lee',
//   score: 90,
// };

// console.log(student.hasOwnProperty('name'));
// console.dir(student);

// console.log(student.__proto__ === Object.prototype);

// function Person(name) {
//   this.name = name;
// }

// var foo = new Person('lee');
// console.dir(Person);
// // console.fir(foo);

// console.log(Person.__proto__ === Function.prototype);
// console.log(Person.prototype === foo.__proto__);

// function Person(name){
//   this.name = name;
// }
// console.log(Person.prototype.constructor === Person);
// console.log(foo.constructor == Person);
// console.log(Person.constructor === Function);

// prtotype 이란? 값을 공유해서 사용함
// 함수를 정의하는 방식
// 1. 함수선언식
// 2. 함수표현식
// 3. Function(); 생성자 함수
// 프로토타입은 읽기 전용임. => 프로퍼티를 읽을 때만 사용 가능

// 다시금 정리 프로토타입 : 자식에게 상속하는 것.
// 프로토타입 체인 : 맞는 정보가 있을 때까지 조상의 조상까지 뒤져서 정보를 가져온다.

function Person() {}
Person.prototype.eyes = 2;
Person.prototype.nose = 1;
let kim = new Person();
let park = new Person();
console.log(kim.eyes);
console.log(park.eyes);

function Person() {} // 함수
let personObject = new Person(); // 함수를 객체로 생성

let obj = {}; // let obj = new Object();

let square = function (number) {
  return number * number;
};

function Person1(name) {
  this.name = name;
}

let foo1 = new Person1('lee');

console.dir(Person1);
console.dir(foo1);

Person1.prototype = { gender: 'male' };
let bar = new Person1('kim');

console.log(bar.gender);

function Person2(name) {
  this.name = name;
}

Person2.prototype.gender = 'male';

let foo = new Person2('lee');
let bar1 = new Person2('kim');

console.log(foo.gender);
console.log(bar1.gender);

/////////////////////////////////////////////////////////////////////////////////

// __proto__용 getter·setter
let animal = {
  eats: false,
  walk() {
    console.log('동물은 걷는다.');
  },
};
let rabbit = {
  jumps: true,
  name: '하얀토끼',
  __proto__: animal, // 메서드 walk는 rabbit의 프로토타입인 animal에서 상속을 받음
};

console.log(rabbit.eats);
console.log(rabbit.jumps);
rabbit.walk();

let longEar = {
  earLength: 10,
  __proto__: rabbit,
};

longEar.walk();
console.log(longEar.jumps);
//

let user = {
  name2: 'john',
  surname: 'smith',

  set fullName1(value) {
    [this.name, this.surname] = value.split('');
  },
  get fullName1() {
    return `${this.name2} ${this.surname}`;
  },
};
let admin = {
  __proto__: user,
  isAdmin: true,
};

console.log(admin.fullName1);
admin.fullName1 = 'Alice Cooper';
console.log(admin.fullName1);
console.log(user.fullName1);

let animal1 = {
  walk1() {
    if (!this.isSleeping) {
      console.log(`동물이 걸어갑니다.`);
    }
  },
  sleep() {
    this.isSleeping = true;
  },
};

// rabbit에 새로운 프로퍼티 isSleeping을 추가하고 그 값을 true로 변경

console.log(rabbit.isSleeping);
console.log(animal.isSleeping); // 하기싫으니까 이제 머리가 어지럽군

for (let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    console.log(`객체 자신의 프로퍼티 : ${prop}`);
  } else {
    console.log(`상속 프로퍼티 : ${prop}`);
  }
}

//문제 1
let head = {
  glasses: 1,
};

let table = {
  pen: 3,
  __proto__: head,
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
};

let pockets = {
  money: 2000,
  __proto__: bed,
};
// console.log(pockets.pen);
// console.log(bed.glasses);
// console.log(pockets.glasses);
// console.log(head.glasses);

// 문제2
let animal3 = {
  eat() {
    this.full = true; // this =  rabbit.eat()은 rabbit을 변경함.
  },
};
// 프로퍼티를 찾는 것과 실행하는 것은 완전히 다른 일(찾기 곳: animal / 실행하는 곳 : rabbit3)
let rabbit3 = {
  __proto__: animal3,
};

rabbit3.eat();

// 문제3
// speedy,lazy라는 햄스터가 있다. 한명만 먹이를 줘도(speedy.eat('apple');) 둘 다 먹게된다. 이 때 한명만 먹게 할 수 있는 방법은?
let hamster = {
  stomach: [],

  eat(food) {
    // this.stomach.push(food);
    // this.stomach.push()를 실행하려면 프로퍼티 stomach을 찾아서 여기에 push를 호출해야 됨. 하지만 speedy에는 없기 때문에,
    // 부모인 hamster 에 있음. 그래서 모든 햄스터들이 stoamch를 공유하여 전체에 뿌려버림.
    this.stomach = [food]; // 방법2 : this.stomach=를 이용하여 데이터 할당
  },
};

let speedy = {
  __proto__: hamster, // hamster라는 상속을 받음
  //   stomach: [], //방법1 : 각자 stomach를 가지게 함
};
let lazy = {
  __proto__: hamster,
  //   stomach: [], //방법1 : 각자 stomach를 가지게 함
};
speedy.eat('apple');
console.log(speedy.stomach);
console.log(lazy.stomach);

/// 내장 객체의 프로토타입
let obj1 = {};
console.log(obj1);
console.log(obj1.__proto__ === Object.prototype);
console.log(obj1.toString === obj.__proto__.toString);
console.log(obj1.toString === Object.prototype.toString);

// const car = {
//   wheels: 4,
//   drive() {
//     console.log('drive...');
//   },
// };

const Bmw = function (color) {
  //   this.color = color;

  //이것이 클로저
  this.getColor = function () {
    console.log('c');
  };
};

// 드러운 꼴 못 본다. 깔끔히 정리하는 법
//__proto__ 이거랑 기능은 같음 / 생성하는 함수가 생성하는 객체에 __proto__(==prototype)으로 설정한다는 뜻
// Bmw.prototype.wheels = 4;
// Bmw.prototype.drive = function () {
//   console.log('drive...');
// };
// Bmw.prototype.navigation = 1;
// Bmw.prototype.stop = function () {
//   console.log('what?');
// };

// 아이구 깔끔하고 보기좋아
Bmw.prototype = {
  wheels: 4,
  navigation: 1,
  drive() {
    console.log('drive...');
  },
  stop() {
    console.log('what?');
  },
};

const x5 = new Bmw('red');
const z4 = new Bmw('blue');
// 색상 마음대로 바꾸지 말라구...!! = > 클로저 사용하면 되겠습니다.
// x5.color = 'black';

// 굳이 이렇게 귀찮게 하지말고
// x5.__proto__ = car;
// z4.__proto__ = car;

console.log(x5.color);
console.log(z4.drive());
console.log(z4.navigation);
console.log(z4.stop());

console.log(z4 instanceof Bmw);
console.log(z4.contructor == Bmw);

//////
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(this.name);
  }
}

let user2 = new User('john');
user2.sayHi();

class User2 {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    alert(this.name);
  }
}
console.dir(typeof User2);

class User3 {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 4) {
      console.log('');
    }
  }
}
