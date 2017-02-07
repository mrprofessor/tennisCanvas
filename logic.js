var canvas;
var canvasContext;

window.onload = function() {
    console.log("Hello JS");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = 'teal';
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
}
