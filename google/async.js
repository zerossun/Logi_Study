// 1. async
function fetchUser() {
  // 일단 10초 후에 네트워크를 받아온다고 칩시다.
  return 'qwerty';
}
const user = fetchUser();
console.log(user);

// promise로 작업했을 때
function fetchUser1() {
  return new Promise((resolve, reject) => {
    resolve('qwerty1');
  });
}
const user1 = fetchUser1();
user1.then(console.log);

//async로 작업했을 때
async function fetchUser2() {
  return 'qwerty2';
}
const user2 = fetchUser();
user2.then(console.log);

// =================================================

//await

// 1. promise로 작업했을 때
function getBanana() {
  return delay(3000).then(() => 'good');
}

// 2, async로 작업했을 때
async function getBanana() {
  await delay(3000); //3초 간 기다려줘
  return 'gooood'; // 그리고 이제 보여줘
}

// ===================================================
// await 을 사용하는 이유
// - 콜백지옥을 벋어날 수 있음.

async function getapple() {
  await delay(1000);
  return 'apple';
}

async function getmango() {
  await delay(1000);
  return 'mango';
}

function pickFurit() {
  return getapple().then((apple) => {
    return getBanana().then((banana) => `${apple} + ${banana}`);
  });
} // 이것이 바로 콜백지옥
pickFurit().then(console.log);

async function pickFurit() {
  //   try {
  // 이런 방식으로 넣으면 각각 계산해도 될 것을 1초 기다렸다 mango불러야 되는 시간낭비가 초래됨
  //     const apple = await getapple();
  //     const mango = await getmango();
  //   } catch {
  //     // promise의 catch역할
  //     console.log('qwer');
  //   }
  // return `${apple} + ${mango}`;

  // 이 방식으로 하면 각각 할 수 있는데 조금 더럽다.
  const applePromise = getapple(); // promise를 만드는 순간, promise 코드 블록 실행
  const mangoPromise = getmango();
  const apple = await applePromise;
  const mango = await mangoPromise;
  return `${apple} + ${mango}`;
}

// 그래서 사용되는 promise api

//전체 전달.
function pickAllFruits() {
  // promise배열을 전달하게 되면 모든 promise들을 병렬적으로 다 받을때까지 모아줌.
  return Promise.all([getapple(), getBanana()]).then((fruits) =>
    fruits.join(' + ')
  );
}
pickAllFruits().then(console.log);

//하나만 전달.
function pickOnlyOne() {
  return Promise.race([getapple(), getmango()]);
}
pickOnlyOne().then(console.log);
