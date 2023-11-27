const TodoForm2 = document.querySelector('#todo_form');
const TodoInput2 = document.querySelector('#todo_form input');
const TodoList2 = document.querySelector('#todo_list');
const LOGIFORM_HIDDEN = 'hidden';

let toDos1 = [];
function SavedTodos1() {
  localStorage.setItem('todos', JSON.stringify(toDos1));
}
//list삭제 버튼
function DeleteTodo(event) {
  const li2 = event.target.parentElement;
  li2.remove();
  toDos1 = toDos1.filter((toDo) => toDo.id !== parseInt(li2.id));
  SavedTodos1();
}

// 수정 클릭 버튼
function modify(event, listitem) {
  const targetLiElement = event.target.parentElement;
  const targetInputElement = targetLiElement.getElementsByTagName('input')[1];
  const targetSpanElement = targetLiElement.getElementsByTagName('span')[0];
  const inputTemp = document.querySelector(`input[data-id="${listitem.id}"]`);
  console.log('targetInputElement', targetInputElement, inputTemp);
  const isHidden = targetInputElement.classList.value === LOGIFORM_HIDDEN;
  if (isHidden) {
    // 편집모드

    targetSpanElement.classList.add(LOGIFORM_HIDDEN);
    targetInputElement.classList.remove(LOGIFORM_HIDDEN);
    targetInputElement.value = targetSpanElement.innerText;
  } else {
    //실제 수정
    const newInputValue = targetInputElement.value;
    //데이터 변경
    targetSpanElement.innerText = newInputValue;
    //모양 변경
    targetSpanElement.classList.remove(LOGIFORM_HIDDEN);
    targetInputElement.classList.add(LOGIFORM_HIDDEN);

    const id = Date.now();
    const listObg2 = {
      text: targetInputElement.value,
      id: id,
    };
    toDos1.push(listObg2);
    PaintTodo2(listObg2);
    const li3 = event.target.parentElement;
    li3.remove();

    toDos1 = toDos1.filter((toDo) => toDo.id !== parseInt(li3.id));
    SavedTodos1();
    console.log('ganada');
  }
}

function checkB(e) {
  const targetLiElement = e.target.parentElement;
  const targetSpanElement = targetLiElement.getElementsByTagName('span')[0];
  let checkbox =
    targetLiElement.getElementsByTagName('input').type == 'checkbox';
  checkbox.checked = false;
  if ((checkbox = true)) {
    targetSpanElement.classList.add('decorate');
  }
}

// PaintTodo : TODO를 그리는 역할
function PaintTodo2(listitem) {
  const li = document.createElement('li');
  li.id = listitem.id;
  li.text = listitem.text;
  let span = document.createElement('span');
  const check = document.createElement('input');
  check.type = 'checkbox';
  const Xbtn = document.createElement('button');
  const Mbtn = document.createElement('button');
  let Input = document.createElement('input');

  Input.setAttribute('data-id', listitem.id);
  Input.classList.add(LOGIFORM_HIDDEN);
  Xbtn.addEventListener('click', DeleteTodo);

  span.innerText = li.text;

  Xbtn.innerText = '삭제';
  Mbtn.innerText = '수정';

  Mbtn.addEventListener('click', (event) => modify(event, listitem));
  check.addEventListener('click', (e) => checkB(e));

  li.append(check, span, Xbtn, Mbtn, Input);

  TodoList2.append(li);
}

function todolist(e) {
  e.preventDefault();
  const listitem = TodoInput2.value;
  localStorage.setItem('todolist', listitem);
  TodoInput2.value = '';

  const id = Date.now();
  const listObg = {
    text: listitem,
    id: id,
  };
  toDos1.push(listObg);
  PaintTodo2(listObg);
  SavedTodos1(listObg);
}
const savedTodos1 = localStorage.getItem('todos');

if (savedTodos1 != null) {
  const obg = JSON.parse(savedTodos1);
  toDos1 = obg;
  console.log(obg);
  obg.forEach(PaintTodo2);
}
TodoForm2.addEventListener('submit', todolist);
