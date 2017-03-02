var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
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
    ballY = canvas.height/2;
}
function computerMovement() {
    var paddle2YCenter = paddle2Y + PADDLE_HEIGHT/2;
    if(paddle2YCenter < ballY-35) {
        paddle2Y += 5;
    } else if(paddle2YCenter > ballY+35){
        paddle2Y -= 5;
    }

}
function moveEverything() {
    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if(ballX > canvas.width){
        if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2)
            ballSpeedY = deltaY * 0.35;
        } else {
            ballReset();
            player1Score++;
        }
    }
    if (ballX < 0) {
        if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2)
            ballSpeedY = deltaY * 0.35;
        } else {
            ballReset();
            player2Score++;
        }
    }
    if(ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if(ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}
function drawEverything() {
    colorRect(0,0,canvas.width,canvas.height,'teal');

    //Left player paddle
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'yellow');

    //Right Computer Paddle
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'yelow');

    colorCircle(ballX, ballY, 10, 'white');

    //score
    canvasContext.font = '20px monokai'
    canvasContext.fillText("player1", 80,30);
    canvasContext.fillText("player2", canvas.width-130, 30);
    canvasContext.font = '30px serif'
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
