// bring in all relevant interaction Elements
const startButton = document.getElementById("startButton");
const iconSelection = document.querySelector("#iconSelection");
const headline = document.querySelectorAll("#headline");
const inputFields = document.querySelector("#inputFields");

startButton.addEventListener("click", setup);

function setup() {
    allIcons = document.querySelectorAll(".iconify");
    for (icon of allIcons) {
        icon.addEventListener("click", bringToCenter);
    }
    //get Rid of Setup Button
    startButton.removeEventListener("click", setup);
    startButton.parentElement.outerHTML = "";
    iconSelection.innerHTML = "Select an icon";
    //bring in inputs
    inputFields.innerHTML = `
    <label>Farbe</label>
    <input id="iconColor" type="color"> 
    <label>Text</label>
    <input id="iconText" type="text">`;
    //react on inputs
    document.querySelector("#iconColor").addEventListener("change", changeColor);
    document.querySelector("#iconText").addEventListener("change", changeText);
}

function bringToCenter(e) {
    const selection = e.target.closest("svg").getAttribute("data-icon");
    //Iconify Icon
    iconSelection.innerHTML = `
        <p id="iconSelectionText"></p>
        <div class="container">
        <span class="iconify" data-icon="${selection.trim()}"
         data-inline="false"></span>
        </div>`;
    //if we switch icons - update value
    changeColor();
    changeText();
}

function changeColor() {
    iconSelection.style.color = document.querySelector("#iconColor").value;
}

function changeText() {
    iconSelection.querySelector(
        "#iconSelectionText"
    ).innerText = document.querySelector("#iconText").value;
}

//FÜR SCREENSHOT DEVTOOLS -> KNOTEN AUSWÄHLEN -> STRG/CMD + shift + P --> screenshot vom knoten