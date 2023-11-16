const LoginForm = document.querySelector("#LoginForm");
const LoginInput = document.querySelector("#LoginForm input:first-child");
const LoginSubmit = document.querySelector("#LoginForm input:last-child");
const greeting = document.querySelector("#greeting");
const Logout = document.querySelector("#logout");

const HIDDEN = "hidden"

function LoginBtn2(e){
    e.preventDefault();
    const yourname2 = LoginInput.value;
    console.log(yourname2);
    localStorage.setItem("username", LoginInput.value);
    LoginForm.classList.add(HIDDEN);
    Logout.classList.remove(HIDDEN);
    Greet(yourname2);
}
function LoginInputChnage(e){
    console.log(e.value);
    LoginInput.value = e.target.value;
}

function Greet(name){
    greeting.innerText = `hello ${name}`;
    greeting.classList.remove(HIDDEN);
}

function LogOutBtn2(){
    localStorage.removeItem("username");
    greeting.classList.add(HIDDEN);
    LoginForm.classList.remove(HIDDEN);
    LoginInput.value ="";
    Logout.classList.add(HIDDEN);
}

const setItem2 = localStorage.getItem("username");
if(setItem2 === null){
    greeting.classList.add(HIDDEN);
                             
}else{
    Greet(setItem2);
    LoginForm.classList.add(HIDDEN);
    Logout.classList.remove(HIDDEN);
}
Logout.addEventListener("click", LogOutBtn2);
LoginForm.addEventListener("submit", LoginBtn2);
LoginInput.addEventListener("change", LoginInputChnage);