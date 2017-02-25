var canvas;
var canvasContext;

window.onload = function (){
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        drawEverything();
}

function drawEverything() {
    canvasContext.fillStyle = 'teal';
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(100,200,50,50);
}
