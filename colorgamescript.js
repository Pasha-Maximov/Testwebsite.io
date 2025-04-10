const canvas = document.getElementById('gameCanvas');
const textcanvas = document.getElementById('textshowingCanvas');
const selectioncanvas1 = document.getElementById('selectionCanvas1');
const selectioncanvas2 = document.getElementById('selectionCanvas2');
const selectioncanvas3 = document.getElementById('selectionCanvas3');
const selectioncanvas4 = document.getElementById('selectionCanvas4');
const ctx = canvas.getContext('2d');
const textctx = textcanvas.getContext('2d');
const selectionctx1 = selectioncanvas1.getContext('2d');
const selectionctx2 = selectioncanvas2.getContext('2d');
const selectionctx3 = selectioncanvas3.getContext('2d');
const selectionctx4 = selectioncanvas4.getContext('2d');

const WIDTH = 1150
const HEIGHT = 650
canvas.width = WIDTH
canvas.height = HEIGHT
const txtWIDTH = 350
const txtHEIGHT = 100
textcanvas.width = txtWIDTH
textcanvas.height = txtHEIGHT

function draw() {
    textctx.font = '25px Arial';
    textctx.fillStyle = 'black';
    let text = `Achievements`;
    let metrics = textctx.measureText(text);
    let textWidth = metrics.width;
    textctx.fillText(`Achievements`, (175 - (textWidth / 2)), 50)
};


function gameloop() {
    draw();

    requestAnimationFrame(gameloop); 
};


gameloop();