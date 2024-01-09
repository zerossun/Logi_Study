const subMain = document.querySelector('.sub_main');
const commentSub = document.querySelector('.comment_sub');
const commentInput = document.querySelector('.comment_sub input');
const commentBtn = document.querySelector('.comment_btn');
const commentList = document.querySelector('.comment_list');
let subCon = localStorage.getItem('content1');
let subPar = JSON.parse(subCon);

const Comment = document.querySelector('.comment');
const Reserve = document.querySelector('.reserve');
const Delete = document.querySelector('.delete');

let sub = `
        <tr class="sub_title">
            <th class="table_name">${subPar.name}</th>
            <th class="table_title">${subPar.title}</th>
            <th class="table_date">${subPar.date}</th>
        </th>
        <tr>
        <td class="table_body" colspan="3">${subPar.body}</td>
        </tr>
        `;

subMain.innerHTML = sub;

// 댓글 내용 저장

listObg = [];
function comStorage() {
  localStorage.setItem('list1', JSON.stringify(listObg));
}
// 댓글 저장
function list(e) {
  e.preventDefault();

  let date = new Date();
  const time = date.toLocaleDateString('ko-KR');

  const listValue = commentInput.value;
  commentInput.value = ``;
  const listNmae = {
    name: listValue,
    time: time,
  };
  if (listValue == '') {
    commentBtn.disabled = false;
  } else {
    listObg.push(listNmae);
    comStorage(listNmae);
    comView(listNmae);
    commentBtn.disabled = false;
  }
}

// 댓글 화면 노출
function comView(list) {
  const li = document.createElement('li');
  let txt = ``;
  txt = `
          <p>${list.name}<span>${list.time}</span></p>
          <button class="list_reserve">수정</button>
          <button class="list_delete">삭제</button>
      `;

  li.innerHTML = txt;
  commentList.appendChild(li);
  let listReserve = document.querySelector('.list_reserve');
  let listDelte = document.querySelector('.list_delete');
  console.log(listReserve);
  console.log(listDelte);
}

commentSub.addEventListener('submit', list);
