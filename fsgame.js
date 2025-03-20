const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const audio = new Audio('musik/fruitsmashsong.mp3');
const audio2 = new Audio('musik/Fruit_smasher.mp3');

const WIDTH = 1115;
const HEIGHT = 650;
canvas.width = WIDTH;
canvas.height = HEIGHT;

const sledgehammer_cursor = new Image();
sledgehammer_cursor.src = 'sledgehammer_cursor.png';

const bowlphase0 = new Image();
bowlphase0.src = 'bowlphase0.png';

const bowlphase1 = new Image();
bowlphase1.src = 'bowlphase1.png';

const bowlphase2 = new Image();
bowlphase2.src = 'bowlphase2.png';

const bowlphase3 = new Image();
bowlphase3.src = 'bowlphase3.png';

const cranberry = new Image();
cranberry.src = 'cranberry.png';

const blueberry = new Image();
blueberry.src = 'blueberry.png';

const cherry = new Image();
cherry.src = 'cherry.png';

let bowlheight = 200
let bowlwidth = 200
let bowlX = 97.5
let bowlY = 200
let bowl = bowlphase0
let score = 0
let cranberrybuyable = true
let allowcranberryoverlay = false
let blueberrybuyable = false
let allowblueberryoverlay = false
let cherrybuyable = false
let allowcherryoverlay = false
let scoreamplifier = 1
let drawcranmenu = false
let audiostarted = false
let audioplaying = false
let fruitsbought = 0
let prestigeamount = 999
let prestigenum = 0

