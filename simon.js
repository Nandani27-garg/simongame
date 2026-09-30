let gameSeq = [];
let userSeq = [];

const btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let acceptingInput = false;

const h2 = document.querySelector("#game-status");
const startBtn = document.querySelector("#start-btn");
const allBtns = document.querySelectorAll(".btn");

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 200);
}

function playSequence() {
    acceptingInput = false;

    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            const btn = document.querySelector("#" + color);
            gameFlash(btn);
        }, 600 * index);
    });

    setTimeout(() => {
        acceptingInput = true;
    }, 600 * gameSeq.length);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randomColor = btns[Math.floor(Math.random() * btns.length)];
    gameSeq.push(randomColor);

    playSequence();
}

function startGame() {
    if (started) return;

    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h2.innerText = "Get ready...";
    startBtn.textContent = "Restart Game";

    setTimeout(levelUp, 700);
}

function checkAns(idx) {
    if (userSeq[idx] !== gameSeq[idx]) {
        gameOver();
        return;
    }

    if (userSeq.length === gameSeq.length) {
        acceptingInput = false;
        setTimeout(levelUp, 900);
    }
}

function btnPress() {
    if (!started || !acceptingInput) return;

    const btn = this;
    const userColor = btn.id;

    userFlash(btn);
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

function gameOver() {
    started = false;
    acceptingInput = false;

    h2.innerHTML = `Game Over! Your score was <b>${level}</b>`;
    document.body.classList.add("game-over");

    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 300);

    startBtn.textContent = "Play Again";
}

allBtns.forEach((btn) => {
    btn.addEventListener("click", btnPress);
});

startBtn.addEventListener("click", startGame);

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        startGame();
    } else if (!started) {
        startGame();
    }
});
