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
    }

    // 자 이제 저 input에 li.span 내용을 넣어주면 됨.
    // 일단 input 안에 불러오긴 함.
    // 자 이제 불러온 거를 수정하면 저장되게 만들면 됨. 문장 하나로 만들기는 쉽네
    // 여러가지 방법을 썼지만 다시 턴백

    // [도전했던 방법]
    // 각각 이벤트 주면 같이 실행됨. -> 실패
    // 함수 따로 빼서 주려함. -> 실력 미달로 함수에 지역변수 정보 옮기는 걸 못해서 실패
    // 전역변수로 빼서 해봄 -> 기능 자체가 안됨. 그리고 솔직히 지역변수로 사용하고 싶음.
    // 그래 계속 안되어봐라. 될 때까지 조진다.
  };
}

// =============
// const modify = (event, listitem) => {
//   console.log('qwerty');
//   const Mbtn = listitem.span;
//   console.log(Mbtn);

// 아씨 이렇게 하면 새로 span에 접근하는 게 아닌 새로 파짐;;;;;;
// const todoItem = Mbtn.parentElement;
// const todoItemTxt = todoItem.text;
// Mbtn.innerText = todoItemTxt;

//   const inputText = event.target.innerText;
//   const inputMbtn = document.createElement('input');
//   inputMbtn.value = inputText;
//   inputMbtn.classList.add('edit-input');
// };
// ===============

// function modify(listitem) {
//   console.log('qwerty');
//   const li3 = listitem.target.parentElement;
//   const txt = li3.text;
//   console.log(txt);

//   txt.classList.add(LOGIFORM_HIDDEN);
// }

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
