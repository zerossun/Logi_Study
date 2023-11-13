
const LoginForm = document.querySelector("#LoginForm")
const loginInput = document.querySelector("#LoginForm input:first-child");
const greeting = document.querySelector(".greeting");

const HIDDEN_CLASSLIST = "hidden";
const USERNAME = "username";

function connctBtn(e){
e.preventDefault();
LoginForm.classList.add(HIDDEN_CLASSLIST);
const username = loginInput.value;
localStorage.setItem(USERNAME, username);
console.log(username);
//  greeting.innerText = `hello ${username}`;
//  greeting.classList.remove(HIDDEN_CLASSLIST);
paintGreeting(username);
}

function paintGreeting(username){
    greeting.innerText = `hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSLIST);    
}

const saveUserName = localStorage.getItem(USERNAME);

if (saveUserName === null){
    console.log('nope');
    LoginForm.classList.remove(HIDDEN_CLASSLIST);
    LoginForm.addEventListener("submit", connctBtn);
}else{    
    paintGreeting(saveUserName);
};
