const TodoForm2 = document.querySelector('#todo_form');
const TodoInput2 = document.querySelector('#todo_form input');
const TodoList2 = document.querySelector('#todo_list');
​
const LOGIFORM_HIDDEN = 'hidden';
​
let toDos1 = [];
​
function SavedTodos1() {
  localStorage.setItem('todos', JSON.stringify(toDos1));
}
​
//list삭제 버튼
function DeleteTodo(event) {
  const li2 = event.target.parentElement;
  li2.remove();
  toDos1 = toDos1.filter((toDo) => toDo.id !== parseInt(li2.id));
  SavedTodos1();
}
​
// [코딩은 기세다.]
// 수정버튼을 클릭했을 때,
// span 숨겨주고, input박스가 보여야 됨.
// input 박스에는 li.span 정보가 써있어야 되고
// 수정 버튼 다시 클릭했을 때, input박스 숨겨주고 li.span이 보여야 됨.
// 삼항연산자로 했을 때,
// 만약 li.span이 block으로 되어있으면, true일 때 숨김처리 & input 보여주기. : false 일 때, li.span block, input 숨김처리
​
// 우선 그러면 버튼 클릭했을 때 li.text부터 가져오자. input이 나오는 기능 부터 만들어보자.
// function modify(event) {
//   console.log('qwerty');
//   const li3 = event.target.parentElement;
//   console.log(li3.text);
// }
​
// 수정 클릭 버튼
function modify(event, listitem) {
    const targetLiElement = event.target.parentElement;
    const targetInputElement = targetLiElement.getElementsByTagName('input')[0];
    const targetSpanElement = targetLiElement.getElementsByTagName('span')[0];
    const inputTemp = document.querySelector(`input[data-id="${listitem.id}"]`);
    console.log("targetInputElement", targetInputElement, inputTemp);
    const isHidden = targetInputElement.classList.value === LOGIFORM_HIDDEN;
    if (isHidden) {
      // 편집모드
      targetSpanElement.classList.add(LOGIFORM_HIDDEN);
      targetInputElement.classList.remove(LOGIFORM_HIDDEN);
      targetInputElement.value = listitem.text;
    } else {
      //실제 수정
      const newInputValue = targetInputElement.value;
      //데이터 변경
      targetSpanElement.innerText = newInputValue;
      //모양 변경
      targetSpanElement.classList.remove(LOGIFORM_HIDDEN);
      targetInputElement.classList.add(LOGIFORM_HIDDEN);
    }
  }
​
// PaintTodo : TODO를 그리는 역할
function PaintTodo2(listitem) {
  const li = document.createElement('li');
  li.id = listitem.id;
  li.text = listitem.text;
  let span = document.createElement('span');
  const Xbtn = document.createElement('button');
  const Mbtn = document.createElement('button');
  let Input = document.createElement('input');
  Input.setAttribute('data-id', listitem.id);
  Input.classList.add(LOGIFORM_HIDDEN);
  Xbtn.addEventListener('click', DeleteTodo);
​
  span.innerText = li.text;
​
  Xbtn.innerText = '삭제';
  Mbtn.innerText = '수정';
​
  Mbtn.addEventListener('click', (event) => modify(event, listitem));
​
  li.append(span, Xbtn, Mbtn, Input);
​
  TodoList2.append(li);
}
​
// =============
// const modify = (event, listitem) => {
//   console.log('qwerty');
//   const Mbtn = listitem.span;
//   console.log(Mbtn);
​
// 아씨 이렇게 하면 새로 span에 접근하는 게 아닌 새로 파짐;;;;;;
// const todoItem = Mbtn.parentElement;
// const todoItemTxt = todoItem.text;
// Mbtn.innerText = todoItemTxt;
​
//   const inputText = event.target.innerText;
//   const inputMbtn = document.createElement('input');
//   inputMbtn.value = inputText;
//   inputMbtn.classList.add('edit-input');
// };
// ===============
​
// function modify(listitem) {
//   console.log('qwerty');
//   const li3 = listitem.target.parentElement;
//   const txt = li3.text;
//   console.log(txt);
​
//   txt.classList.add(LOGIFORM_HIDDEN);
// }
​
function todolist(e) {
  e.preventDefault();
  const listitem = TodoInput2.value;
  localStorage.setItem('todolist', listitem);
  TodoInput2.value = '';
​
  const id = Date.now();
  const listObg = {
    text: listitem,
    id: id,
  };
​
  toDos1.push(listObg);
  PaintTodo2(listObg);
  SavedTodos1(listObg);
}
​x
// const savedTodos1 = localStorage.getItem('todos');
​
// if (savedTodos1 != null) {
//   const obg = JSON.parse(savedTodos1);
//   toDos1 = obg;
//   console.log(obg);
//   obg.forEach(PaintTodo2);
// }
​
TodoForm2.addEventListener('submit', todolist);