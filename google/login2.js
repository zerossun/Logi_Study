const LoginForm = document.querySelector('#LoginForm');
const LoginInput = document.querySelector('#LoginForm input:first-child');
const LoginSubmit = document.querySelector('#LoginForm .submit');
const Singin = document.querySelector('#LoginForm button');
const greeting = document.querySelector('#greeting');
const Logout = document.querySelector('#logout');

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
