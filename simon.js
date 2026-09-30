let gameSeq = [];
let userSeq = [];

const btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

const h2 = document.querySelector("h2");
const allBtns = document.querySelectorAll(".btn");

// Start the game when the user presses any key.
document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randIdx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randIdx];
    const randBtn = document.querySelector(`.btn.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart.`;

        document.body.style.backgroundColor = "red";

        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress() {
    if (!started) return;

    const btn = this;
    userFlash(btn);

    const userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

for (const btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
