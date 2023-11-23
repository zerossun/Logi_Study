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

  const modify = (event, listitem) => {
    if (Input.value == '') {
      console.log('qwerty1');
      Input.value = span.innerText;
      span.classList.add(LOGIFORM_HIDDEN); // 뭐가 뭔지 모르지만 일단 숨겨짐.
      Input.classList.remove(LOGIFORM_HIDDEN); // 뭐가 뭔지 모르지만 일단 나옴.
    } else {
      console.log('qwertytyuasdzfasdf');
      span.classList.remove(LOGIFORM_HIDDEN);
      Input.classList.add(LOGIFORM_HIDDEN);
      SavedTodos1();
      span.innerText = Input.value; //화면에 나오는 거까지 성공함ㅜㅜㅜㅜㅜ
      // 라스트, 이제 저장만 하면됨!!! 는 젤 난제네
    }

    // 대리님코드를 보며 비교해보는 시간.
  };
}

function todolist(e) {
  e.preventDefault();
  // 보아하니 이거는 맨위에 것만 먹는 거고
  // 내가 수정한 거는 또 따로 여기 코드를 만들어주어야 할 것 같구먼

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
