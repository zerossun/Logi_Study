// const Today = document.querySelector('#accent span');
// const now = new Date();
// const today = now.getDate();
// const first = new Date('2023-07-03');
// const firstT = first.getTime();
// const toFirst = now - first;
// const FirstDay = `${Math.round(toFirst / (60 * 60 * 1000 * 24))}일`;
// Today.innerHTML = FirstDay;

// function calc(e) {
//   const date = firstT + e / (60 * 60 * 1000 * 24);
//   const dateD = new Date(date);
//   const year = dateD.getFullYear();
//   const month = dateD.getMonth();
//   const day = dateD.getDay();
//   document.querySelector('#date' + e).innerText =
//     year + '년' + month + '월' + day + '일';
// }
// calc(100);
// calc(200);
// calc(365);
// calc(500);

function calcModified(dayAdded) {
  // geTime 이 밀리초를 반환하기 때문에
  // 일 수(day)를 밀리초 단위로 환산하기 위해 24(하루의 시간) * 60(한 시간의 분) * 60(일 분의 초) * 1000(초 => 밀리 초) 를 day에 곱해 줌
  const addedMilliseconds =
    todayMilliseconds + dayAdded * (24 * 60 * 60 * 1000);
  // 계산된 밀리초를 가지고 날짜 객체 새로 생성
  const dateAfter = new Date(addedMilliseconds);
  // 연도
  const year = dateAfter.getFullYear();
  // 월 0~11 반환이므로 1을 더해야 실제 달과 같아짐
  const month = dateAfter.getMonth() + 1;
  // getDay()는 요일을 일요일~토요일(0~6) 로 반환하기 때문에 getDay 가 아닌 getDate 호출
  const day = dateAfter.getDate();
  return `${year}-${month}-${day}`;
}
console.log('=============수정본 출력결과=============');
console.log(calcModified(100));
console.log(calcModified(200));
console.log(calcModified(365));
console.log(calcModified(500));
