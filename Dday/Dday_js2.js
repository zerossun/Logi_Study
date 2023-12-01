function calcModified(dayAdded) {
  const first = new Date('2023-07-03');
  const todayMilliseconds = first.getTime();
  // geTime 이 밀리초를 반환하기 때문에
  // 일 수(day)를 밀리초 단위로 환산하기 위해 24(하루의 시간) * 60(한 시간의 분) * 60(일 분의 초) * 1000(초 => 밀리 초) 를 day에 곱해 줌
  // 현재 날짜 밀리초 + 지정한 날짜이후 밀리초
  const addedMilliseconds =
    todayMilliseconds + dayAdded * (24 * 60 * 60 * 1000);
  // 계산된 밀리초를 가지고 날짜 객체 새로 생성
  const dateAfter = new Date(addedMilliseconds);
  // 더한 밀리초를 날짜로 바꿔줌
  console.log(dateAfter); // 결과값 : Fri Jan 19 2024 09:00:00 GMT+0900 (한국 표준시)
  // 바꾼 날짜에서 연도값 빼내는 변수
  const year = dateAfter.getFullYear();
  // 바꾼 날짜에서 월값 빼내는 변수
  // 월 0~11 반환이므로 1을 더해야 실제 달과 같아짐
  const month = dateAfter.getMonth() + 1;
  // getDay()는 요일을 일요일~토요일(0~6) 로 반환하기 때문에 getDay 가 아닌 getDate 호출
  // getDate() : 날짜 출력, getDay() : 요일 출력(0~6)
  const day = dateAfter.getDate();
  return `${year}-${month}-${day}`;
}
document.querySelector('#date100').innerText = calcModified(100);
document.querySelector('#date200').innerText = calcModified(200);
document.querySelector('#date365').innerText = calcModified(365);
document.querySelector('#date500').innerText = calcModified(500);
