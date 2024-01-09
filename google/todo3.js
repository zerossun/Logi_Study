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

    // 추가한 기능

    const id = Date.now();

    // 수정버튼을 클릭하면 나오는 input의 value값과 현재 시간의 밀리초를 id로 지정하여 변수로 변환
    const listObg2 = {
      text: targetInputElement.value,
      id: id,
    };
    // 수정한 todolist 배열 끝에 붙여주고 화면에 그려줌
    // 문제 : 수정 전의 list가 삭제되지 않음.
    toDos1.push(listObg2);
    PaintTodo2(listObg2);
    // 수정버튼의 부모(li)를 변수로 지정후 삭제
    const li3 = event.target.parentElement;
    li3.remove();
    // 원배열의 아이디와 삭제한 부모변수 id(string으로 값이 반환되기 때문에 parseInt로 number로 변환후 비교)갸 다른 것만 반환
    toDos1 = toDos1.filter((toDo) => toDo.id !== parseInt(li3.id));
    // function SavedTodos1() {  localStorage.setItem('todos', JSON.stringify(toDos1)); }
    // 로컬스토리지에 저장
    SavedTodos1();
  }
}

//
function checkB(e) {
  // 체크박스의 부모 li 지정
  const targetLiElement = e.target.parentElement;
  // 리스트 텍스트 지정
  const targetSpanElement = targetLiElement.getElementsByTagName('span')[0];
  // input 박스의 유형 checkbox로 지정
  let checkbox =
    targetLiElement.getElementsByTagName('input').type == 'checkbox';
  // 체크 유무 false로 지정 후, if문으로 true로 변환 시, decorate class가 실행되게 기능 적용
  checkbox.checked = false;
  if ((checkbox = true)) {
    targetSpanElement.classList.add('decorate');
  }
}

// 추가한 기능

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
  // check 버튼 클릭 시 checkB 함수 실행
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
