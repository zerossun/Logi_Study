const Clock = document.querySelector("#clock");

function onClock(){
    
    const date = new Date;
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    Clock.innerText = (`${hour} : ${minute} : ${second}`);    

    Clock.innerText = (date.toLocaleTimeString());
}

onClock();
setInterval(onClock, 1000);