function prestige() { 
    prestigenum = prestigenum + 1
    bowlheight = 200,
    bowlwidth = 200,
    bowlX = 97.5,
    bowlY = 200,
    bowl = bowlphase0,
    score = 0,
    cranberrybuyable = true,
    allowcranberryoverlay = false,
    blueberrybuyable = false,
    allowblueberryoverlay = false,
    cherrybuyable = false,
    allowcherryoverlay = false,
    scoreamplifier = scoreamplifier + ((scoreamplifier / 3) - fruitsbought);
    drawcranmenu = false,
    audiostarted = false,
    audioplaying = false,
    prestigeamount = prestigeamount + (((prestigeamount + 1) * prestigenum) * fruitsbought)
    fruitsbought = 0
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.fillStyle = 'green';
    ctx.fillRect(400, 25, 315, 600);

    ctx.fillStyle = 'green';
    ctx.fillRect(757.5, 25, 315, 600);

    ctx.fillStyle = 'green';
    ctx.fillRect(42.5, 25, 315, 600);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5';
    ctx.fillRect(770, 50, 140, 560);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5';
    ctx.fillRect(920, 50, 140, 560);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5';
    ctx.fillRect(413, 50, 290, 280);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5';
    ctx.fillRect(413, 355, 290, 260);


    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(425, 360, 4, 54);
    ctx.fillRect(425, 360, 54, 4);
    ctx.fillRect(475, 360, 4, 54);
    ctx.fillRect(425, 410, 54, 4);

    

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(495, 360, 4, 54);
    ctx.fillRect(495, 360, 54, 4);
    ctx.fillRect(545, 360, 4, 54);
    ctx.fillRect(495, 410, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(565, 360, 4, 54);
    ctx.fillRect(565, 360, 54, 4);
    ctx.fillRect(615, 360, 4, 54);
    ctx.fillRect(565, 410, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(635, 360, 4, 54);
    ctx.fillRect(635, 360, 54, 4);
    ctx.fillRect(685, 360, 4, 54);
    ctx.fillRect(635, 410, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(425, 430, 4, 54);
    ctx.fillRect(425, 430, 54, 4);
    ctx.fillRect(475, 430, 4, 54);
    ctx.fillRect(425, 480, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(495, 430, 4, 54);
    ctx.fillRect(495, 430, 54, 4);
    ctx.fillRect(545, 430, 4, 54);
    ctx.fillRect(495, 480, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(565, 430, 4, 54);
    ctx.fillRect(565, 430, 54, 4);
    ctx.fillRect(615, 430, 4, 54);
    ctx.fillRect(565, 480, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(635, 430, 4, 54);
    ctx.fillRect(635, 430, 54, 4);
    ctx.fillRect(685, 430, 4, 54);
    ctx.fillRect(635, 480, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(425, 500, 4, 54);
    ctx.fillRect(425, 500, 54, 4);
    ctx.fillRect(475, 500, 4, 54);
    ctx.fillRect(425, 550, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(495, 500, 4, 54);
    ctx.fillRect(495, 500, 54, 4);
    ctx.fillRect(545, 500, 4, 54);
    ctx.fillRect(495, 550, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(565, 500, 4, 54);
    ctx.fillRect(565, 500, 54, 4);
    ctx.fillRect(615, 500, 4, 54);
    ctx.fillRect(565, 550, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(635, 500, 4, 54);
    ctx.fillRect(635, 500, 54, 4);
    ctx.fillRect(685, 500, 4, 54);
    ctx.fillRect(635, 550, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(425, 570, 4, 54);
    ctx.fillRect(425, 570, 54, 4);
    ctx.fillRect(475, 570, 4, 54);
    ctx.fillRect(425, 620, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(495, 570, 4, 54);
    ctx.fillRect(495, 570, 54, 4);
    ctx.fillRect(545, 570, 4, 54);
    ctx.fillRect(495, 620, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(565, 570, 4, 54);
    ctx.fillRect(565, 570, 54, 4);
    ctx.fillRect(615, 570, 4, 54);
    ctx.fillRect(565, 620, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(635, 570, 4, 54);
    ctx.fillRect(635, 570, 54, 4);
    ctx.fillRect(685, 570, 4, 54);
    ctx.fillRect(635, 620, 54, 4);
    //------------------------------------------------------------------------------//
    //shop//
    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(425, 55, 4, 54);
    ctx.fillRect(425, 55, 54, 4);
    ctx.fillRect(475, 55, 4, 54);
    ctx.fillRect(425, 105, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(495, 55, 4, 54);
    ctx.fillRect(495, 55, 54, 4);
    ctx.fillRect(545, 55, 4, 54);
    ctx.fillRect(495, 105, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(565, 55, 4, 54);
    ctx.fillRect(565, 55, 54, 4);
    ctx.fillRect(615, 55, 4, 54);
    ctx.fillRect(565, 105, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(635, 55, 4, 54);
    ctx.fillRect(635, 55, 54, 4);
    ctx.fillRect(685, 55, 4, 54);
    ctx.fillRect(635, 105, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(425, 125, 4, 54);
    ctx.fillRect(425, 125, 54, 4);
    ctx.fillRect(475, 125, 4, 54);
    ctx.fillRect(425, 175, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(495, 125, 4, 54);
    ctx.fillRect(495, 125, 54, 4);
    ctx.fillRect(545, 125, 4, 54);
    ctx.fillRect(495, 175, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(565, 125, 4, 54);
    ctx.fillRect(565, 125, 54, 4);
    ctx.fillRect(615, 125, 4, 54);
    ctx.fillRect(565, 175, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(635, 125, 4, 54);
    ctx.fillRect(635, 125, 54, 4);
    ctx.fillRect(685, 125, 4, 54);
    ctx.fillRect(635, 175, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(425, 195, 4, 54);
    ctx.fillRect(425, 195, 54, 4);
    ctx.fillRect(475, 195, 4, 54);
    ctx.fillRect(425, 245, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(495, 195, 4, 54);
    ctx.fillRect(495, 195, 54, 4);
    ctx.fillRect(545, 195, 4, 54);
    ctx.fillRect(495, 245, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(565, 195, 4, 54);
    ctx.fillRect(565, 195, 54, 4);
    ctx.fillRect(615, 195, 4, 54);
    ctx.fillRect(565, 245, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(635, 195, 4, 54);
    ctx.fillRect(635, 195, 54, 4);
    ctx.fillRect(685, 195, 4, 54);
    ctx.fillRect(635, 245, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(425, 265, 4, 54);
    ctx.fillRect(425, 265, 54, 4);
    ctx.fillRect(475, 265, 4, 54);
    ctx.fillRect(425, 315, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(495, 265, 4, 54);
    ctx.fillRect(495, 265, 54, 4);
    ctx.fillRect(545, 265, 4, 54);
    ctx.fillRect(495, 315, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(565, 265, 4, 54);
    ctx.fillRect(565, 265, 54, 4);
    ctx.fillRect(615, 265, 4, 54);
    ctx.fillRect(565, 315, 54, 4);

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(635, 265, 4, 54);
    ctx.fillRect(635, 265, 54, 4);
    ctx.fillRect(685, 265, 4, 54);
    ctx.fillRect(635, 315, 54, 4);

    //prestige button

    ctx.fillStyle = 'rgba(200, 200, 200, 1';
    ctx.fillRect(150, 565, 108, 27);
    ctx.fillStyle = 'rgba(0, 0, 0, 1';
    ctx.font = '25px ariel'
    ctx.fillText('prestige', 160, 585)

    //fruits(icon outline)

    ctx.fillStyle = 'rgba(255, 255, 255, 1';
    ctx.fillRect(927, 57, 34, 34)
    ctx.fillRect(972, 57, 34, 34)
    ctx.fillRect(1017, 57, 34, 34)

    ctx.fillStyle = 'rgba(0, 0, 0, 0.5';
    ctx.fillRect(927, 57, 34, 4)
    ctx.fillRect(927, 57, 4, 34)
    ctx.fillRect(957, 57, 4, 34)
    ctx.fillRect(927, 87, 34, 4)

    ctx.fillRect(972, 57, 34, 4)
    ctx.fillRect(972, 57, 4, 34)
    ctx.fillRect(1002, 57, 4, 34)
    ctx.fillRect(972, 87, 34, 4)

    ctx.fillRect(1017, 57, 34, 4)
    ctx.fillRect(1017, 57, 4, 34)
    ctx.fillRect(1047, 57, 4, 34)
    ctx.fillRect(1017, 87, 34, 4)

    ctx.fillRect(927, 102, 34, 4)
    ctx.fillRect(927, 102, 4, 34)
    ctx.fillRect(957, 102, 4, 34)
    ctx.fillRect(927, 132, 34, 4)

    ctx.fillRect(972, 102, 34, 4)
    ctx.fillRect(972, 102, 4, 34)
    ctx.fillRect(1002, 102, 4, 34)
    ctx.fillRect(972, 132, 34, 4)

    ctx.fillRect(1017, 102, 34, 4)
    ctx.fillRect(1017, 102, 4, 34)
    ctx.fillRect(1047, 102, 4, 34)
    ctx.fillRect(1017, 132, 34, 4)

    

    ctx.fillStyle = 'white'
    ctx.font= '25px bold arial'
    ctx.fillText('Achievements', 485, 350);

    ctx.fillStyle = 'white'
    ctx.font= '25px bold arial'
    ctx.fillText('Shop', 530, 44);

    ctx.fillStyle = 'white'
    ctx.font= '25px bold arial'
    ctx.fillText('Uprgades', 792, 44);

    ctx.fillStyle = 'white'
    ctx.font= '25px bold arial'
    ctx.fillText('Fruit', 965, 46);

    ctx.fillStyle = 'white'
    ctx.font= '30px bold arial'
    ctx.fillText('`s', 300, 65);

    ctx.fillStyle = 'white'
    ctx.font= '30px bold arial'
    ctx.fillText('Fruit Salad', 130, 100);
     

    ctx.fillStyle = 'white'
    ctx.font= '28px bold arial'
    ctx.fillText('Fruit Bux', 90, 165);


    ctx.drawImage(bowl, bowlX, bowlY, bowlheight, bowlheight)
    ctx.drawImage(cranberry, 927, 57, 34, 34)
    ctx.drawImage(blueberry, 974, 59, 30, 30)
    ctx.drawImage(cherry, 1015, 55, 36, 36)


    if(blueberrybuyable == false && allowblueberryoverlay == false) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(972, 57, 34, 34)
    }

    if(cherrybuyable == false && allowcherryoverlay == false) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(1017, 57, 34, 34)
    }

    if(allowcranberryoverlay == true) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(927, 57, 34, 34);
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(922, 73, 44, 2);
    }

    if(allowblueberryoverlay == true) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(972, 57, 34, 34);
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(967, 73, 44, 2);
    }

    if(allowcherryoverlay == true) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(1017, 57, 34, 34);
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(1012, 73, 44, 2);
    }

    
}

function drawScore() {
    ctx.font = '25px Arial';
    ctx.fillStyle = 'black';
    let text = `${parseInt(score)}`
    let metrics = ctx.measureText(text);
    let textWidth = metrics.width;
    ctx.fillText(`${score}`, (187 - (textWidth / 2)), 140);
}

function drawprestigeamount() {
    ctx.font = '15px Arial';
    ctx.fillStyle = 'black';
    let text = `To Prestige, score must at least be: ${prestigeamount}`
    let metrics = ctx.measureText(text);
    let textWidth = metrics.width;
    ctx.fillText(`To Prestige, score must at least be: ${prestigeamount}`, (187 - (textWidth / 2)), 620);
}




function resetbowl() {
    bowlheight = 200
    bowlwidth = 200
    bowlX = 97.5
    bowlY = 200
}

function bowlsizetransition() {
    bowlheight = 175
    bowlwidth = 175
    bowlX = 110
    bowlY = 212.5
}

function clicksizebowl() {
    bowlheight = 150
    bowlwidth = 150
    bowlX = 122.5
    bowlY =  225
}



canvas.addEventListener('click', function(event) {
    console.log(getMousePos(canvas, event))
    const mousepos = getMousePos(canvas, event)
    if(
        927 < mousepos.x && mousepos.x < 927 + 34 &&
        57 < mousepos.y && mousepos.y < 57 + 34
    ) {
        if(cranberrybuyable == false){
            return
        }
        if (score <= 9){
            return
        }
        cranberrybuyable = false
        score = score - 10
        bowl = bowlphase1
        scoreamplifier = scoreamplifier + 2
        allowcranberryoverlay = true
        blueberrybuyable = true
        fruitsbought = fruitsbought + 1
    }
});



canvas.addEventListener('click', function(event) {
    console.log(getMousePos(canvas, event))
    const mousepos = getMousePos(canvas, event)
    if(
        972 < mousepos.x && mousepos.x < 972 + 34 &&
        57 < mousepos.y && mousepos.y < 57 + 34
    ) {
        if(blueberrybuyable == false){
            return
        }
        if (score <= 9){
            return
        }
        blueberrybuyable = false
        score = score - 10
        bowl = bowlphase2
        scoreamplifier = scoreamplifier + 10
        allowblueberryoverlay = true
        cherrybuyable = true
        fruitsbought = fruitsbought + 1
    }
});

canvas.addEventListener('click', function(event) {
    console.log(getMousePos(canvas, event))
    const mousepos = getMousePos(canvas, event)
    if(
        1017 < mousepos.x && mousepos.x < 1017 + 34 &&
        57 < mousepos.y && mousepos.y < 57 + 34
    ) {
        if(cherrybuyable == false){
            return
        }
        if (score <= 9){
            return
        }
        cherrybuyable = false
        score = score - 10
        bowl = bowlphase3
        scoreamplifier = scoreamplifier + 20
        allowcherryoverlay = true
        fruitsbought = fruitsbought + 1
    }
});

canvas.addEventListener('click', function(event) {
    console.log(getMousePos(canvas, event))
    const mousepos = getMousePos(canvas, event)
    if(
        150 < mousepos.x && mousepos.x < 150 + 108 &&
        565 < mousepos.y && mousepos.y < 565 + 27
    ) {
        if (score >= prestigeamount) {
        prestige();
    }}
});

function playaudio() {
    audio.play();
}
canvas.addEventListener('click', function(event) {
    console.log(getMousePos(canvas, event))
    const mousepos = getMousePos(canvas, event)
    if(
        bowlX < mousepos.x && mousepos.x < bowlX + bowlwidth &&
        bowlY < mousepos.y && mousepos.y < bowlY + bowlheight
    ) {
        score = score + 1 * scoreamplifier
        bowlsizetransition()
        setTimeout(clicksizebowl, 150)
        setTimeout(bowlsizetransition, 400)
        setTimeout(resetbowl, 550)
        if(audioplaying == false) {
            
            if (audioplaying == false) {
                playaudio();
                audiostarted = true
                audioplaying = true
            }
        }
    }
});


function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function playmusic() {
    if (audioplaying == false) {
    if(audiostarted == false) {
        audio.play
        setTimeout(96000, loopmusic)
    }
    if(audiostarted == true){
        setTimeout(68000, audio2.play)
        setTimeout(166000, audio.play)
        loopmusic()
    }}
}

function loopmusic() {
    playmusic()
}






function gameloop() {
    
    draw();
    drawScore();
    drawprestigeamount();


    requestAnimationFrame(gameloop); 
}


gameloop();