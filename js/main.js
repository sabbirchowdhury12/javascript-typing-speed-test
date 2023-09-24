const question = document.getElementById("question");

// display question
fetch("/texts.json")
  .then((res) => res.json())
  .then((data) => {
    const questionText = data[Math.floor(Math.random() * data.length)];
    console.log(question);
    question.textContent = questionText;
  });
