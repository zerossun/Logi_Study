// function random() {
//   const random = candiate.sort(() => Math.random() - 0.5);

//   let slice = random.slice(0, 4).sort((a, b) => {
//     return a - b;
//   });

// 넣고 싶은 공통적인 기능.
// 값 하나씩 span에 넣고 css 값을 주고 싶음.
// 1. map 으로 배열 만들어 하나씩 빼서 span 값에 넣어주려함. 근데 배열 어캐빼야할지를 모름
// -> 근데 아무리 생각해도 얘로 할 수 있을 거 같은데 말이지
// 2. forEach로 로 하나씩 받기. 근데 얘는 반환값이 없자너. forEach 안에 innerText 넣어버림.
// -> 화면에 불러오는 거까지함. 근데 맨 뒷자리만 불러와짐 왜 이러지??
// 3. for문으로 돌리기. 근데 변수로 어캐만드는걸까 => 이게 정답이었네 근데 왜 되는걸까

// 내 예상 -  forEach,map이 마지막 배열 값만 나오는 이유 : 반복되는 값을 안주었기 때문,
// 값 그 자체가 들어가서 박스는 하나이니 마지막 것만 들어가지 않았을가.
// 이러한 문제로 span 값을 각각 지정하려고 했으나 그렇게 되면 span변수를 4개를 만들어야 되서
// 식이 더 복잡해질 거 같아서 포기

// 궁극적으로 내가 궁금한 것
// forEach.slice1에 각각 css를 주고 빼내고 싶다.
// map 배열을 각각 빼고 싶다.

// slice.forEach((slice1) => {
//   console.log(slice1);
//   result.innerHTML = slice1;
// });

// 저 위에가 아닌 아래처럼 되어야 함
// const slidedd = [];
// slice.forEach((ele)=> {
//   slidedd.push(ele);
// }
// );

// const forEachResult = [];
// sliced.forEach((value) => {
//   forEachResult.push(value);
//   // result.innerHTML = value;
// });

// 아니 얜 뭔데 되는거야..?
// 아니 for랑 foreach의 차이가 뭐죠
// for : 동기 방식 - 오류나면 오류가 난 위치 이후 작업 동작하지 않고 멈춤
// forEach : 비동기 방식 - 오류가 나도 멈추지 않고 동작 => 콜백함수를 뿌리기 때문
// forEach 장점 : 복잡한 반복문에 적합, for문 보다 수행 속도가 빠름
// ..단점 : 1. 배열이나 리스트값 수정 불가. 오직 일기 전용으로 불러오기만 하기 때문.
// 2. 배열을 역순으로 탐색 불가

//   //반복문 설명
//   for (let i = 0; i < slice.length; i++) {
//     // slice배열 수만큼 반복
//     setTimeout(function callack() {
//       // setTimeout : 일정 시간 지난 후 함수 호출
//       let span = document.createElement('span');
//       // span 변수 지정, 및 css 추가
//       span.classList.add(RAN);
//       //span.innerText 값 지정
//       span.innerText = slice[i];
//       // 자식으로 지정
//       result.append(span);
//       // 일정 시간 지정
//     }, (i + 1) * 1000);
//   }

//   console.log('number', slice, 'bonus', bonus);
// }

// // 숨기기능 없애줌.
// function hidden() {
//   result.classList.remove('hidden');
//   random();
// }

// function bonusB() {
//   const bonus = candiate[candiate.length - 1];
//   result1.classList.add(RAN);
//   result1.innerText = bonus;
// }

// function random() {
//   let candiate = Array(45)
//     .fill()
//     .map((item, index) => {
//       return item, index + 1;
//     });
// random 함수 해석:
// candiate라는 변수에 45개를를 배열해줘라.
// fill(); 그리구 꽉 채워줘.(이러면 undefined로 꽉채워줌.)
// map() : index에 1씩 더해서 다시 값 뽑아줘라

// const random = candiate.sort(() => Math.random() - 0.5);
// 배열 랜덤으로 돌리는 방법
// 1.배열을 섞는 가장 쉬운방법 : sort();
// 2. -0.5를 안 붙이면 랜덤이 되지 않음.그리고 놀랍게도 양수만 뱉음 왜??
// 3. Math.random()은 0보다 크고 1보다 작은 난수를 랜덤하게 생성함.
// 근데 저기에 -0.5를 하면 양수나 음수를 랜덤하게 뱉음.
// 양수만 뱉는 이유는 뇌피셜로 내가 candiate에 1~45 양수로 채워서 그럼.

