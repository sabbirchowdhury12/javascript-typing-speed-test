const question = document.getElementById("question");
const startBtn = document.getElementById("starts");
const countdown = document.getElementById("countdown");
const showTime = document.getElementById("show-time");
const display = document.getElementById("display");

let questionText = "";
let errorCount = 0;
let startTime;
let userText = "";

// display question
fetch("/texts.json")
  .then((res) => res.json())
  .then((data) => {
    questionText = data[Math.floor(Math.random() * data.length)];
    question.textContent = questionText;
  });

//start
startBtn.onclick = () => {
  if (startTime) return;
  let count = 1;
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
  console.log(correctLetter);
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
};

const validateKey = (key) => {
  console.log(userText);
  console.log(questionText);
  if (key == questionText[userText.length - 1]) {
    return true;
  }
  return false;
};
//show time
setInterval(() => {
  const currentTime = Date.now();
  let time = (currentTime - startTime) / 1000;
  time = Math.floor(time);
  showTime.textContent = `${startTime ? Math.floor(time) : 0} seconds`;
}, 1000);
