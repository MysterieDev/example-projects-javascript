// PART 1 basics and shoot the ball
const ball = document.querySelector("#ball");
const ballDiv = document.querySelector("#ellipse-div");
const actionBtn = document.querySelector("#actionButton");
const actionBtnDiv = document.querySelector(".actionButtonStyle");
const root = document.documentElement;
const screenOffsetX = parseInt(offset(ball).left);

//start game
nextShot();

function changeDirection() {
    const ballYPosition = offset(ball);
    const ballDivPosition = offset(ballDiv);
    ball.style.top = parseInt(ballYPosition.top) - parseInt(ballDivPosition.top);
    ball.classList.remove("shootY");
    ball.onclick = shoot;
    ball.classList.add("shootX");
}

function shoot() {
    ball.onclick = "";
    ball.style.left = calculateXPosition();
    //current position
    const yPosition = parseInt(ball.style.top);
    //offset for throw
    const newYPosition = yPosition - 320;
    //set ball top new position
    ball.style.top = newYPosition;
    root.style.setProperty("--top", yPosition + "px");
    root.style.setProperty("--topShot", newYPosition + "px");
    //remove x-axis animation
    ball.classList.remove("shootX");
    //do throw animation
    ball.classList.add("Shoot");
    setTimeout(evaluateShot, 1100);
}

function calculateXPosition() {
    const ballXOffset = parseInt(offset(ball).left);
    if (ballXOffset > screenOffsetX) {
        return ballXOffset - screenOffsetX;
    }
    return -(screenOffsetX - ballXOffset);
}

function offset(el) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

//PART 2 - REMOVE CUPS THAT ARE A HIT
function evaluateShot() {
    const ballXOffset = parseInt(offset(ball).left);
    const ballYOffset = parseInt(offset(ball).top);
    const cupPositions = [];
    document
        .querySelectorAll(".beerCup")
        .forEach((el) => cupPositions.push({...offset(el), reference: el }));

    cupPositions
        .filter((cup) => {
            console.log("top", ballYOffset - cup.top, "left", ballXOffset - cup.left);
            // Evaluating the shot works by checking the offset from the top and from the left of the screen
            //To hit a cup we need to be in a certain range close to similar to the cups top and left offset
            console.log(
                ballXOffset - cup.left > 0 &&
                ballXOffset - cup.left < 25 &&
                ballYOffset - cup.top < 5 &&
                ballYOffset - cup.top > -20
            );
            if (
                ballXOffset - cup.left > 0 &&
                ballXOffset - cup.left < 25 &&
                ballYOffset - cup.top < 5 &&
                ballYOffset - cup.top > -24
            ) {
                return true;
            } else {
                return false;
            }
        })
        .map((cup) => {
            cup.reference.outerHTML = "";
        });

    showNextAction();
}

//Part 3 - restart

function nextShot() {
    actionBtnDiv.style = "display:none;";
    ball.style = "";
    ball.classList.remove("Shoot");
    ball.classList.add("shootY");
    ball.onclick = changeDirection;
    doesRowStillHaveCups();
}

function doesRowStillHaveCups() {
    document.querySelectorAll(".cup-row").forEach((el) => {
        const remainingCups = el.querySelectorAll(".beerCup");
        if (remainingCups.length === 0) el.style = "padding-bottom:50px;";
    });
}

function allCupsShot() {
    if (document.querySelectorAll(".beerCup").length === 0) {
        return true;
    }
    return false;
}

//Part 4 nextActions

function showNextAction() {
    if (allCupsShot()) {
        actionBtn.onclick = refreshPage;
        actionBtn.innerHTML = "Nächste Runde?";
    } else {
        actionBtn.onclick = nextShot;
    }
    actionBtnDiv.style = "display:block;";
}

function refreshPage() {
    window.location.reload();
}