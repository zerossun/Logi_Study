const Today = document.querySelector('#accent span');
const now = new Date();
const today = now.getDate();
const first = new Date('2023-07-03');
const firstT = first.getTime();

const toFirst = now - first;
const FirstDay = `${Math.round(toFirst / (60 * 60 * 1000 * 24))}일`;
Today.innerHTML = FirstDay;



function calc(e){
    const date = firstT + e / (60 * 60 * 1000 * 24);
    const dateD = new Date(date);
    const year = dateD.getFullYear();
    const month = dateD.getMonth();
    const day = dateD.getDay();
    document.querySelector('#date' + e).innerText = year +'년' + month + '월' + day + '일'; 
};
calc(100);
calc(200);
calc(365);
calc(500);