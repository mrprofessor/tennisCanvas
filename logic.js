var canvas;
var canvasContext;
var ballX = 50;
var bally = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    };
}

window.onload = function (){
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        var framePerSecond = 30;
        setInterval(function(){
            moveEverything();
            drawEverything();
        }, 1000/framePerSecond);

        canvas.addEventListener('mousemove',
            function(evt) {
                var mousePos = calculateMousePos(evt);
                paddle1Y = mousePos.y - PADDLE_HEIGHT/2;
            });
}
//Reset the ball when it loses
function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    bally = canvas.height/2;
}
function computerMovement() {
    var paddle2YCenter = paddle2Y + PADDLE_HEIGHT/2;
    if(paddle2YCenter < bally-35) {
        paddle2Y += 10;
    } else if(paddle2YCenter > bally+35){
        paddle2Y -= 10;
    }

}
function moveEverything() {
    computerMovement();
    ballX += ballSpeedX;
    bally += ballSpeedY;
    if(ballX > canvas.width){
        if(bally > paddle2Y && bally < paddle2Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
            player1Score--;
        }
    }
    if (ballX < 0) {
        if(bally > paddle1Y && bally < paddle1Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
            player2Score++;
        }
    }
    if(bally > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if(bally < 0) {
        ballSpeedY = -ballSpeedY;
    }
}
function drawEverything() {
    colorRect(0,0,canvas.width,canvas.height,'teal');

    //Left player paddle
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'pink');

    //Right Computer Paddle
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'pink');

    colorCircle(ballX, bally, 10, 'red');

    //score
    canvasContext.font = '20px serif'
    canvasContext.fillText(player1Score, 100,100);
    canvasContext.fillText(player2Score, canvas.width-100, 100);
}
function colorRect(leftX,rightY,width,height,drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,rightY,width,height);
}
function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}
