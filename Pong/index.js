
const gameCanvas = document.querySelector("#gameCanvas");
const context = gameCanvas.getContext("2d");
const scoreText = document.querySelector("#scoreText");

const gameWidth = 800, gameHeight = 600;
const ballSound = new Audio("ballsound.mp3");

//Game Info
const clearColor = "black";

//Paddle Info
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 50;
const paddle1Color = "white";
const paddle2Color = "white";

//Ball Info
const ballRadius = 10;
const ballSpeedLimit = 12;
const ballBorderColor = "blue";

let intervalID;

let ball = {
    speed: 1,
    x: gameWidth / 2,
    y: gameHeight / 2,
    directionX: 0,
    directionY: 0,
    color: "white"
}

let player1Score = 0, player2Score = 0;

let paddle1 = {
    width: paddleWidth,
    height: paddleHeight,
    x: (0) + 20,
    y: (gameHeight / 2) - paddleHeight / 2
}

let paddle2 = {
    width: paddleWidth,
    height: paddleHeight,
    x: (gameWidth - paddleWidth) - 20,
    y: (gameHeight / 2) - paddleHeight / 2
}
/*
window.addEventListener("keydown", e => {
    e.preventDefault();
    input(e);
});*/

var map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    e.preventDefault();
    e = e || event; // to deal with IE
    map[e.key] = e.type == 'keydown';
}

gameStart();

function gameStart() {
    createBall();
    gameLoop();
}

function gameLoop() {
    intervalID = setTimeout(() => {
        update();
        render();
        gameLoop();
    }, 1000/60)
}

let update = () => {
    input();

    if (ball.speed < 2) ball.speed = 2;
    ball.x += (ball.speed * ball.directionX);
    ball.y += (ball.speed * ball.directionY);

    checkCollision();

}

let render = () => {
    clearScreen();

    //Draw Paddles
    context.fillStyle = paddle1Color;
    context.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    context.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    //Draw Ball
    if (ball.speed <= 2.5)
        ball.color = "white";
    else if (ball.speed <= 4)
        ball.color = "green";
    else if (ball.speed <= 6)
        ball.color = "orange";
    else if (ball.speed <= 8)
        ball.color = "red";
    else if (ball.speed > 8)
        ball.color = "#" + Math.floor(Math.random()*16777215).toString(16);

    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI);
    context.fill(); 

}

let clearScreen = () => {
    context.fillStyle = clearColor;
    context.fillRect(0, 0, gameWidth, gameHeight);
}

function input() {

    if(map["w"] && paddle1.y > 0) {
        paddle1.y = lerp(paddle1.y, paddle1.y - paddleSpeed, .1);
    } else if(map["s"] && paddle1.y < gameHeight - paddleHeight) {
        paddle1.y = lerp(paddle1.y, paddle1.y + paddleSpeed, .1);
    }

    if(map["ArrowUp"] && paddle2.y > 0) {
        paddle2.y = lerp(paddle2.y, paddle2.y - paddleSpeed, .1);
    } else if(map["ArrowDown"] && paddle2.y < gameHeight - paddleHeight) {
        paddle2.y = lerp(paddle2.y, paddle2.y + paddleSpeed, .1);
    }

}

function changeBallDirection() {
    ball.directionX *= -1;
    ball.directionY *= -1;
}

function checkCollision() {

    if(ball.y <= 0 + ballRadius || ball.y >= gameHeight - ballRadius) {
        ball.directionY *= -1;
        if(ball.speed > 3) ball.speed -= .1;
        ballSound.play();
    }

    if(ball.x <= 0) {

        player2Score += 1;

        updateScore();

        createBall();

        return;

    }

    if(ball.x >= gameWidth) {

        player1Score += 1;

        updateScore();

        createBall();

        return;

    }

    if(ball.x <= (paddle1.x + paddle1.width + ballRadius)){

        if(ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height){

            ball.x = (paddle1.x + paddle1.width) + ballRadius; // if ball gets stuck

            ball.directionX *= -1;
            ballSound.play();

            ball.speed += (ball.speed >= ballSpeedLimit) ? 0 : 0.75;

        }

    }

    if(ball.x >= (paddle2.x - ballRadius)) {

        if(ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {

            ball.x = paddle2.x - ballRadius; // if ball gets stuck

            ball.directionX *= -1;
            ballSound.play();

            ball.speed += (ball.speed >= ballSpeedLimit) ? 0 : 0.75;

        }

    }

};

function updateScore() {
    scoreText.textContent = `${player1Score} : ${player2Score}`;

}

function createBall() {
    ball.speed = 2;

    if(Math.round(Math.random()) == 1)
        ball.directionX =  1; 
    else
        ball.directionX = -1; 

    if(Math.round(Math.random()) == 1)
        ball.directionY = Math.random() * 1; //more random directions
    else
        ball.directionY = Math.random() * -1; //more random directions

    ball.x = gameWidth / 2;

    ball.y = gameHeight / 2;

}

function gameReset() {
    player1Score = 0;
    player2Score = 0;
    createBall();
    updateScore();
}

//FROM : Andre Mattos : codepen.io
function lerp (start, end, amt) {
    return (1-amt)*start+amt*end
}