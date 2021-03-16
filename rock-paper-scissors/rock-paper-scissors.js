//GLOBAL
let selectedChoice;
let enemyChoice;
const allPlayerChoices = document.querySelectorAll(".choice");
const btn = document.querySelector("#startButton");
const enemy = document.querySelector("#enemy");
const resultMessage = document.querySelector("#resultMessage");
const score = { lost: 0, won: 0, draw: 0 };
// Step 1: GAME LOGIC
const choices = ["rock", "paper", "scissors"];

const winsAgainstObject = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
};

async function playTheGame() {
    resetMessage();
    resultMessage.innerHTML = "SHUFFLING";
    await enemyTurn();

    if (winsAgainstObject[selectedChoice] === enemyChoice) {
        score.won += 1;
        document.getElementById("won").innerHTML = score.won;
        setMessage("YOU WON");
    }
    if (selectedChoice === enemyChoice) {
        score.draw += 1;
        document.getElementById("draw").innerHTML = score.draw;
        setMessage("DRAW");
    }
    if (winsAgainstObject[enemyChoice] === selectedChoice) {
        score.lost += 1;
        document.getElementById("lost").innerHTML = score.lost;
        setMessage("YOU LOST");
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Step2:  UI LOGIC Player

for (choice of allPlayerChoices) {
    choice.addEventListener("click", selectChoice);
}

function selectChoice(e) {
    selectedChoice = e.target.id;
    markSelectedChoice(e.target);
    activateStartButton();
}

function markSelectedChoice(el) {
    removeSelection();
    el.parentElement.classList.add("selected");
}

function setMessage(msg) {
    resultMessage.innerHTML = msg;
}

function removeSelection() {
    for (choice of allPlayerChoices) {
        choice.classList.remove("bordered");
        choice.parentElement.classList.remove("selected");
    }
}

function resetMessage() {
    resultMessage.innerHTML = "";
}

function activateStartButton() {
    btn.innerHTML = "Start game";
    btn.disabled = false;
    btn.onclick = playTheGame;
}

function resetGame() {
    btn.innerHTML = "pick a choice";
    btn.disabled = true;

    removeSelection();
    resetMessage();
    selectedChoice = undefined;
}

//Step3 UI Logic Enemy
function enemyTurn() {
    return new Promise((resolve) => {
        const enemyShuffle = setInterval(shuffle, 200);
        setTimeout(() => {
            clearInterval(enemyShuffle);
            resolve();
        }, 1000);
    });
}

function shuffle() {
    const choice = getRandomInt(0, 2);
    enemy.src = choices[choice] + ".png";
    enemyChoice = choices[choice];
}