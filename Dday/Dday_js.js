console.log('dayjs', dayjs().format());
//dayjs사용해서 리펙토링
// new 연산자 : 메모리에 저장(올린다.!)
// date 설정
const day = dayjs();
// day.setFullYear(2020);
console.log(day);

// date 값 가져오기
const day1 = dayjs();
const day2 = dayjs().year();

//getTime
console.log(day2);

// // getFullYear
// console.log(day1.getFullYear());
// // getMonth
// const month = day1.getMonth() + 1;
// console.log(month);
// // getDate
// console.log(day1.getDate());

// //// Dday - 순수 자바스크립트
// const Today = document.querySelector('#accent span');
// // 만나 기념일 일수 넣을 값 변수 지정
// const now = new Date();
// // 현재 날짜 지정
// const today = now.getDate();
// // 현재 날짜를 밀리초수로 반환한 변수
// const first = new Date('2023-07-03');
// // 만난 날짜 지정한 변수
// const firstT = first.getTime();
// // 만난 날짜 밀리초수로 반환한 변수
// const toFirst = now - first;
// // 현재 날짜 초수 - 만난 날자 초수
// const FirstDay = `${Math.round(toFirst / (60 * 60 * 1000 * 24))}일`;
// // toFirst초수를 일수로 변경
// Today.innerHTML = FirstDay;
// // 화면에 보이게 함

// function calc(e) {
//   // 중복되는 코드이므로 함수로 지정하여 매개변수로 넣어줌
//   const date = firstT + e * (60 * 60 * 1000 * 24);
//   // 현재 날짜 밀리초 + 지정한 날짜이후 밀리초
//   // 지정한 날짜이후 밀리초 : 지정일 * 24(하루의 시간) * 60(한 시간의 분) * 60(일 분의 초) * 1000(초 => 밀리 초)

//   // 매개변수의 값
//   const dateD = new Date(date);
//   // 더한 밀리초를 날짜로 바꿔줌
//   const year = dateD.getFullYear();
//   // 바꾼 날짜에서 연도값 빼내는 변수
//   const month = dateD.getMonth() + 1;
//   // 바꾼 날짜에서 월값 빼내는 변수
//   const day = dateD.getDate();
//   // getDay()는 요일을 일요일~토요일(0~6) 로 반환하기 때문에 getDay 가 아닌 getDate 호출
//   // getDate() : 날짜 출력, getDay() : 요일 출력(0~6)
//   document.querySelector('#date' + e).innerText =
//     year + '년' + month + '월' + day + '일';
//   // 리턴된 숫자들 html text에 넣어주기
// }

// calc(100);
// calc(200);
// calc(365);
// calc(500);

//// Dday - dayjs();
const Today = document.querySelector('#accent span');
const now = dayjs();
const dday = dayjs('2023-07-03');
const Mday = now - dday;
const calcD = `${Math.round(Mday / (60 * 60 * 1000 * 24))}일`;
console.log(calcD);
Today.innerHTML = calcD;

function calc(e) {
  const dayJ = dayjs().add(e, 'day');
  const dayYear = dayJ.get('year');
  const dayMonth = dayJ.get('month');
  const dayDate = dayJ.get('date');
  document.querySelector('#date' + e).innerText =
    dayYear + '년' + dayMonth + '월' + dayDate + '일';
  console.log(`${dayYear}년 ${dayMonth}월 ${dayDate}일 `);
}
calc(100);
calc(200);
calc(365);
calc(500);
