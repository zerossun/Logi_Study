const subMain = document.querySelector('.sub_main');
const why = document.querySelector('.why');
let subCon = localStorage.getItem('content1');
let subPar = JSON.parse(subCon);

const Oomment = document.querySelector('.comment');
const Reserve = document.querySelector('.reserve');
const Delete = document.querySelector('.delete');
console.log(subPar);
console.log(subPar.name);
console.log(subPar.title);
console.log(subPar.body);

let sub = `
        <div class="sub_title">
            <div class="table_name">${subPar.name}</div>
            <div class="table_title">${subPar.title}</div>
            <div class="table_date">${subPar.date}</div>
        </div>
        <div class="table_body">${subPar.body}</div>
        `;
console.log(sub);
subMain.innerHTML = sub;
