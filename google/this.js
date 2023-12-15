// 객체지향
// 젤 중요한 것 : 상속!!
// 함수 추가 가능
// 단점 : 설계와 구조를 바꿔야 하는 데 시간이 오래걸리지만
// 장점 : 데이터 관리 쉬워짐.
let name = 'SAMSUNG STORE';
// 이런 방식이이면 밑도 끝도 없음. 그래서 나온게 class
// let tv1 = {
//   name: 'tv1',
//   price: 200,
//   size: '56inch',
// };
// let tv2 = {
//   name: 'tv2',
//   price: 500,
//   size: '24inch',
// };

//추상화
// 장점 : 매번 안 써도 됨.
// 나를 상속한 게 누군지(같은 제품군에 있는 게 누군지)관리 용이
// 추가시 product에만 넣어주면 되기에 수정 용이

class Product {
  name = '';
  price = 0;
  // 부모 먼저 초기화 시켜주고!
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  // 캡슐화
  // 오 이게 getter
  getPrice() {
    return this.price + '만원';
  }
  // 이게 setter
  setPrice(price) {
    if (price < 0) {
      throw new error('nooooooope');
    }
    this.price = price;
  }
}

// class = '작업지시서' 라고 생각
// 기본 of 기본
// class TV {
//   size = '';
//   name = '';
//   price = 0;
//   // 클레스에 있는 속성들에 값을 초기화 시켜주는 함수 : constructor(생성자)
//   constructor(name, price, size) {
//     this.name = name; // 여기 클레스 안에 있는 name이다. 다른 name 아니다. = this.name
//     this.price = price;
//     this.size = size;
//   }
// }

// 상속(extends Product)
class TV extends Product {
  size = '';
  constructor(name, price, size) {
    super(name, price); // super : 상위 클래스를 부름.(부모 부름)
    price = this.price;
    // 자식이 가지고 있는 개인 속성은 알아서 초기화
    size = this.size;
  }
}

// 새로운 걸 만들어달라! = new
let tv1 = new TV('tv1', 200, '56inch');
let tv2 = new TV('tv2', 500, '24inch');
tv1.setPrice(1000);
console.log(tv1.getPrice(), tv2);

// 근데 내가 tv말고 새로운 걸 만들고 싶다. 그런데 세상에 name과 price가 겹쳐.
// 이거 이대로 두고 볼거야? 일 두번 해야 하는데?
class AC extends Product {}

// this는 함수가 호출될 때 결정이 된다.
// 화살표 함수의 this는 함수가 속해있는 곳의 상휘 this를 계승 받음.
const car = {
  name: 'KIA',
  getName: function () {
    console.log('car getName', this);
  },
};
// car.getName(); // a,b가 부른 형태

const globalCar = car.getName;
globalCar(); // window가 b를 부름

const car2 = {
  name: 'hyundai',
  getName: car.getName,
};
// car2.getName();
const bindGetName = car2.getName.bind(car);
bindGetName();

// .bind : this값 고정

const testCar = {
  name: 'benz',
  getName: function () {
    console.log('getname', this); // name: benz
    const innerFunc = () => {
      console.log('innerFunc', this); //function(){} : indow 객체 호출 /화살표 함수 : name: benz
    };
    innerFunc();
  },
};
testCar.getName();

const ageTest = {
  unit: '살',
  ageList: [10, 20, 30],
  getAgeList: function () {
    const result = this.ageList.map(function (age) {
      return age;
    });
    console.log(result);
  },
};
ageTest.getAgeList();

// this를 쓰고 싶을 때 어캐 써야 함?
// this를 쓰고 싶을 때 일반함수를 써라. .bind로 원하는 함수 지정할 수 있음
// 함수 안에 있는 함수같은 경우 같은 this를 쓴다면 화살표함수 사용

let apple = '독이 든 사과';
let home = {
  apple: '맛있는 사과',
  eatApple: eatAppleFn,
};
function eatAppleFn() {
  console;
}
