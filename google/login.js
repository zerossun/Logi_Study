const LoginForm = document.querySelector('#LoginForm');
const LoginInput = document.querySelector('#LoginForm input:first-child');
const LoginBtn = document.querySelector('#LoginForm input:last-child');
const greeting = document.querySelector('#greeting');
const LogOut = document.querySelector('#logout');
const LOGIFORM_HIDDEN = 'hidden';
const USERNAME_KEY = 'username';

//이름 제출 버튼
// let yourname1 = LoginInput.value;

function LoginClick(e) {
  e.preventDefault();
  LoginForm.classList.add(LOGIFORM_HIDDEN);
  //
  // let yourname = LoginInput.value;

  // 위의 let 전역변수로 빼서 중복된 부분에 사용하려고 했는데, 되지 않음.
  localStorage.setItem(USERNAME_KEY, LoginInput.value);
  paintGreeting2(LoginInput.value);
  LogOut.classList.remove(LOGIFORM_HIDDEN);
}

function paintGreeting2(name) {
  greeting.innerText = `Hello ${name}`;
  greeting.classList.remove(LOGIFORM_HIDDEN);
}

const GetUserName = localStorage.getItem(USERNAME_KEY);

if (GetUserName === null) {
  LoginForm.classList.remove(LOGIFORM_HIDDEN);
  LoginForm.addEventListener('submit', (e) => LoginClick(e));
} else {
  paintGreeting2(GetUserName);
  LogOut.classList.remove(LOGIFORM_HIDDEN);
}

function LogOutBtn() {
  LoginForm.classList.remove(LOGIFORM_HIDDEN);
  greeting.classList.add(LOGIFORM_HIDDEN);
  LogOut.classList.add(LOGIFORM_HIDDEN);
  localStorage.removeItem(USERNAME_KEY);
  LoginInput.value = '';
  // yourname1 = "";
}

function Yourname1(e) {
  console.log(e);
  LoginInput.value = e.target.value;
}

LogOut.addEventListener('click', LogOutBtn);

LoginInput.addEventListener('change', Yourname1);

class qwe {
  constructor(color) {
    this.color = color;
  }
}
const boo = new qwe('rty');
console.log(boo.qwe);
