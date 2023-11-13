const LoginForm = document.querySelector("#LoginForm");
const LoginInput = document.querySelector("#LoginForm input:first-child");
const LoginBtn = document.querySelector("#LoginForm input:last-child");


function LoginClick(e){
    
    e.preventDefault();
    const username = LoginInput.value;
    console.log(username);

    if(username.length = null || username.length === 0){
        alert("write your name");
    }else if(username.length >= 15){
        alert("your name tall");
    }
}


LoginBtn.addEventListener("click", LoginClick);
    