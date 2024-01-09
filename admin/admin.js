const Main = document.querySelector('#main');
const Menu = document.querySelector('#menu');
const Table = document.createElement('table');
const now = new Date();
const time = now.toLocaleDateString('ko-KR');
Main.appendChild(Table);
fetch(`https://jsonplaceholder.typicode.com/posts`)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    let html = ``;
    if (json) {
      json.forEach((main) => {
        html += `
            <tr class="tr_line">
                <td>${main.id}</td>
                <td>${main.title}</td>
                <td>${main.body}</td>
                <td>${time}</td>
            </tr>
    `;
        Table.innerHTML = html;
      });
    } else {
      html = `Sorry. I can't find it :( )`;
    }
    let line = Table.getElementsByClassName('tr_line');

    const lineArray = Array.from(line);

    for (let i = 0; i < lineArray.length; i++) {
      lineArray[i].addEventListener('click', function () {
        let content1 = {
          name: `${lineArray[i].children[0].innerHTML}`,
          title: `${lineArray[i].children[1].innerHTML}`,
          body: `${lineArray[i].children[2].innerHTML}`,
          date: `${lineArray[i].children[3].innerHTML}`,
        };
        localStorage.setItem('content1', JSON.stringify(content1));
        location.href = `page/sub/sub.html`;
      });
    }
  });
//////
/////
