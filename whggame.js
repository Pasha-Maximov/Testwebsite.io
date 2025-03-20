const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = 1215;
const HEIGHT = 810;
canvas.width = WIDTH;
canvas.height = HEIGHT;

let currentLevel = 0;
let score = 0;
let gameOver = false;
let deathCount = 0;

function drawCheckeredBackground() {
    const squareSize = 67.5;  // Size of each square in the checkerboard
    const rows = Math.ceil(HEIGHT / squareSize);
    const cols = Math.ceil(WIDTH / squareSize);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const isEven = (row + col) % 2 === 0;
            ctx.fillStyle = isEven ? '#FFFFFF' : '#e3eeff';  // White and light gray colors
            ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
        }
    }
}

let lastCheckpoint = { x: 50, y: 50 };  // Start at the level's initial spawn point

let levels = [
    {
        player: {size: 45, color: 'red', speed: 8, dx: 0, dy: 0 },
        spawnPoint: { x: 76.125, y: 243.75},
        goal: { x: 1012.5, y: 202.5, width: 202.5, height: 405, color: '#bdffc0' },
        checkpoints: [ { x: 0, y: 202.5, height: 405, width: 202.5} ],
        enemies: [ 
            { x: 303.75, y: 303.75, size: 15, speed: 8, waypoints: [ { x: 303.75, y: 303.75 }, { x: 911.25, y: 303.75 } ] },
            { x: 911.25, y: 371.25, size: 15, speed: 8, waypoints: [ { x: 911.25, y: 371.25 }, { x: 303.75, y: 371.25 }  ] },
            { x: 303.75, y: 438.75, size: 15, speed: 8, waypoints: [ { x: 303.75, y: 438.75 }, { x: 911.25, y: 438.75 } ] },
            { x: 911.25, y: 506.25, size: 15, speed: 8, waypoints: [ { x: 911.25, y: 506.25 }, { x: 303.75, y: 506.25 }  ] }
        ],
        obstacles: [
            { x: 0, y: 0, width: 1215, height: 202.5, color: '#b0baff' },
            { x: 0, y: 607.5, width: 1215, height: 202.5, color: '#b0baff' },
            { x: 202.5, y: 202, width: 675, height: 67.5, color: '#b0baff' },
            { x: 337.5, y: 540.5, width: 675, height: 67.5, color: '#b0baff' },
            { x: 945, y: 270, width: 67.5, height: 280, color: '#b0baff' },
            { x: 202.5, y: 260, width: 67.5, height: 280, color: '#b0baff' }
        ],
    },
    {
        player: {size: 45, color: 'red', speed: 8, dx: 0, dy: 0 },
        spawnPoint: { x: 76.125, y: 378.75},
        goal: { x: 1012.5, y: 338, width: 202.5, height: 135, color: '#bdffc0' },
        checkpoints: [ { x: 0, y: 337.5, height: 135, width: 202.5} ],
        enemies: [ 
            {x: 236.25, y: 236.5, size: 15, speed: 4, waypoints:  [ { x: 236.25, y: 236.5 }, { x: 236.25, y: 573.75 } ] },
            {x: 303.75, y: 573.75, size: 15, speed: 4, waypoints:  [ { x: 303.75, y: 573.75 }, { x: 303.75, y: 236.5 } ] },
            {x: 371.25, y: 236.5, size: 15, speed: 4, waypoints:  [ { x: 371.25, y: 236.5 }, { x: 371.25, y: 573.75 }  ] },
            {x: 438.75, y: 573.75, size: 15, speed: 4, waypoints:  [ { x: 438.75, y: 573.75 }, { x: 438.75, y: 236.5 } ] },
            {x: 506.25, y: 236.5, size: 15, speed: 4, waypoints:  [ { x: 506.25, y: 236.5 }, { x: 506.25, y: 573.75 } ] },
            {x: 573.75, y: 573.75, size: 15, speed: 4, waypoints:  [ { x: 573.75, y: 573.75 }, { x: 573.75, y: 236.5 } ] },
            {x: 641.25, y: 236.5, size: 15, speed: 4, waypoints:  [ { x: 641.25, y: 236.5 }, { x: 641.25, y: 573.75 }  ] },
            {x: 708.75, y: 573.75, size: 15, speed: 4, waypoints:  [ { x: 708.75, y: 573.75 }, { x: 708.75, y: 236.5 } ] },
            {x: 776.25, y: 236.5, size: 15, speed: 4, waypoints:  [ { x: 776.25, y: 236.5 }, { x: 776.25, y: 573.75 } ] },
            {x: 843.75, y: 573.75, size: 15, speed: 4, waypoints:  [ { x: 843.75, y: 573.75 }, { x: 843.75, y: 236.5 } ] },
            {x: 911.25, y: 236.5, size: 15, speed: 4, waypoints:  [ { x: 911.25, y: 236.5 }, { x: 911.25, y: 573.75 }  ] },
            {x: 978.75, y: 573.75, size: 15, speed: 4, waypoints:  [ { x: 978.75, y: 573.75 }, { x: 978.75, y: 236.5 } ] }
        ],
        obstacles: [
            { x: 0, y: 607.5, width: 1215, height: 202.5, color: '#b0baff' },
            { x: 0, y: 0, width: 1215, height: 202.5, color: '#b0baff' },
            { x: 0, y: 202, width: 202.5, height: 136, color: '#b0baff' },
            { x: 0, y: 472.5, width: 202.5, height: 135, color: '#b0baff' },
            { x: 1012.5, y: 202, width: 202.5, height: 136, color: '#b0baff' },
            { x: 1012.5, y: 472.5, width: 202.5, height: 136, color: '#b0baff' }
        ]
    },
    {
        player: {size: 45, color: 'red', speed: 8, dx: 0, dy: 0 },
        spawnPoint: { x: 607.5, y: 405},
        goal: { x: 1012.5, y: 202.5, width: 202.5, height: 135, color: '#bdffc0' },
        checkpoints: [ { x: 540, y: 337.5, width: 135, height: 135 } ],
        enemies: [
            {x: 708.75, y: 506.25, size: 15, speed: 4, waypoints:  [ { x: 708.75, y: 506.25 }, { x: 506.25, y: 506.25 }, { x: 506.25, y: 303.75}, { x: 708.75, y: 303.75 } ] },
            {x: 708.75, y: 438.75, size: 15, speed: 4, waypoints:  [ { x: 708.75, y: 506.25 }, { x: 506.25, y: 506.25 }, { x: 506.25, y: 303.75}, { x: 708.75, y: 303.75 } ] },
            {x: 708.75, y: 371.25, size: 15, speed: 4, waypoints:  [ { x: 708.75, y: 506.25 }, { x: 506.25, y: 506.25 }, { x: 506.25, y: 303.75}, { x: 708.75, y: 303.75 } ] },
            {x: 708.75, y: 303.75, size: 15, speed: 4, waypoints:  [ { x: 708.75, y: 506.25 }, { x: 506.25, y: 506.25 }, { x: 506.25, y: 303.75}, { x: 708.75, y: 303.75 } ] },
            {x: 641.25, y: 303.75, size: 15, speed: 4, waypoints:  [ { x: 708.75, y: 303.75}, { x: 708.75, y: 506.25 }, { x: 506.25, y: 506.25 }, { x: 506.25, y: 303.75 } ] },
            {x: 573.75, y: 303.75, size: 15, speed: 4, waypoints:  [ { x: 708.75, y: 303.75}, { x: 708.75, y: 506.25 }, { x: 506.25, y: 506.25 }, { x: 506.25, y: 303.75 } ] },
            {x: 506.25, y: 371.25, size: 15, speed: 4, waypoints:  [ { x: 506.25, y: 303.75}, { x: 708.75, y: 303.75}, { x: 708.75, y: 506.25 }, { x: 506.25, y: 506.25 }  ] },
            {x: 506.25, y: 438.75, size: 15, speed: 4, waypoints:  [ { x: 506.25, y: 303.75}, { x: 708.75, y: 303.75}, { x: 708.75, y: 506.25 }, { x: 506.25, y: 506.25 }  ] },
            {x: 506.25, y: 506.25, size: 15, speed: 4, waypoints:  [ { x: 506.25, y: 303.75}, { x: 708.75, y: 303.75}, { x: 708.75, y: 506.25 }, { x: 506.25, y: 506.25 }  ] },
            {x: 641.25, y: 506.25, size: 15, speed: 4, waypoints:  [ { x: 506.25, y: 506.25 }, { x: 506.25, y: 303.75}, { x: 708.75, y: 303.75}, { x: 708.75, y: 506.25 } ] },
            {x: 573.75, y: 506.25, size: 15, speed: 4, waypoints:  [ { x: 506.25, y: 506.25 }, { x: 506.25, y: 303.75}, { x: 708.75, y: 303.75}, { x: 708.75, y: 506.25 } ] }
        ],
        obstacles: [
            { x: 0, y: 540, width: 1215, height: 270, color: '#b0baff' },
            { x: 0, y: 0, width: 1215, height: 202.5, color: '#b0baff' },
            { x: 0, y: 202, width: 472.5, height: 68, color: '#b0baff' },
            { x: 540, y: 202, width: 675, height: 68, color: '#b0baff' },
            { x: 0, y: 0, width: 472.5, height: 810, color: '#b0baff' },
            { x: 742.5, y: 0, width: 472.5, height: 810, color: '#b0baff' },
        ]
    },
    // Additional levels can be added here.
]


