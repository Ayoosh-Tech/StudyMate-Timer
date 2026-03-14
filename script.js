let totalTime = 1500;
let time = totalTime;

let timer;

let running = false;

function updateDisplay(){

let minutes = Math.floor(time / 60);
let seconds = time % 60;

document.getElementById("time").textContent =
`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

updateCircle();

}

function updateCircle(){

let percent = (totalTime - time) / totalTime;

let deg = percent * 360;

document.querySelector(".circle").style.background =
`conic-gradient(#ff6b6b ${deg}deg, rgba(255,255,255,0.1) ${deg}deg)`;

}

document.getElementById("startBtn").onclick = function(){

if(!running){

timer = setInterval(()=>{

time--;

updateDisplay();

if(time <= 0){

clearInterval(timer);

speechSynthesis.speak(
new SpeechSynthesisUtterance("Focus session completed")
);

}

},1000);

running = true;

}

};

document.getElementById("pauseBtn").onclick = function(){

clearInterval(timer);

running = false;

};

function setTime(seconds){

totalTime = seconds;

time = seconds;

updateDisplay();

}

updateDisplay();

const voiceBtn = document.getElementById("voiceBtn");
const voiceStatus = document.getElementById("voiceStatus");

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-US";

voiceBtn.onclick = () => {

recognition.start();

voiceStatus.textContent = "Listening...";

};

recognition.onresult = function(event){

let command = event.results[0][0].transcript.toLowerCase();

voiceStatus.textContent = "You said: " + command;

handleCommand(command);

};

function handleCommand(command){

if(command.includes("start")){

document.getElementById("startBtn").click();

}

else if(command.includes("pause")){

document.getElementById("pauseBtn").click();

}

else if(command.includes("reset")){

document.getElementById("resetBtn").click();

}

else if(command.includes("25")){

setTime(1500);

}

else if(command.includes("5")){

setTime(300);

}

else if(command.includes("15")){

setTime(900);

}

}

document.getElementById("resetBtn").onclick = function(){

clearInterval(timer);

running = false;

time = totalTime;

updateDisplay();

}