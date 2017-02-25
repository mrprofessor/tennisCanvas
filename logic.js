var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 7;

window.onload = function (){
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        var framePerSecond = 30;
        setInterval(function(){
            moveEverything();
            drawEverything();
        }, 1000/framePerSecond);
}
function moveEverything() {
    ballX = ballX + ballSpeedX;
    if(ballX > canvas.width+10 || ballX < 10){
        ballSpeedX = -ballSpeedX;
    }
}
function drawEverything() {
    colorRect(0,0,canvas.width,canvas.height,'teal');
    colorRect(0,210,10,100,'pink');
    colorRect(canvas.width-10,210,10,100,'pink');

    colorCircle(ballX,100,10, 'red');
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
