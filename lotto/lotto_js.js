const result = document.querySelector('#result');
const result1 = document.querySelector('#result1');
const lottoBtn = document.querySelector('#lottoBtn');


const RAN = 'ran';
// random 함수 해석:
// candiate라는 변수에 45개를를 배열해줘라.
// fill(); 그리구 꽉 채워줘.(이러면 undefined로 꽉채워줌.)
// map() : index에 1씩 더해서 다시 값 뽑아줘라
function random() {
  let candiate = Array(45)
  .fill()
  .map((item, index) => {
    return item, index + 1;
  });
  
  
  // console.log(candiate);

  const random = candiate.sort(() => Math.random() - 0.5);
  // 배열 랜덤으로 돌리는 방법
  // 1.배열을 섞는 가장 쉬운방법 : sort();
  // 2. -0.5를 안 붙이면 랜덤이 되지 않음.그리고 놀랍게도 양수만 뱉음 왜??
  // 3. Math.random()은 0보다 크고 1보다 작은 난수를 랜덤하게 생성함.
  // 근데 저기에 -0.5를 하면 양수나 음수를 랜덤하게 뱉음.
  // 양수만 뱉는 이유는 뇌피셜로 내가 candiate에 1~45 양수로 채워서 그럼.
  const bonus = candiate[candiate.length - 1];
  // bonus는 어캐 계산한거지? 이해가 안가네
  // const lastValue = arr[arr.length - 1]; : 이게 배열을 마지막 값을 읽어오는 거인데
  // 오오 그러니까 그거네
  // sort는 원본배열을 변경하니 random변수 내리면 변경된 변수의 마지막 값을 빼오는 거고
  // 다만, 저 화면에 띄워주는 slice 변수에 slice배열을 넣어서 맨 뒤에가 안 보여져 내가 혼란이 온 거였음!
  // 고민 해결!!
const span = document.createElement('span');

  let slice = random.slice(0, 4).sort((a, b) => {
    return a - b;
  });
span.innerText = slice;
  let sliceT = slice.map((slice1) => {
    console.log(slice1);
    // slice1.classList.add('ran');
    return slice1;
  });
  // console.log(slice1);
 
  // sliceT.classList.add('ran');
  // slice 변수 해석:
  // 랜덤배열을 시작부터 4변째 자리 자르는데 sort를 이용해서 순서대로 나열해줘라.
  console.log(slice);
  // let sliceI = document.createElement('span');
  // result.appendChild(sliceI);
  // sliceI = sliceT;
  // console.log(sliceI);

  // console.log(slice[0]);
  console.log('number', slice, 'bonus', bonus);
  console.log(slice[0]);
  // result.innerText = slice;
  result.append(span);
  span.classList.add(RAN);
  result1.innerText = bonus;
  // ballCSS();
}
function hidden(e) {
  result.classList.remove('hidden');
  random();
}

lottoBtn.addEventListener('click', hidden);


