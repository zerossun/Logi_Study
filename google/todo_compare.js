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

// PaintTodo : TODO를 그리는 역할
function PaintTodo2(listitem) {
  const li = document.createElement('li');
  li.id = listitem.id;
  li.text = listitem.text;
  let span = document.createElement('span');
  const Xbtn = document.createElement('button');
  const Mbtn = document.createElement('button');
  let Input = document.createElement('input');
  Xbtn.addEventListener('click', DeleteTodo);

  span.innerText = li.text;

  Xbtn.innerText = '삭제';
  Mbtn.innerText = '수정';

  console.log(Input.value);
  Mbtn.addEventListener('click', (event) => modify(event));

  li.append(span, Xbtn, Mbtn, Input);
  Input.classList.add(LOGIFORM_HIDDEN);

  TodoList2.append(li);

  //   const modify = (event, listitem) => {
  //     if (Input.value == '') {
  //       console.log('qwerty1');
  //       Input.value = span.innerText;
  //       span.classList.add(LOGIFORM_HIDDEN);
  //       Input.classList.remove(LOGIFORM_HIDDEN);
  //     } else {
  //       console.log('qwertytyuasdzfasdf');
  //       span.classList.remove(LOGIFORM_HIDDEN);
  //       Input.classList.add(LOGIFORM_HIDDEN);
  //       SavedTodos1();
  //       span.innerText = Input.value;
  //     }

  //   };
}

// 대리님코드를 보며 비교해보는 시간.

// 정신흐트려질 때마다 뺨 한대
// 1. 일단, 함수로 변수가 아닌 함수로 따로 뺐음.

function modify1(event, listitem) {
  const targetLiElement1 = event.target.parentElement;
  // 왜 부모함수를 지정했나. -> 지금 '수정'버튼이 쥔공 그의 부모는 li이기 때문.
  const targetInputElemnt1 = targetLiElement1.getElementsByTagName('input')[0];
  const targetSpanElemnt1 = targetInputElemnt1.getElementsByTagName('span')[0];
  // 'data-' : 데이터 속성을 일컫음. li.id = listitem.id; 거기서 id만 빼온다구
  const inputTemp1 = document.querySelector(
    `input[data-id = "${listitem.id}"]`
  );
  console.log('targetInputElement', targetInputElemnt1, inputTemp1); // 왜 안찍히지..?
}

function todolist(e) {
  e.preventDefault();

  const listitem = TodoInput2.value;
  localStorage.setItem('todolist', listitem);
  TodoInput2.value = '';
  const listObg = {
    text: listitem,
    id: Date.now(),
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
