const gameGrid = document.getElementById('game');
const nextPreviewGrid = document.getElementById('next-preview');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const gameOverModal = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart');

const width = 10;
const height = 20;
let score = 0;
let level = 1;
let speed = 1000;
let currentTetromino;
let nextTetrominos = [];
let timer;
let gameOver = false;

const tetrominos = [
    { shape: [[1, 1, 1], [0, 1, 0]], color: 'cyan' },
    { shape: [[1, 1], [1, 1]], color: 'yellow' },
    { shape: [[0, 1, 1], [1, 1, 0]], color: 'red' },
    { shape: [[1, 1, 0], [0, 1, 1]], color: 'green' },
    { shape: [[1, 1, 1, 1]], color: 'blue' },
    { shape: [[1, 1, 1], [1, 0, 0]], color: 'orange' },
    { shape: [[1, 1, 1], [0, 0, 1]], color: 'purple' }
];

function initializeGrid() {
    gameGrid.innerHTML = '';
    for (let i = 0; i < width * height; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameGrid.appendChild(cell);
    }
}

function drawTetromino() {
    currentTetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                const index = (currentTetromino.y + y) * width + (currentTetromino.x + x);
                if (index >= 0 && index < width * height) {
                    gameGrid.children[index].classList.add('filled');
                    gameGrid.children[index].style.backgroundColor = currentTetromino.color;
                }
            }
        });
    });
}

function undrawTetromino() {
    currentTetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                const index = (currentTetromino.y + y) * width + (currentTetromino.x + x);
                if (index >= 0 && index < width * height) {
                    gameGrid.children[index].classList.remove('filled');
                    gameGrid.children[index].style.backgroundColor = '';
                }
            }
        });
    });
}

function generateTetromino() {
    if (nextTetrominos.length === 0) {
        nextTetrominos.push(tetrominos[Math.floor(Math.random() * tetrominos.length)]);
    }
    currentTetromino = { ...nextTetrominos.shift(), x: Math.floor(width / 2) - 1, y: 0 };
    nextTetrominos.push(tetrominos[Math.floor(Math.random() * tetrominos.length)]);
    updatePreview();
    if (collision()) {
        endGame();
    }
}

function updatePreview() {
    nextPreviewGrid.innerHTML = '';
    const tetromino = nextTetrominos[0];
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (tetromino.shape[row] && tetromino.shape[row][col]) {
                cell.classList.add('filled');
                cell.style.backgroundColor = tetromino.color;
            }
            nextPreviewGrid.appendChild(cell);
        }
    }
}

function moveDown() {
    if (gameOver) return;
    undrawTetromino();
    currentTetromino.y++;
    if (collision()) {
        currentTetromino.y--;
        drawTetromino();
        freeze();
        generateTetromino();
    }
    drawTetromino();
}

function moveLeft() {
    if (gameOver) return;
    undrawTetromino();
    currentTetromino.x--;
    if (collision()) {
        currentTetromino.x++;
    }
    drawTetromino();
}

function moveRight() {
    if (gameOver) return;
    undrawTetromino();
    currentTetromino.x++;
    if (collision()) {
        currentTetromino.x--;
    }
    drawTetromino();
}

function rotateTetromino() {
    if (gameOver) return;
    undrawTetromino();
    const rotatedShape = currentTetromino.shape[0].map((val, index) => currentTetromino.shape.map(row => row[index]).reverse());
    const previousShape = currentTetromino.shape;
    currentTetromino.shape = rotatedShape;
    if (collision()) {
        currentTetromino.shape = previousShape;
    }
    drawTetromino();
}

function dropTetromino() {
    if (gameOver) return;
    undrawTetromino();
    while (!collision()) {
        currentTetromino.y++;
    }
    currentTetromino.y--;
    drawTetromino();
    freeze();
    generateTetromino();
    drawTetromino();
}

function collision() {
    return currentTetromino.shape.some((row, y) => {
        return row.some((value, x) => {
            if (value) {
                const newX = currentTetromino.x + x;
                const newY = currentTetromino.y + y;
                if (newX < 0 || newX >= width || newY >= height) {
                    return true;
                }
                if (newY >= 0 && gameGrid.children[newY * width + newX].classList.contains('filled')) {
                    return true;
                }
            }
            return false;
        });
    });
}

function freeze() {
    currentTetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                const index = (currentTetromino.y + y) * width + (currentTetromino.x + x);
                if (index >= 0 && index < width * height) {
                    gameGrid.children[index].classList.add('filled');
                    gameGrid.children[index].style.backgroundColor = currentTetromino.color;
                }
            }
        });
    });
    addScore();
    clearLines();
}

function clearLines() {
    for (let y = height - 1; y >= 0; y--) {
        let isFullLine = true;
        for (let x = 0; x < width; x++) {
            if (!gameGrid.children[y * width + x].classList.contains('filled')) {
                isFullLine = false;
                break;
            }
        }
        if (isFullLine) {
            for (let x = 0; x < width; x++) {
                gameGrid.children[y * width + x].classList.remove('filled');
                gameGrid.children[y * width + x].style.backgroundColor = '';
            }
            const removed = Array.from(gameGrid.children).splice(y * width, width);
            removed.forEach(cell => gameGrid.removeChild(cell));
            for (let i = 0; i < width; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                gameGrid.insertBefore(cell, gameGrid.children[0]);
            }
            score += 100;
            scoreElement.innerText = 'Score: ' + score;
            y++;
        }
    }
}

function addScore() {
    score += 10;
    scoreElement.innerText = 'Score: ' + score;
}

function updateSpeed() {
    level = Math.floor(score / 100) + 1;
    levelElement.innerText = 'Level: ' + level;
    speed = Math.max(200, 1000 - level * 100);
}

function gameLoop() {
    clearTimeout(timer);
    moveDown();
    updateSpeed();
    if (!gameOver) {
        timer = setTimeout(gameLoop, speed);
    }
}

function endGame() {
    gameOver = true;
    clearTimeout(timer);
    finalScoreElement.innerText = score;
    gameOverModal.classList.remove('hidden');
    // Adding confetti (using a simple script for visualization)
    setTimeout(() => {
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 500);
}

restartButton.addEventListener('click', () => {
    location.reload();
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveLeft();
    } else if (event.key === 'ArrowRight') {
        moveRight();
    } else if (event.key === 'ArrowDown') {
        moveDown();
    } else if (event.key === ' ') {
        rotateTetromino();
    } else if (event.key === 'Enter') {
        dropTetromino();
    }
});

initializeGrid();
generateTetromino();
gameLoop();