// const bonus = candiate[candiate.length - 1];
// bonus는 어캐 계산한거지? 이해가 안가네
// const lastValue = arr[arr.length - 1]; : 이게 배열을 마지막 값을 읽어오는 거인데
// 오오 그러니까 그거네
// sort는 원본배열을 변경하니 random변수 내리면 변경된 변수의 마지막 값을 빼오는 거고
// 다만, 저 화면에 띄워주는 slice 변수에 slice배열을 넣어서 맨 뒤에가 안 보여져 내가 혼란이 온 거였음!
// 고민 해결!!

// slice 변수 해석:
// 랜덤배열을 시작 부터 4변째 자리 자르는데 sort를 이용해서 순서대로 나열해줘라.

/// 선임님 방식과 내 방식 비교

// const createSpan = (value, index) => {
//   const RAN = 'ran';
//   setTimeout(function callack() {
//     let span = document.createElement('span');
//     span.classList.add(RAN);
//     span.innerText = value;
//     result.append(span);
//   }, (index + 1) * 1000);
// };

// 내가 사용한 방법
// setTimeout 함수를 밖으로 빼는 편이 더 나았음.
// 새로운 함수를 만들고 setTimeout 내에 value, input 값을 박아 넣는 게 관리 더 용이

// function random() {
//   const random = candiate.sort(() => Math.random() - 0.5);

//   let slice = random.slice(0, 4).sort((a, b) => {
//     return a - b;
//   });
//   for (let i = 0; i < slice.length; i++) {
//     // slice배열 수만큼 반복
//     setTimeout(function callack() {
//       // setTimeout : 일정 시간 지난 후 함수 호출
//       let span = document.createElement('span');
//       // span 변수 지정, 및 css 추가
//       span.classList.add(RAN);
//       //span.innerText 값 지정
//       span.innerText = slice[i];
//       // 자식으로 지정
//       result.append(span);
//       // 일정 시간 지정
//     }, (i + 1) * 1000);
//   }

//   console.log('number', slice, 'bonus', bonus);
// }

// 배열을 익명함수로 빼버리고
// const getCandidates = () =>
//   Array(45)
//     .fill()
//     .map((item, index) => {
//       return item, index + 1;
//     });

// 나는 매개변수로 뺐지만 익명함수로 여러 곳에 불러왔어야 함.
// let candiate = Array(45)
//   .fill()
//   .map((item, index) => {
//     return item, index + 1;
//   });

// 사용 함수
// function random() {
//   let candiates = getCandidates();
//   const random = candiates.sort(() => Math.random() - 0.5);
//   const bonus = candiates[candiates.length - 1];
//   let sliced = random.slice(0, 4).sort((a, b) => {
//     return a - b;
//   });

// 선임님이 수정해주신 forEach 메서드
// const forEachResult = [];
// sliced.forEach((value) => {
//   forEachResult.push(value);
//   // result.innerHTML = value;
// });
// console.log('forEach 결과', forEachResult);
// 선임님 콘솔 값 : forEach 결과 (4) [7, 21, 22, 37]
// 빈 변수를 만들어 push메소드를 만들어 배열안에 값을 넣었음.
// 보통 핸들링 한 값 쓸 때 배열 선언해서 거기에 값을 담기 때문

// 내가 사용한 forEach 메서드
// slice.forEach((slice1) => {
//   console.log(slice1);
//   result.innerHTML = slice1;
// });
// 내 콘솔 값 : 각각의 값을 반환했음.

// map 메서드
// const mapResult = sliced.map((value) => {
//   // result.innerHTML = slice1;
//   return value;
// });
// console.log('map 결과', mapResult);
// for문
// for (let i = 0; i < sliced.length; i++) {
//   createSpan(sliced[i], i);
// }

// Q. forEach.slice1에  다른 메소드를 붙여 반환값을 받을 수 있는 방법이 없나요?
// A. 보통 forEach 에서 핸들링한 값을 쓸 때는 배열을 선언해서 거기에 값을 담곤 하는데
//    이런 경우는 대부분 map 을 쓰는 게 효율적인 방법
// Q. map 반환받은 배열을 각각 빼낼 수 있는 방법이 없을까요?
// A. map 에서 반환받은 배열을 각각 빼내려면 다시 순환을 해야 하는데 그 전에 처리하는 게 좋음

