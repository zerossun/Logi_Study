const LoginForm = document.querySelector('#LoginForm');
const LoginInput = document.querySelector('#LoginForm input:first-child');
const LoginSubmit = document.querySelector('#LoginForm .submit');
const Singin = document.querySelector('#LoginForm button');
const greeting = document.querySelector('#greeting');
const Logout = document.querySelector('#logout');

const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

const HIDDEN = 'hidden';

function LoginBtn2(e) {
  e.preventDefault();
  LoginForm.classList.add(HIDDEN);
  LoginInput.classList.add(HIDDEN);
  LoginSubmit.classList.add(HIDDEN);
  Singin.classList.add(HIDDEN);
  localStorage.setItem('username', LoginInput.value);
  Logout.classList.remove(HIDDEN);
  Greet(LoginInput.value);
}
function LoginInputChnage(e) {
  console.log(e.value);
  LoginInput.value = e.target.value;
}

function Greet(name) {
  greeting.innerText = `hello ${name}`;
  greeting.classList.remove(HIDDEN);
}

function LogOutBtn2() {
  localStorage.removeItem('username');
  greeting.classList.add(HIDDEN);
  LoginInput.value = '';
  Logout.classList.add(HIDDEN);
  LoginForm.classList.remove(HIDDEN);

  LoginInput.classList.remove(HIDDEN);
}

const setItem2 = localStorage.getItem('username');

if (setItem2 === null) {
  greeting.classList.add(HIDDEN);
} else {
  Greet(setItem2);
  LoginForm.classList.add(HIDDEN);
  console.log('hjkl');
  Logout.classList.remove(HIDDEN);
}
LoginForm.addEventListener('submit', LoginBtn2);
Logout.addEventListener('click', LogOutBtn2);
LoginInput.addEventListener('change', LoginInputChnage);

// // form

// // Show input error message
// const error = (input, message) => {
//   const formInput = input.parentElement;
//   formInput.className = 'form-control error';
//   const small = formInput.querySelector('small');
//   small.innerText = message;
// };

// // Show success outline
// const success = (input) => {
//   const formInput = input.parentElement;
//   formInput.className = 'form-control success';
// };

// //Check email is valid
// const isValidEmail = (email) => {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (re.test(email.value)) {
//     success(email);
//   } else {
//     error(email, 'Email is not valid');
//   }
// };

// // Q. Get field name = 얜 뭐하는 기능이지..?
// //    input.id.charAt(0).toUpperCase() : input.id의 첫번째를 대문자로 바꿔주거라
// //    input.id.slice(1) : input.id의 첫번째부터 잘라서 보여줘라 이것도 알겠음.
// //    고로 첫글자를 대문자로 바꿔서 둘이 붙이라는 거 같은데, 이 기능을 왜 넣어야 하는거지?
// // Q. input.id는 변수의 id를 뜻하는거임.
// //    고로, id="password2"이거니 첫번째 p는 P로 나머지는 그냥 붙여주겠다라는 코드!!
// const getFieldName = (input) => {
//   return input.id.charAt(0).toUpperCase() + input.id.slice(1);
// };

// // Check required fields
// const checkRequired = (inputArr) => {
//   inputArr.forEach((input) => {
//     if (input.value.trim() === '') {
//       error(input, `${getFieldName(input)} is requrired `);
//     } else {
//       success(input);
//     }
//   });
// };

// // Check input length
// const checkLength = (input, min, max) => {
//   if (input.value.length < min) {
//     error(input, `${getFieldName(input)} must be at least ${min} characters`);
//   } else if (input.value.length > max) {
//     error(
//       input,
//       `${getFieldName(input)} must be at less than ${max} characters`
//     );
//   }
// };
// //check passwords match
// const checkPasswordsMatch = (input1, input2) => {
//   if (input1.value !== input2.value) {
//     error(input2, 'Password do not match');
//   }
// };

// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   checkRequired([username, email, password, password2]);
//   checkLength(username, 8, 15);
//   checkLength(password, 6, 25);
//   isValidEmail(email);
//   checkPasswordsMatch(password, password2);
// });
// // form

// 유효성 검사 연습1
// 1. 오류가 났을 때 어떻게 나와야 하는가.
// 1-1. 오류가 났을 때 하단에 어떤 문구가 나와야 하는가
// 1-2. 각각 오류문구에 해당 이름을 어떻게 넣어야 하는가
// 2. 성공했을 때 어떻게 나와야 하는가.
// 3-1. username 유효성은 무엇인가.
// 3-2. email의 유효성은 무엇인가.
// 3-3. password의 유효성은 무엇인가.
// 3-4. password의 유효성은 무엇인가.
// 3-5. password2의 유효성은 무엇인가.
// 4. 어디에 기능을 넣을것인가.

const error = (input) => {
  const qwerty = input.parentElement;
};