let player = {
    size: 45,    // Size of the player (width and height)
    dx: 0,       // X-axis movement speed
    dy: 0,       // Y-axis movement speed
    speed: 4     // Player movement speed
};

let goal = {};
let enemies = [];
let obstacles = [];


function loadLevel(levelIndex) {
    const level = levels[levelIndex];

    // Set player's starting position based on the spawn point in the level data
    player.x = level.spawnPoint.x;
    player.y = level.spawnPoint.y;

    // Set the initial checkpoint to the spawn point
    lastCheckpoint = { ...level.spawnPoint };

    // Load obstacles
    obstacles = level.obstacles.map(obstacle => ({
        ...obstacle
    }));

    // Load enemies with waypoints
    enemies = level.enemies.map(enemy => ({
        x: enemy.x,
        y: enemy.y,
        size: enemy.size,
        speed: enemy.speed,
        waypoints: enemy.waypoints,
        currentWaypoint: 0  // Start at the first waypoint
    }));

    // Load goal
    goal = { ...level.goal };
}

function drawPlayer() {
    const halfStrokeWidth = 3.75;  // Half of the stroke width to ensure the stroke stays inside

    ctx.beginPath();
    ctx.rect(player.x + halfStrokeWidth, player.y + halfStrokeWidth, 
             player.size - 2 * halfStrokeWidth, player.size - 2 * halfStrokeWidth);
    ctx.fillStyle = 'red';       // Fill color for the player
    ctx.fill();
    ctx.lineWidth = 7.5;            // Thickness of the outline
    ctx.strokeStyle = 'black';    // Outline color
    ctx.stroke();                 // Draw the outline
    ctx.closePath();
}


