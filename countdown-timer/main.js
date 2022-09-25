const startingTime = .5;
let timeRemaining = startingTime * 60;

const countdownElement = document.getElementById("countdown");

let updateTimer = () => {
    const minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;

    seconds = seconds < 10? "0" + seconds : seconds;

    countdownElement.innerHTML = `${minutes}:${seconds}`;
    timeRemaining--;
    if(timeRemaining <= 0) timeRemaining = startingTime * 60;
}

setInterval(updateTimer, 1000);