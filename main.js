const question = document.getElementById("question");
const startBtn = document.getElementById("starts");
const countdown = document.getElementById("countdown");
const showTime = document.getElementById("show-time");
const display = document.getElementById("display");
const result = document.getElementById("result");
const modal = document.getElementById("modal-background");
const histories = document.getElementById("histories");

let questionText = "";
let errorCount = 0;
let startTime = null;
let userText = "";

// display question
fetch("/texts.json")
  .then((res) => res.json())
  .then((data) => {
    questionText = data[Math.floor(Math.random() * data.length)];
    question.textContent = questionText;
  });

function addHistory(questionText, timeTaken, errorCount) {
  console.log("hi");
}

const typeController = (e) => {
  const newKey = e.key;

  if (newKey == "Backspace") {
    userText = userText.slice(0, userText.length - 1);
    return display.removeChild(display.lastChild);
  }

  const validLetters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890!@#$%^&*()_+-={}[]'\".,?";
  if (!validLetters.includes(newKey)) {
    return;
  }

  userText += newKey;

  const correctLetter = validateKey(newKey);

  if (correctLetter) {
    display.innerHTML += `<span class="green">${
      newKey == " " ? "-" : newKey
    } </span>`;
  } else {
    display.innerHTML += `<span class="red">${
      newKey == " " ? "-" : newKey
    } </span>`;
    errorCount++;
  }

  if (userText === questionText) {
    endGame();
  }
};

const endGame = () => {
  document.removeEventListener("keydown", typeController);

  modal.classList.remove("hidden");
  result.classList.remove("hidden");
  result.style.top = "50%";
  result.style.left = "50%";
  const currentTime = Date.now();
  const timeTaken = Math.floor((currentTime - startTime) / 1000);
  result.innerHTML = `
      <h1>Finished!</h1>
      <p>You took: <span class="bold">${timeTaken}</span> seconds</p>
      <p>You made <span class="bold red">${errorCount}</span> mistakes</p>
      <button onclick="closeModal()">Close</button>
    `;

  // Call addHistory with the appropriate values
  let history = [];
  const previousHistory = JSON.parse(localStorage.getItem("History")) || [];

  history = [...previousHistory, { questionText, timeTaken, errorCount }];
  localStorage.setItem("History", JSON.stringify(history));

  displayHistory();
  display.classList.add("inactive");
  display.innerHTML = "";
  errorCount = 0;
  startTime = null;
  userText = "";
};

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
      startTime = Date.now(); // Set the start time when the game starts
    }
    count--;
  }, 1000);
};

const displayHistory = () => {
  let history = JSON.parse(localStorage.getItem("History"));
  histories.innerHTML = "";
  const row = history.forEach((element) => {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    ${element.questionText}<br>
    you took ${element.timeTaken} seconds. <br>
    Mistake: ${element.errorCount}
    `;

    histories.appendChild(div);
  });
};

displayHistory();

const closeModal = () => {
  modal.classList.add("hidden");
  result.classList.add("hidden");
};

const validateKey = (key) => {
  if (key == questionText[userText.length - 1]) {
    return true;
  }
  return false;
};

// let history = [];
// const previousHistory = JSON.parse(localStorage.getItem("History")) | [];

// history = [...previousHistory, { text, time, error }];
// localStorage.setItem("History", JSON.stringify(history));

// //show time
// setInterval(() => {
//   const currentTime = Date.now();
//   let time = (currentTime - startTime) / 1000;
//   time = Math.floor(time);
//   showTime.innerHTML = `${startTime ? Math.floor(time) : 0} seconds`;
// }, 1000);
