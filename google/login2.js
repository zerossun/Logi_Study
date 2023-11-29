const LoginForm = document.querySelector('#LoginForm');
const LoginInput = document.querySelector('#LoginForm input:first-child');
const LoginSubmit = document.querySelector('#LoginForm .submit');
const Singin = document.querySelector('#LoginForm button');
const greeting = document.querySelector('#greeting');
const Logout = document.querySelector('#logout');

const Signin_form = document.querySelector('.signin_form');
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
LoginInput.addEventListener('submit', LoginBtn2);
Logout.addEventListener('click', LogOutBtn2);
LoginInput.addEventListener('change', LoginInputChnage);
Singin.addEventListener('click', open);

//form

// const Valid = (input) => {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (re.test(input.value)) {
//     success(input);
//   } else {
//     error(input, 'Email is not valid');
//   }
// };

// const gap = (inputArr) => {
//   inputArr.forEach((input) => {
//     if (input.value === '') {
//       error(input, `${getFieldName(input)}is requrired`);
//     } else {
//       success(input);
//     }
//   });
// };

// const length = (input, min, max) => {
//   if (input.value.length < min) {
//     error(input, `${getFieldName(input)} must be at least ${min} characters`);
//   } else if (input.value.length > max) {
//     error(
//       input,
//       `${getFieldName(input)} must be at less than ${max} characters`
//     );
//   }
// };

//그러면 모든 함수를 유효성 체크로 바꿔서 if문에서 하나라도 false가 뜨면 안되는걸로 바꾸면 되는걸가

// const same = (input1, input2) => {
//   if (input1.value !== input2.value) {
//     error(input2, `Password do not match`);
//   }
// };

// ① 우선 함수 내 hasError 변수는 에러가 있을 때 true 가 되는 변수로 선언해서 수정해보았습니다.
// 초기화 시에는 에러가 없으므로 false 이며 유효성 검사에서 탈락하는 경우 true로 바꿔줘야 합니다.
// ② return 으로 반환한 값은 변수에 저장하거나 함수를 호출한 시점에서 사용해야 합니다.
// 따라서 submit 이벤트 핸들러에서는 함수 실행 후 반환값을 변수에 저장해서 사용하거나
// 조건절에 바로 넣어 사용해야 합니다. 또한 A 함수에서 B 함수 내부의 변수를 참조할 수는 없습니다.
// ③ 코드로 봤을 때는 유효성 검사 실패 시 특정 폼을 숨기는 것 같은데 에러가 하나라도 발생한 상황에서 해당 코드를 실행하기 위해서는 &&(그리고) 연산자가 아닌 ||(또는)   연산자를 사용해야 합니다!
// 아래 코드로 바꿔서 실행해 보시고 다른 점을 하나씩 비교해 보시면 좋을 것 같습니다! 혹시 아래 코드가 실행이 안 되면 말씀해 주세요!

function open() {
  Signin_form.classList.remove(HIDDEN);
  console.log('blah');
}
const error = (input, message) => {
  const qwerty = input.parentElement;
  qwerty.className = 'form-control error';
  const small = qwerty.querySelector('small');
  small.innerText = message;
};
const success = (input) => {
  const qwerty = input.parentElement;
  qwerty.className = 'form-control success';
};
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};
const gap = (inputArr) => {
  let hasError = false;
  inputArr.forEach((input) => {
    const isInvalid = input.value === '';
    if (isInvalid) {
      error(input, `${getFieldName(input)}is requrired`);
      hasError = true;
    } else {
      success(input);
    }
  });
  console.log(hasError);
  return hasError;
};
const Valid = (input) => {
  let hasError = false;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const recheck = re.test(input.value);
  if (recheck) {
    success(input);
  } else {
    hasError = true; // 아래로 2줄 이동
    error(input, 'Email is not valid');
  }
  console.log(hasError);
  return hasError;
};
const length = (input, min, max) => {
  let hasError = true;
  if (input.value.length < min) {
    hasError = true;
    error(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    hasError = true;
    error(
      input,
      `${getFieldName(input)} must be at less than ${max} characters`
    );
  }
  console.log(hasError);
  return hasError;
};
const same = (input1, input2) => {
  let hasError = false;
  const inputVal = input1.value !== input2.value;
  if (inputVal) {
    error(input2, `Password do not match`);
    hasError = true;
  }
  console.log(hasError);
  return hasError;
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const hasGapError = gap([username, email, password, password2]);
  const hasUserNameLengthError = length(username, 8, 15);
  const hasPasswordLengthError = length(password, 6, 25);
  const hasEmailLengthError = Valid(email);
  const hasPasswordNotSameError = same(password, password2);
  if (
    hasGapError ||
    hasUserNameLengthError ||
    hasPasswordLengthError ||
    hasEmailLengthError ||
    hasPasswordNotSameError
  ) {
    Signin_form.classList.remove(HIDDEN);
    console.log('123');
  } else {
    Signin_form.classList.add(HIDDEN);
    console.log('456');
  }
});
