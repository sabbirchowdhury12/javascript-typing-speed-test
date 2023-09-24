const question = document.getElementById("question");
const startBtn = document.getElementById("starts");
const countdown = document.getElementById("countdown");
const showTime = document.getElementById("show-time");
const display = document.getElementById("display");

let startTime;
let userText;

// display question
fetch("/texts.json")
  .then((res) => res.json())
  .then((data) => {
    const questionText = data[Math.floor(Math.random() * data.length)];
    question.textContent = questionText;
  });

//start
startBtn.onclick = () => {
  if (startTime) return;
  let count = 3;
  countdown.style.display = "flex";

  const startCountDown = setInterval(() => {
    countdown.textContent = count;

    if (count < 0) {
      document.addEventListener("keydown", typeController);
      countdown.style.display = "none";
      countdown.textContent = "";
      display.classList.remove("inactive");
      clearInterval(startCountDown);
      //   startTime = new Date().getTime();
      startTime = Date.now();
    }
    count--;
  }, 1000);
};

const typeController = (e) => {
  const 
};
//show time

setInterval(() => {
  const currentTime = Date.now();
  let time = (currentTime - startTime) / 1000;
  time = Math.floor(time);
  showTime.textContent = `${startTime ? Math.floor(time) : 0} seconds`;
}, 1000);