//////////////////////////////////////

const result = document.querySelector('#result');
const result1 = document.querySelector('#result1');
const lottoBtn = document.querySelector('#lottoBtn');
const bonusBtn = document.querySelector('#bonusBtn');

const RAN = 'ran';
// 45개의 배열 중 4개를 추려 각각의 값으로 뿌려줌
const candiates1 = () =>
  Array(45)
    .fill()
    .map((item, index) => {
      return item, index + 1;
    });

// value index 파라미터로 지정 후
const set = (value, index) => {
  //곱한 수 만큼 콜백해줘라
  setTimeout(function callack() {
    // span 변수 추가 후 css 추가
    let span = document.createElement('span');
    span.classList.add(RAN);
    // span 텍스트 value 값으로 지정
    span.innerText = value;
    // 결과변수에 span 자식으로 추가
    result.append(span);
  }, (index + 1) * 1000);
};

// 랜덤함수 기능 제작
function random() {
  // 45개 배열 함수 변수로 지정
  const candiate = candiates1();
  const random = candiate.sort(() => Math.random() - 0.5);
  // 배열 랜덤으로 돌리는 방법
  // 1.배열을 섞는 가장 쉬운방법 : sort();
  // sort() : 배열의 요소를 문자열 순서로 정렬(매개변수 있을시에는 그에 맞게 정렬 / 반환값 새로 정렬됨.)
  // 2. 뒤에 -0.5를 붙이는 이유
  // 3. Math.random()은 0보다 크고 1보다 작은 난수를 랜덤하게 생성함.
  // 근데 저기에 -0.5를 하면 양수나 음수를 랜덤하게 뱉음.
  let slice = random.slice(0, 4).sort((a, b) => {
    //반한되어진 값 sort로 차례대로 정렬 후 앞에 4자리만 자르기
    return a - b;
  });
  // slice 배열의 수만큼 반복하여,
  for (let i = 0; i < slice.length; i++) {
    // set함수의 기능 붙여주기 -> css 붙이기
    set(slice[i], i);
  }
}

// for를 사용안하기 위한 노력
// 원계획 : 각 배열값을 slice1로 지정하여 각각에 css를 주고 싶었다.

// forEach
// 내가 사용한 forEach 메서드
// slice.forEach((slice1) => {
//   console.log(slice1);
//   result.innerHTML = slice1;
// });
// 내 콘솔 값 : 마지막 값만 반환.

// 선임님이 수정해주신 forEach 메서드
// const forEachResult = [];
// sliced.forEach((value) => {
//   forEachResult.push(value);
// });
// console.log('forEach 결과', forEachResult);
// 선임님 콘솔 값 : forEach 결과 (4) [7, 21, 22, 37]
// 빈 변수를 만들어 push메소드를 만들어 배열안에 값을 넣었음.
// 보통 핸들링한 값 쓸 때 배열 선언해서 거기에 값을 담기 때문

// map

// 내가 사용한 map 메서드
// slice.map((slice1) => {
//   result.innerHTML = slice1;
//   return slice;
// });
// console.log(slice);
// 내 콘솔 값 : 마지막 값만 반환.

// map 메서드
// const mapResult = sliced.map((value) => {
//   // result.innerHTML = slice1;
//   return value;
// });
// console.log('map 결과', mapResult);
// forEach, map 모두 마지막 결과 값만 나오는 이유.
// for 문은 span태그를 만들어 result의 자식으로 들어가지만, forEach , map는 값을
// 계속 할당하여 마지막 값만 적용.

// 로또 버튼 클릭 시 이벤트 리스너 기능
function hidden() {
  result.classList.remove('hidden');
  random();
}
// 보너스 버튼 클릭 시 이벤트 리스너 기능
function bonusB() {
  // 배열 다시 지정 후
  const candiate = candiates1();
  // 배열 마지막 수를 변수로 지정
  const bonus = candiate[candiate.length - 1];
  // css 추가
  result1.classList.add(RAN);
  // 텍스트 삽입
  result1.innerText = bonus;
}

lottoBtn.addEventListener('click', hidden);
bonusBtn.addEventListener('click', bonusB);
