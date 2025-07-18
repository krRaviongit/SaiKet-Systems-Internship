const quizData = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Bangalore"],
    answer: "New Delhi"
  },
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "Which is not a programming language?",
    options: ["Python", "HTML", "Java", "C++"],
    answer: "HTML"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restartBtn");
const progressBar = document.getElementById("progress-bar");

function loadQuestion() {
  const current = quizData[currentQuestion];
  questionEl.innerText = current.question;
  optionsEl.innerHTML = "";

  quizData[currentQuestion].options.forEach(option => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.value = option;

    label.appendChild(radio);
    label.append(option);
    optionsEl.appendChild(label);
  });

  updateProgress();
}

function updateProgress() {
  const percent = ((currentQuestion) / quizData.length) * 100;
  progressBar.style.width = `${percent}%`;
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');

  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  const userAnswer = selected.value;
  const correctAnswer = quizData[currentQuestion].answer;

  const labels = optionsEl.querySelectorAll("label");

  labels.forEach(label => {
    const input = label.querySelector("input");
    if (input.value === correctAnswer) {
      label.classList.add("correct");
    } else if (input.checked) {
      label.classList.add("incorrect");
    }
    input.disabled = true;
  });

  if (userAnswer === correctAnswer) {
    score++;
  }

  nextBtn.disabled = true;
  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
      nextBtn.disabled = false;
      loadQuestion();
    } else {
      showScore();
    }
  }, 1000);
});

function showScore() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  nextBtn.style.display = "none";
  progressBar.style.width = "100%";
  resultEl.innerHTML = `🎉 Your score: <strong>${score}</strong> / ${quizData.length}`;
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  questionEl.style.display = "block";
  optionsEl.style.display = "block";
  nextBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
  resultEl.innerHTML = "";
  loadQuestion();
});

loadQuestion();