function drawEnemies() {
    const halfStrokeWidth = 3.75;  // Half of the stroke width to ensure the stroke stays inside

    enemies.forEach(enemy => {
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size - halfStrokeWidth, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';     // Fill color for the enemies
        ctx.fill();
        ctx.lineWidth = 7.5;         // Thickness of the outline
        ctx.strokeStyle = 'black'; // Outline color
        ctx.stroke();              // Draw the outline
        ctx.closePath();
    });
}

function drawObstacles() {
    obstacles.forEach((obstacle) => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function drawCheckpoints() {
    const level = levels[currentLevel];

    level.checkpoints.forEach(checkpoint => {
        ctx.beginPath();
        ctx.rect(checkpoint.x, checkpoint.y, checkpoint.width, checkpoint.height);
        ctx.fillStyle = '#bdffc0'; // Checkpoint color
        ctx.fill();
        ctx.closePath();
    });
}

function drawGoal() {
    ctx.fillStyle = goal.color;
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
}















let isPaused = false;
let showLevelButtons = false; // Flag to control the display of level buttons

function drawPauseMenu() {
    // Draw semi-transparent grey screen
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Adjust the alpha for transparency
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw "PAUSE" text
    ctx.font = 'bold 60px Arial'; // Increased font size
    ctx.textAlign = 'center';
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'brown';
    ctx.lineWidth = 4;
    ctx.strokeText('PAUSE', canvas.width / 2, canvas.height / 4);
    ctx.fillText('PAUSE', canvas.width / 2, canvas.height / 4);

    // Draw level select button
    drawLevelSelectButton();

    // Draw restart button
    drawRestartButton();

    // Draw level select buttons and text if needed
    if (showLevelButtons) {
        drawLevelButtons();
        drawLevelSelectText();
    }
}

function drawLevelSelectButton() {
    const buttonX = canvas.width / 2;
    const buttonY = canvas.height / 2;
    const buttonSize = 120; // Increased button size

    // Draw button background
    ctx.fillStyle = 'blue'; // Changed to blue
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(buttonX, buttonY, buttonSize / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Draw button dots
    ctx.fillStyle = 'white';
    const dotSize = 8; // Smaller dots
    const spacing = 16; // Decreased spacing
    for (let i = 0; i < 6; i++) {
        let xOffset = (i % 3) * (dotSize + spacing) - dotSize - spacing / 2;
        let yOffset = Math.floor(i / 3) * (dotSize + spacing) - dotSize - spacing / 2;
        ctx.beginPath();
        ctx.arc(buttonX + xOffset, buttonY + yOffset, dotSize, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function drawRestartButton() {
    const buttonX = canvas.width / 2 + 150; // Positioned to the right of the level select button
    const buttonY = canvas.height / 2;
    const buttonSize = 100; // Size of the button

    // Draw button background
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(buttonX, buttonY, buttonSize / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Draw arrow
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(buttonX, buttonY, buttonSize / 2 - 10, -Math.PI / 4, -3 * Math.PI / 4);
    ctx.stroke();
}

function drawLevelButtons() {
    const startX = canvas.width / 2 - 100;
    const startY = canvas.height / 2 + 90; // Adjusted Y position
    const buttonSize = 40;
    const spacing = 40; // Increased spacing

    ctx.font = 'bold 30px Arial'; // Adjust font size for level numbers
    ctx.textAlign = 'center';

    for (let i = 0; i < 3; i++) {
        const levelNumber = i + 1;
        const isAvailable = getAvailableLevels().includes(levelNumber);

        ctx.fillStyle = isAvailable ? 'blue' : 'darkblue';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(startX + i * (buttonSize + spacing), startY, buttonSize, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.fillText(levelNumber, startX + i * (buttonSize + spacing), startY + 10);
    }
}

function drawLevelSelectText() {
    ctx.font = 'bold 30px Arial'; // Font size for "LEVEL SELECT" text
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'brown';
    ctx.lineWidth = 4;
    ctx.textAlign = 'center';
    ctx.strokeText('LEVEL SELECT', canvas.width / 2, canvas.height / 2 + 150); // Adjusted Y position
    ctx.fillText('LEVEL SELECT', canvas.width / 2, canvas.height / 2 + 150); // Adjusted Y position
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        drawPauseMenu();
        // Pause game logic
        cancelAnimationFrame(animationId); // Assuming you use requestAnimationFrame
    } else {
        // Resume game logic
        // If using requestAnimationFrame, restart the animation loop
        requestAnimationFrame(gameLoop);
    }
}

canvas.addEventListener('click', function(event) {
    if (isPaused) {
        const x = event.clientX - canvas.offsetLeft;
        const y = event.clientY - canvas.offsetTop;

        const levelSelectButtonX = canvas.width / 2;
        const levelSelectButtonY = canvas.height / 2;
        const levelSelectButtonSize = 120; // Updated button size
        const levelSelectButtonDistance = Math.sqrt(Math.pow(x - levelSelectButtonX, 2) + Math.pow(y - levelSelectButtonY, 2));

        if (levelSelectButtonDistance < levelSelectButtonSize / 2) {
            // Toggle level buttons visibility
            showLevelButtons = !showLevelButtons;
            drawPauseMenu(); // Redraw pause menu to show/hide level buttons
        }

        // Restart button logic
        const restartButtonX = canvas.width / 2 + 150;
        const restartButtonY = canvas.height / 2;
        const restartButtonSize = 100;
        const restartButtonDistance = Math.sqrt(Math.pow(x - restartButtonX, 2) + Math.pow(y - restartButtonY, 2));

        if (restartButtonDistance < restartButtonSize / 2) {
            console.log("Restart button clicked");
            restartCurrentLevel();
            togglePause(); // Close pause menu and resume game
        }

        // Level buttons logic
        if (showLevelButtons) {
            const startX = canvas.width / 2 - 100;
            const startY = canvas.height / 2 + 90; // Adjusted Y position
            const buttonSize = 40;
            const spacing = 40; // Increased spacing

            for (let i = 0; i < 3; i++) {
                const levelNumber = i + 1;
                const levelButtonX = startX + i * (buttonSize + spacing);
                const levelButtonY = startY;
                const isAvailable = getAvailableLevels().includes(levelNumber);

                const levelButtonDistance = Math.sqrt(Math.pow(x - levelButtonX, 2) + Math.pow(y - levelButtonY, 2));
                if (isAvailable && levelButtonDistance < buttonSize / 2) {
                    // Load the selected level
                    loadLevel(levelNumber - 1); // Adjust level index
                    togglePause(); // Close pause menu and resume game
                }
            }
        }
    }
});

let visitedLevels = []; // Array to keep track of visited levels

function markLevelAsVisited(levelNumber) {
    if (!visitedLevels.includes(levelNumber)) {
        visitedLevels.push(levelNumber);
    }
}

function getAvailableLevels() {
    // Return levels that the player has visited
    return visitedLevels;
}

function isLevelAvailable(levelNumber) {
    // Check if the level number is in the list of visited levels
    return visitedLevels.includes(levelNumber);
}

function getCurrentLevelNumber() {
    // Implement this function based on your level management system
    // For example, if you have a global variable tracking the current level:
    return currentLevelNumber; // Make sure this variable is updated correctly
}

function restartCurrentLevel() {
    const currentLevelNumber = getCurrentLevelNumber();
    if (currentLevelNumber !== undefined) {
        console.log(`Restarting level ${currentLevelNumber}`);
        loadLevel(currentLevelNumber); // Reload the current level
    } else {
        console.error("Current level number is undefined");
    }
}

window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        togglePause();
    }
});


























function movePlayer() {
    // Move player by current velocity
    player.x += player.dx;
    player.y += player.dy;

    // Wall collision detection
    if (player.x < 0) player.x = 0;
    if (player.x + player.size > WIDTH) player.x = WIDTH - player.size;
    if (player.y < 0) player.y = 0;
    if (player.y + player.size > HEIGHT) player.y = HEIGHT - player.size;

    // Check for collisions with obstacles
    obstacles.forEach(obstacle => {
        if (detectObstacleCollision(player, obstacle)) {
            // Undo movement if a collision is detected
            if (player.dx !== 0) {
                player.x -= player.dx;
            }
            if (player.dy !== 0) {
                player.y -= player.dy;
            }
        }
    });
}

function moveEnemies() {
    enemies.forEach(enemy => {
        const target = enemy.waypoints[enemy.currentWaypoint];

        // Calculate the direction to the target waypoint
        const dirX = target.x - enemy.x;
        const dirY = target.y - enemy.y;
        const distance = Math.sqrt(dirX * dirX + dirY * dirY);

        // Normalize the direction vector and move the enemy
        if (distance > 0) {
            const normalizedX = dirX / distance;
            const normalizedY = dirY / distance;

            enemy.x += normalizedX * enemy.speed;
            enemy.y += normalizedY * enemy.speed;
        }

        // Check if the enemy has reached the waypoint
        if (distance < enemy.speed) {
            enemy.currentWaypoint++;
            if (enemy.currentWaypoint >= enemy.waypoints.length) {
                enemy.currentWaypoint = 0;  // Loop back to the first waypoint
            }
        }
    });
}

function detectObstacleCollision(player, obstacle) {
    return (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.size > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.size > obstacle.y
    );
}

function detectEnemyCollision(player, enemy) {
    const distX = Math.abs(enemy.x - player.x - player.size / 2);
    const distY = Math.abs(enemy.y - player.y - player.size / 2);

    if (distX > (player.size / 2 + enemy.size)) return false;
    if (distY > (player.size / 2 + enemy.size)) return false;

    if (distX <= (player.size / 2)) return true;
    if (distY <= (player.size / 2)) return true;

    const dx = distX - player.size / 2;
    const dy = distY - player.size / 2;
    return (dx * dx + dy * dy <= (enemy.size * enemy.size));
}

function detectcheckpointCollision(player, checkpoint) {
    return (
        player.x < checkpoint.x + checkpoint.width &&
        player.x + player.size > checkpoint.x &&
        player.y < checkpoint.y + checkpoint.height &&
        player.y + player.size > checkpoint.y
    );
}


function checkForCheckpoint() {
    const level = levels[currentLevel];

    level.checkpoints.forEach(checkpoint => {
        if (detectcheckpointCollision(player, { x: checkpoint.x, y: checkpoint.y, width: checkpoint.width, height: checkpoint.height })) {
            lastCheckpoint = { x: checkpoint.x, y: checkpoint.y, width: checkpoint.width, height: checkpoint.height };
        }
    });
}

function checkForGoal() {
    if (!goal) {
        return; // No goal to check
    }

    const playerReachedGoal = 
        player.x < goal.x + goal.width &&
        player.x + player.width > goal.x &&
        player.y < goal.y + goal.height &&
        player.y + player.height > goal.y;

    if (playerReachedGoal) {
        // Proceed to the next level
        currentLevel++;
        if (currentLevel < levels.length) {
            loadLevel(currentLevel);
        } else {
            // Handle end of game
            console.log("Congratulations, you've completed the game!");
        }
    }
}



function updateScore() {
    // Check if player has reached the goal
    if (
        player.x < goal.x + goal.width &&
        player.x + player.size > goal.x &&
        player.y < goal.y + goal.height &&
        player.y + player.size > goal.y
    ) {
        score++;
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            loadLevel(currentLevel);
        } else {
            alert('You beat the game! Congratulations!');
            gameOver = true;
        }
    }

    // Check for collisions with enemies
    enemies.forEach(enemy => {
        if (detectEnemyCollision(player, enemy)) {
            deathCount++;
            loadLevel(currentLevel);  // Restart the current level
        }
    });
}

function drawScore() {
    ctx.font = '25px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Level: ${score}`, 10, 20);
    ctx.fillText(`Deaths: ${deathCount}`, 10, 50);
}

function clearCanvas() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function gameLoop() {

    ///if (!ispaused) {
    clearCanvas(); // Clear previous frame

    drawCheckeredBackground(); // Draw background
    drawCheckpoints(); // Draw checkpoints
    movePlayer(); // Update player movement
    moveEnemies(); // Update enemy movement

    checkForCheckpoint(); // Check checkpoint activation

    // Ensure goal and other elements are drawn
    if (levels[currentLevel].goal) {
        drawGoal();
        checkForGoal() // Check for collision with the goal
    }
    

    drawPlayer(); // Draw player
    drawEnemies(); // Draw enemies
    drawObstacles(); // Draw obstacles
    drawScore(); // Draw score and death counter

if (!gameOver) {
    requestAnimationFrame(gameLoop); // Continue game loop if not over
    }
///}
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'd') player.dx = player.speed;
    if (e.key === 'ArrowLeft' || e.key === 'a') player.dx = -player.speed;
    if (e.key === 'ArrowUp' || e.key === 'w') player.dy = -player.speed;
    if (e.key === 'ArrowDown' || e.key === 's') player.dy = player.speed;
}

function keyUp(e) {
    if (
        e.key === 'ArrowRight' ||
        e.key === 'ArrowLeft' ||
        e.key === 'd' ||
        e.key === 'a'
    ) player.dx = 0;

    if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'w' ||
        e.key === 's'
    ) player.dy = 0;
}

// Event listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

loadLevel(currentLevel);
gameLoop();
