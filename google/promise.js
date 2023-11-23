// promise에서 신경써야 할 것
// 1. state(상태) : 실패했는지, 끝났는지, 무거운지
// 2. producing : 원하는 기능을 제공해주는 사람. / consumer : 기능을 쓰는 사람. =두 사람 견해 이해

// 1. producer
const promise = new Promise((resolve, reject) => {
  // 헤비한 일들을 많이함. 왜냐구? 파일 읽을 때 시간이 꽤 걸러벼림 ex) 네트워크, 파일
  // promise를 만드는 순간 executor(함수 / resolve, reject를 말하는거임.)가 바로 실행됨. !!중요!!
  console.log('doing something....');
  setTimeout(() => {
    resolve('booooooyah'); // 호출이 잘 됐다.
    reject(new Error('nooooooope')); // 호출이 안됐다. // 여기서 Error는 js에서 제공하는 obj중에 하나('무언가 오류가 발생했다.' 알려줌.)
  }, 2000);
});
// 여기서 이제 비동기적인 코드를 다 짜야됨. 될때는 뭐가 나와야 하는지, 안될 때는 뭐가 나와야 하는지.
// resolve = 성공할 때 돌아가야하는 코드 / reject = 실패할 때 돌아가야하는 코드

// 2. consumer: then, catch, finally

promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log('finally');
  });
// 잘 된거 같으니 값을 받아오겠다.
// 여기서 value는 위에 promise 코드가 잘 돌아갈 때 움직이는 resolve를 말하는거임.
// then = 성공해서 나와야 하는 값. / catch = 실패할 때 나와야 하는 값. / finally = 성공, 실패 상관없이 무조건 마지막에 나오는 값.

// 3. promise 연결하기
// 이 작업은 무엇이냐? 서버에서 promise 받아오기라는 작업을 할 것이다.
const fechNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fechNumber
  .then((num) => num * 2) // 받아온 거 2 곱하겠다.
  .then((num) => num * 3) // 받아온 거 3 곱하겠다.
  .then((num) => {
    // 받아온 거를 다른 서버에 보내서 다른 숫자를 받아오겠다.

    return new Promise((resolve, reject) => {
      // 새로운 Promise를 return 할 것이다.
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num)); // 받아온 숫자를 출력할 것이다.

// 4. 오류 처리법

const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('닭'), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(
      () => resolve('닭'),
      () => reject(`${hen} -> 알`),
      1000
    );
  });
const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} -> 계란`), 1000);
  });

getHen()
  .then(getEgg) // <- .then(hen => getItem2(hen));
  .catch((error) => {
    return '달걀';
  }) // 중간에 catch를 넣어서 오류가 난 부분을 찾아보는 게 좋음
  .then(cook) // <- .then(hen => getItem2(hen));
  .then(console.log) // <- .then(hen => getItem2(hen));
  .catch(console.log);
