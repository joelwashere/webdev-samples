const startingTime = .5;
const countdownText = document.getElementById("countdown");
const initialTextColor = countdownText.style.color;
let timeRemaining = startingTime * 60;

const countdownElement = document.getElementById("countdown");

let updateTimer = () => {
    const minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;

    seconds = seconds < 10? "0" + seconds : seconds;

    if(seconds <= 10) countdownText.style.color = "red";
    else countdownText.style.color = initialTextColor;

    countdownElement.innerHTML = `${minutes}:${seconds}`;
    timeRemaining--;
    if(timeRemaining <= 0) timeRemaining = startingTime * 60;
}


setInterval(updateTimer, 1000);