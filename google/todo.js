const TodoForm = document.querySelector("#todo_form");
const TodoInput = document.querySelector("#todo_form input")
const TodoList = document.querySelector("#todo_list");

const ToDos = [];
const TODOS_KEY = "todos"
function SaveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(ToDos));
}
// ToDos array를 localstorage에 집어넣는게 SaveToDos의 하는 일

//list삭제 버튼
function DeleteTodo2(event){
    const li2 = event.target.parentNode;
    li2.remove();
}

// PaintTodo : TODO를 그리는 역할
function PaintTodo(userlist){    
    const li = document.createElement("li");
    const span = document.createElement("span");
    const Btn = document.createElement("button");
    Btn.addEventListener("click", DeleteTodo2);
    li.append(span, Btn);
    TodoList.appendChild(li);
    span.innerText = userlist;
    Btn.innerHTML = "❌";
};

function HandleTodo(e){
    e.preventDefault();
    const userlist = TodoInput.value;
    localStorage.setItem("TodoList", userlist);
    TodoInput.value = "";
    ToDos.push(userlist); 
    PaintTodo(userlist);
    SaveToDos(ToDos);

}


// 쉬운 설명
// 1. PaintTodo에 userlist인자를 줌 -> function PaintTodo(userlist) / userlist = text;
// 2. HandleTodo이 PaintTodo를 사용하게 함.
// 3. function HandleTodo(e){ ... PaintTodo(userlist);} 
// ->HandleTodo함수에 PaintTodo함수를 호출함. 그리고 userlist를 보냄. 누구한테 PaintTodo함수에!
// 3-1. userlist는 input의 value를 비우기 전의 값을 나타내는 string임
// 4. 그러면 이제 호출받은 PaintTodo는 뭘 그려야할지 알겠지? ㅇㅇ


// 자 다시 쉽게 순서 설명
// 1. 사용자가 form을 submit 하면, 우리는 input을 비우고
// 2. 그 텍스트(userlist)를 ToDos array에 push하고
// 3. 화면에 todo를 그려주고 => PaintTodo(userlist);
// 4. saveToDos를 이용해 todo를 그려줌.



TodoForm.addEventListener("submit",HandleTodo);

function sayHello(item){
    console.log(item)
    // 보소 이사람아.
    // submit EventListener가 event를 그냥 제공해주는 것처럼,
    // Js는 지금 처리되고 있는 item 또한 그냥 제공해줌.
    // 그래서 괄호에 item 넣는거임.
    // console 확인하면, 부야! ["a","b"] 아닌 a / b 이렇게 각각 나올거야.
}

 const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos);
    console.log(parsedTodos);
    // array임. 그래서 forEach를 갖고있음.
    parsedTodos.forEach(sayHello);
    // sayHello function을 실행해줘. => 결과값 `(숫자)hello` ["a","b"]
    // 하지만 위의 코드는 array의 item들에 대해 한개의 function만 실행할 수 있게 해줌.
    // 여기서 발생하는 문제 : 내가 어떤 item을 사용하고 있는지를 모름.
    // 이거에 대한 해결방안은 sayHello 하단의 주석확인.
    parsedTodos.forEach((item)=> console.log(item));
    // 그리고 위의 대환장쇼를 짧게 만들 수 있는 화살표함수라는 좋은 것이 있습니다.
}

// 이게 강의 6-5의 작업
// 그러니까 지금 내가 하는 작업은
// localStorage에 array로 저장이 안됨.
// 그래서 JSON.stringify로 array처럼 생긴 string으로 저장한 후,
// 다시 JSON.parse를 이용해 array로 꺼내는 방법.
// array.forEach는 받아온 array를 for 반복문 없이 item 하나씩 funciont에 넣을 수 있음.

// JS는 array에 있는 각각의 item에 대해 function을 실행할 수 있게 해줌. => forEach를 이용.


// 6-5까지의 했던 것
// 일단 화면에 그렸고
// 작업들을 localStorage에 저장했지.
// 그 다음에 Todo를 복원해서 다시 화면에 그려줬어.
// 자 여기서 생겨버린 문제. 업데이트해도 전에 기록들이 localStorage에서 사라지지 않음^^

// 혹시나 헷갈리까봐 써 두는 것.
// localStoage는 db가 아니다.  toDos array를 복사해두는 곳임. 