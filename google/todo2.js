const TodoForm2 = document.querySelector("#todo_form");
const TodoInput2 = document.querySelector("#todo_form input");
const TodoList2 = document.querySelector("#todo_list");




function DeleteTodo(event){
    const li2 = event.target.parentElement;
    li2.remove();
}

function PaintTodo2(listitem){
    console.log(listitem);
    const li = document.createElement("li");
    const span = document.createElement("span");
    const Xbtn = document.createElement("button");
    Xbtn.addEventListener("click", DeleteTodo);
    span.innerText = listitem;
    Xbtn.innerText ="✔";
    li.append(span, Xbtn)
    TodoList2.append(li);
    
}

function todolist(e){
    e.preventDefault();
    const listitem = TodoInput2.value;
    localStorage.setItem("todolist",listitem);
    TodoInput2.value = "";
    PaintTodo2(listitem);    
}


// 자 다시 쉽게 순서 설명
// 1. 사용자가 form을 submit 하면, 우리는 input을 비우고
// 2. 그 텍스트(userlist)를 ToDos array에 push하고
// 3. 화면에 todo를 그려주고 => PaintTodo(userlist);
// 4. saveToDos를 이용해 todo를 그려줌.


TodoForm2.addEventListener("submit", todolist);
