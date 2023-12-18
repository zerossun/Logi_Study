// string method

// slice와 splice 비교

const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']; // 배열
const animals1 = 'qwertyuasdf'; // 문자열

function qwerty() {
  // return animals.slice(1, 3); // [ 'bison', 'camel' ]
  return animals.splice(1, 3); //   TypeError: animals1.splice is not a function
}
console.log(qwerty());
console.log(animals);

function qwerty1() {
  //   return animals1.slice(1, 3); // [ 'bison', 'camel', 'duck' ]
  //   return animals1.splice(1, 3); //   TypeError: animals1.splice is not a function
}
console.log(qwerty1());

// slice와 비슷한 string 메서드

// substr(start, index)
// 시작부분에서 부터 index 길이까지 잘라줘라.
const str = 'abcdefghij';
console.log(str.substr(2, 5)); // 'cdefg'

// length 값 생략 시, 첫번째 인자를 시작으로 끝까지 추출
console.log(str.substr(2)); // 'cdefghij'

// 첫번째 인자가 음수로 시작한다면 끝에서부터 시작.
// 문자열 길이보다 값이 크다면 빈문자열 반환
console.log(str.substr(-2, 5)); // 'ij'

// substring(start, end)
// 시작부분부터 끝부분까지 잘라줘라.

console.log(str.substring(2, 5)); // 'cde'

// substr같이 end 값 생략 시, 첫번째 인자를 시작으로 끝까지 추출
console.log(str.substring(2)); // 'cdefghij'

// 음수로 시작하면 0으로 넘겨진 것처럼 작동함. 조심할 요소
console.log(str.substring(-2, 5)); // 'abcde'
