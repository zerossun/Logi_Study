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

// 클릭하면 폼이 나오게
function open() {
  Signin_form.classList.remove(HIDDEN);
}

// 에러 시 1.input border 빨갛게, 2. 하단 에러메시지 나오는 기능 지정
const error = (input, message) => {
  // 매개변수의 부모를 qwerty로 지정
  const qwerty = input.parentElement;
  // qwerty에 error값 설정
  qwerty.className = 'form-control error';
  // qwerty의 <small> 지정
  const small = qwerty.querySelector('small');
  // small에 매개변수 message값 추가
  small.innerText = message;
};

// 성공 시 1. input border 파랗게
// 위의 에러와 동일
const success = (input) => {
  const qwerty = input.parentElement;
  qwerty.className = 'form-control success';
};

// 에러 시 나오는 문구의 첫글자 대문자로 만드는 기능
// charAt()을 이용하여 반환된 첫번째 글자엔 대문자 + 제외한 나머지 글자 붙여주기 
const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// input이 공백일 때 공백임을 알려주는 문구가 나오는 기능
const gap = (inputArr) => {
  // hasError : 에러가 있을 때 true 가 되는 변수
  let hasError = false;
  // forEach를 사용하여 값 뽑아냄.
  inputArr.forEach((input) => {
    // value의 값이 빈것을 변수로 지정하여
    const isInvalid = input.value === '';
    // if문을 돌려 true일 시에는 error 함수가 실행되게 아닐 시에는 success 함수게 실행되게
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

// 이메일 유효성 검사 
const Valid = (input) => {
  let hasError = false;
  // 유효성 검사 코드 변수로 지정 후 test(); 를 이용하여 boolean값 반환
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const recheck = re.test(input.value);
  // if문을 이용하여 recheck가 true 라면 success, 아닐 시 error
  if (recheck) {
    success(input);
  } else {
    hasError = true; // 아래로 2줄 이동
    error(input, 'Email is not valid');
  }
  console.log(hasError);
  return hasError;
};

// 텍스트 길이 검사
// 위와 동일
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

// 비밀번호 값이 동일한지에 관한 검사
const same = (input1, input2) => {
  let hasError = false;
  // value값이 다르다 라는 값을 변수로 지정하여 if문 돌리기. true라면 error함수 실행
  const inputVal = input1.value !== input2.value;
  if (inputVal) {
    error(input2, `Password do not match`);
    hasError = true;
  }
  console.log(hasError);
  return hasError;
};

// 폼 제출 시 기능 실행
form.addEventListener('submit', (e) => {
  e.preventDefault();
// 함수에서 다른 함수의 변수를 참조할 수 없으므로, 함수 실행 후 반환 값 변수로 지정.
// if문을 이용하여 에러가 하나라도 났을 때 해당코드 실행을 위해 ||(or) 연산자 사용
// && 사용하면 모든 닶 else로 나옴.
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
