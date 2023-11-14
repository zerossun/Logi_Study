const Clock = document.querySelector("#clock");

function getClock(){
    // const date = new Date();
    // const hours = String(date.getHours()).padStart(2,"0");
    // const minute = String(date.getMinutes()).padStart(2,"0");
    // const second = String(date.getSeconds()).padStart(2,"0");

    // Clock.innerText = `${hours} : ${minute} : ${second}`;

    Clock.innerText = new Date().toLocaleTimeString();
}
//웹사이트가 load되자마자 getClock(); 실행
getClock();
setInterval(getClock, 1000);



