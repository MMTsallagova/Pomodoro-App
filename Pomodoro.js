const timer_type_pomodoro = "Pomodoro";
const timer_type_shortbreak = "Shortbreak";
const timer_type_longbreak = "Longbreak";
let timerType = timer_type_pomodoro;

const pomodoroTimeInSec = 1500; //60 sec * 25 min
const shortBreakTimeInSec = 300;
const longBreakTimeInSec = 900;
let progressInterval;

let timerValue = pomodoroTimeInSec;
let multipleFactor = 360 / timerValue;

let allTypes = document.querySelectorAll(".app-container .option-bar button");

let timer = document.querySelector(".app-container .timer .timer-inner h3");
let startButton = document.querySelector(".app-container .pause-setting-bar #start-button");

let stopButton = document.querySelector(".app-container .pause-setting-bar #stop-button");
let resetButton = document.querySelector(".app-container .pause-setting-bar #reset-button");
let timerProgressBar = document.querySelector(".app-container .timer")
function getType (elem, type){
    for( let x of allTypes)
    {
        x.classList.remove("active");
    }
    elem.classList.add("active");
    timerType = type;

    timerValue = pomodoroTimeInSec;
    resetTimer();
}
function resetTimer () {
    clearInterval(progressInterval);
    startButton.style.display = "block";
    stopButton.style.display = "none";
    if (timerType === "Pomodoro"){
        timerValue = pomodoroTimeInSec;
    }
    else if (timerType === "Shortbreak"){
        timerValue = shortBreakTimeInSec;
    }
    else if (timerType === "Longbreak")
    {
        timerValue = longBreakTimeInSec;
    }
    multipleFactor = 360 / timerValue;
    timerProgress();
}
let FormatedNumberInMinutes =(number) =>
{
    let minutes = Math.trunc( number/60).toString().padStart(2, '0');
    let seconds = Math.trunc(number % 60).toString().padStart(2, '0');
    return `${minutes} : ${seconds}`;
}
let timerProgress =()=>{

    timer.innerHTML = `${FormatedNumberInMinutes(timerValue)}`;
    timerProgressBar.style.background = `conic-gradient(#664efe ${timerValue * multipleFactor}deg, #422f66 0deg)`;
}
let startTimer =()=> {

    progressInterval = setInterval(() => {
        timerValue--;
        timerProgress();
    }, 1000);
    startButton.style.display = "none";
    stopButton.style.display = "block";
}

let stopTimer =() =>
{
    clearInterval(progressInterval);
    startButton.style.display = "block";
    stopButton.style.display = "none";
}
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer)

document.querySelector("#Pomodoro-button").addEventListener("click", function () {
    getType(this, timer_type_pomodoro);
});
document.querySelector("#short-break-button").addEventListener("click", function () {
    getType(this, timer_type_shortbreak);
});
document.querySelector("#long-break-button").addEventListener("click", function () {
    getType(this, timer_type_longbreak);
});
