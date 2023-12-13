//배열안에 배열이 있기 때문에 2차원 배열임

let turn = 'O';
const data = [[],[],[]];
data.forEach((item)=>{
  data.push(item);
})

const Table = document.createElement('table');
for (let i =0; i <3; i++){
  const Tr = document.createElement('tr');
  for (let i =0; i <3; i++){
    // 태그 만들 때 변수로 빼놓는 게 편함
    // Tr.append(document.createElement('td'));
    const Td = document.createElement('td');
    Td.addEventListener('click', (e)=>{
      //만약에 칸에 글자가 있으면 리턴해줘라. (굳이 remove 안 넣어도 됨)
      if(e.target.textContent) return;
      e.target.textContent = turn;
      // 승부확인
      if(turn === 'O'){
        turn = 'X';
      }else if(turn === 'X'){
        turn = 'O';
      }
    });
    Tr.append(Td);
  }
  Table.append(Tr);
}
document.body.append(Table);

