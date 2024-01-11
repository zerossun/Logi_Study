const subMain = document.querySelector('.sub_main');
const commentSub = document.querySelector('.comment_sub');
const commentInput = document.querySelector('.comment_sub input');
const commentBtn = document.querySelector('.comment_btn');
const commentList = document.querySelector('.comment_list');

let subPar1 = localStorage.getItem('content1');
let subPar = JSON.parse(subPar1);
console.log(subPar);
const Commented = document.querySelector('.comment');
const Reserve = document.querySelector('.reserve');
const Delete = document.querySelector('.delete');
console.log(Reserve.textContent);

let date1 = new Date();
const time = date1.toLocaleDateString('ko-KR');

let sub = `
      <table>
        <tr class="sub_title">
            <th class="table_name">${subPar.name}</th>
            <th class="table_title">${subPar.title}</th>
            <th class="table_date">${subPar.date}</th>
        </th>
        <tr class="table_body">
          <td colspan="3">${subPar.body}</td>
          </tr>
      </table>
        <textarea class="hidden"></textarea>
      `;

subMain.innerHTML = sub;

// 내용 수정
Reserve.addEventListener('click', contentRes);

function contentRes() {
  const tableBody = document.querySelector('.table_body td');
  const tablearea = document.querySelector('textarea');

  const isHidden = tablearea.classList.value === 'hidden';
  tablearea.innerText = tableBody.innerText;

  if (isHidden) {
    tableBody.classList.add('hidden');
    tablearea.classList.remove('hidden');
    Reserve.textContent = '저장하기';
  } else {
    tableBody.classList.remove('hidden');
    tablearea.classList.add('hidden');
    Reserve.textContent = '수정';
    history.back();
    if (tablearea.value !== tableBody.innerText) {
      tableBody.innerText = tablearea.value;
      subPar.body = tablearea.value;
      const contetn1 = {
        name: subPar.name,
        date: subPar.date,
        title: subPar.title,
        body: subPar.body,
      };
      console.log(contetn1);
      localStorage.setItem('content1', JSON.stringify(contetn1));
      Reserve.textContent = '';
    } else {
    }
  }
}

// 내용 삭제

Delete.addEventListener('click', delCon);

function delCon() {
  history.back();
}
// 댓글 내용 저장

listObg = [];
function comStorage() {
  localStorage.setItem('list1', JSON.stringify(listObg));
}
// 댓글 저장

//댓글수정
function modifid(event) {
  const listTarget = event.target.parentElement;
  const listTargetP = listTarget.querySelector('p');
  const listInput = listTarget.querySelector('input');

  const isHidden = listInput.classList.value === 'hidden';

  if (isHidden) {
    listTargetP.classList.add('hidden');
    listInput.classList.remove('hidden');
    listInput.value = listTargetP.innerText;
  } else {
    const newListInput = listInput.value;
    listTargetP.innerText = newListInput;
    listTargetP.classList.remove('hidden');
    listInput.classList.add('hidden');

    const date2 = Date.now();
    const listobg2 = {
      name: listInput.value,
      time: time,
      date: date2,
    };

    listObg.push(listobg2);
    comView(listobg2);
    const listDel = listTarget;
    listDel.remove();
    listObg = listObg.filter((item) => item.date !== parseInt(listDel.date));
    comStorage();
  }
}

// 댓글 삭제
function DeleteLi(event) {
  const li2 = event.target.parentElement;
  console.log(li2);
  li2.remove();
  listObg = listObg.filter((toDo) => toDo.date == parseInt(li2.date));
  comStorage();
}

// 댓글 화면 노출
function comView(list) {
  const li = document.createElement('li');
  li.name = list.name;
  li.time = list.time;
  li.date = list.date;
  let p = document.createElement('p');
  let span = document.createElement('span');
  const Del = document.createElement('button');
  const Res = document.createElement('button');
  let Input = document.createElement('input');
  li.setAttribute('date-id', li.date);
  Input.classList.add('hidden');
  p.innerText = li.name;
  span.innerText = li.time;
  Del.innerText = '삭제';
  Res.innerText = '수정';
  li.append(p, span, Del, Res, Input);
  commentList.append(li);
  //콜백함수에 지역변수를 전달하기 위해 익명함수를 만들고,
  // 그 안에서 지역변수를 인자로 받은 함수를 실행
  Res.addEventListener('click', (event) => modifid(event));
  Del.addEventListener('click', DeleteLi);
}

function list(e) {
  e.preventDefault();
  const listValue = commentInput.value;
  console.log(listValue);
  commentInput.value = '';

  const date = Date.now();

  const listNmae = {
    name: listValue,
    time: time,
    date: date,
  };

  if (listValue == '') {
    commentBtn.disabled = true;
  } else {
    listObg.push(listNmae);
    // commentBtn.classList.add('abled');
    comStorage(listNmae);
    comView(listNmae);
    commentBtn.disabled = false;
    commentBtn.classList.remove('abled');
  }
}

function btnChange() {
  if (commentInput.value !== '') {
    commentBtn.classList.add('abled');
  }
}
commentSub.addEventListener('submit', list);

// 코드 전체로 만들었을 때는 한번밖에 작동안함
// function comView(list) {
//   const li = document.createElement('li');

//   let txt = ``;
//   txt += `
//           <div class=""list_item>
//             <p>${list.name}</p>
//             <input class="hidden"/>
//             <span>${list.time}</span>
//           </div>
//           <button class="list_reserve">수정</button>
//           <button class="list_delete">삭제</button>
//       `;

//   li.innerHTML = txt;

//   commentList.appendChild(li);
//   let reserveBtn = document.querySelector('.list_reserve');
//   reserveBtn.addEventListener('click', (event) => modifid(event));
// }
