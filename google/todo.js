const TodoForm = document.querySelector("#todo_form");
const TodoInput = document.querySelector("#todo_form input")
const TodoList = document.querySelector("#todo_list");

// PaintTodo : TODO를 그리는 역할
function PaintTodo(userlist){
    console.log("qwerty", userlist);
    const li = document.createElement("li");
    const span = document.createElement("span");
    console.log(li)
    li.appendChild(span);
    span.innerText = userlist;
    TodoList.appendChild(li);
};

function HandleTodo(e){
    e.preventDefault();
    const userlist = TodoInput.value;
    localStorage.setItem("TodoList", userlist);
    TodoInput.value = "";
    PaintTodo(userlist);
}

// 빡대가리를 위한 설명
// 1. PaintTodo에 userlist인자를 줌 -> function PaintTodo(userlist) / userlist = text;
// 2. HandleTodo이 PaintTodo를 사용하게 함.
// 3. function HandleTodo(e){ ... PaintTodo(userlist);} 
// ->HandleTodo함수에 PaintTodo함수를 호출함. 그리고 userlist를 보냄. 누구한테 PaintTodo함수에!
// 3-1. userlist는 input의 value를 비우기 전의 값을 나타내는 string임
// 4. 그러면 이제 호출받은 PaintTodo는 뭘 그려야할지 알겠지? ㅇㅇ


TodoForm.addEventListener("submit",HandleTodo);