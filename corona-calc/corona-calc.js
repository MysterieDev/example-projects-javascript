const days = document.getElementById("days");
const growthrate = document.getElementById("growthrate");
const start = document.getElementById("start");
const result = document.getElementById("result");
growthrate.value = 1.1;
start.value = 1;
days.value = 1;

days.addEventListener("input", updateDaysView);
const daysView = document.getElementById("daysView");

days.addEventListener("input", calculateRate);
growthrate.addEventListener("input", calculateRate);
start.addEventListener("input", calculateRate);

function updateDaysView() {
    daysView.innerHTML = days.value;
}

function calculateRate() {
    result.innerHTML = Math.floor(
        start.value * Math.pow(growthrate.value, days.value)
    );
}