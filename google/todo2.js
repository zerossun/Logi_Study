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

// [코딩은 기세다.]
// 수정버튼을 클릭했을 때,
// span 숨겨주고, input박스가 보여야 됨.
// input 박스에는 li.span 정보가 써있어야 되고
// 수정 버튼 다시 클릭했을 때, input박스 숨겨주고 li.span이 보여야 됨.
// 삼항연산자로 했을 때,
// 만약 li.span이 block으로 되어있으면, true일 때 숨김처리 & input 보여주기. : false 일 때, li.span block, input 숨김처리

// 우선 그러면 버튼 클릭했을 때 li.text부터 가져오자. input이 나오는 기능 부터 만들어보자.
// function modify(event) {
//   console.log('qwerty');
//   const li3 = event.target.parentElement;
//   console.log(li3.text);
// }

// PaintTodo : TODO를 그리는 역할

// 3. 전역변수로 빼서 해봄 -> 기능 자체가 안됨. 그리고 솔직히 지역변수로 사용하고 싶음.
// const li = document.createElement('li');
// li.id = listitem.id;
// li.text = listitem.text;
// let span = document.createElement('span');
// const Xbtn = document.createElement('button');
// const Mbtn = document.createElement('button');
// let Input = document.createElement('input');

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
  // 현방법
  const modify = (event, listitem) => {
    if (Input.value == '') {
      console.log('qwerty1');
      Input.value = span.innerText;
      span.classList.add(LOGIFORM_HIDDEN);
      Input.classList.remove(LOGIFORM_HIDDEN);
    } else {
      console.log('qwertytyuasdzfasdf');
      span.classList.remove(LOGIFORM_HIDDEN);
      Input.classList.add(LOGIFORM_HIDDEN);
      SavedTodos1();
      span.innerText = Input.value;
    }
  };

  // =====================
  // [도전했던 방법]
  // 1. 각각 이벤트 주기 ->같이 실행됨. 실패
  //   const modify = (event, listitem) => {
  //     console.log('qwerty');

  //     console.log(Mbtn);

  //   const todoItem = Mbtn.parentElement;
  //   const todoItemTxt = todoItem.text;
  //   Mbtn.innerText = todoItemTxt;

  //     const inputText = event.target.innerText;
  //     const inputMbtn = document.createElement('input');
  //     inputMbtn.value = inputText;
  //     inputMbtn.classList.add('edit-input');
  //   };
}

// =============

// ===============
// 2. 함수 따로 빼서 주려함. -> 실력 미달로 함수에 지역변수 정보 옮기는 걸 못해서 실패
// function modify(listitem) {
//   console.log('qwerty');
//   const li3 = listitem.target.parentElement;
//   const txt = li3.text;
//   console.log(txt);

//   txt.classList.add(LOGIFORM_HIDDEN);
// }

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
