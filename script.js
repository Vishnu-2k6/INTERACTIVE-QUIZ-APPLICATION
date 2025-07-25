// Developed by Athan — Codetech Internship Task 1 with Randomization & Explanation

let questions = [
  {
    question: "Which HTML tag is used for inserting an image?",
    options: ["<img>", "<src>", "<image>", "<picture>"],
    answer: "<img>",
    explanation: "The <img> tag is used to embed images in HTML."
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-weight", "font-size", "text-style", "text-size"],
    answer: "font-size",
    explanation: "The 'font-size' property sets the size of the text."
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "string", "function"],
    answer: "var",
    explanation: "'var' is a keyword used to declare variables in JavaScript (older syntax)."
  },
  {
    question: "Which of these is not a JavaScript data type?",
    options: ["Boolean", "String", "Float", "Undefined"],
    answer: "Float",
    explanation: "'Float' is not a direct JavaScript data type; numbers are all just 'Number'."
  },
  {
    question: "What is the purpose of the <head> tag in HTML?",
    options: [
      "Display content",
      "Store CSS/JS links",
      "Insert images",
      "Add body text"
    ],
    answer: "Store CSS/JS links",
    explanation: "The <head> tag holds metadata, styles, and scripts."
  },
  {
    question: "How do you apply a class selector in CSS?",
    options: [".className", "#className", "*className", "&className"],
    answer: ".className",
    explanation: "CSS class selectors use a dot (.) followed by the class name."
  },
  {
    question: "Which event is triggered when a user clicks a button?",
    options: ["onhover", "onchange", "onclick", "onsubmit"],
    answer: "onclick",
    explanation: "'onclick' is the JavaScript event triggered when a user clicks an element."
  },
  {
    question: "Which of these is used to loop in JavaScript?",
    options: ["loop()", "for", "repeat", "iterate"],
    answer: "for",
    explanation: "The 'for' loop is a standard way to iterate in JavaScript."
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Laravel", "React", "Flask", "Django"],
    answer: "React",
    explanation: "'React' is a popular JavaScript library for building UIs."
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Computer Styling Syntax",
      "Cascading Style Sheets",
      "Colorful Style Syntax"
    ],
    answer: "Cascading Style Sheets",
    explanation: "CSS stands for Cascading Style Sheets and is used to style HTML."
  }
];

let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  shuffledQuestions = shuffleArray(questions);
  currentIndex = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const currentQ = shuffledQuestions[currentIndex];
  questionEl.textContent = currentQ.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;

  const shuffledOptions = shuffleArray([...currentQ.options]);

  shuffledOptions.forEach(option => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.onclick = () => selectAnswer(btn, currentQ.answer, currentQ.explanation);
    li.appendChild(btn);
    optionsEl.appendChild(li);
  });
}

function selectAnswer(button, correctAnswer, explanation) {
  const allButtons = document.querySelectorAll(".option-btn");
  allButtons.forEach(btn => btn.disabled = true);

  if (button.textContent === correctAnswer) {
    button.style.backgroundColor = "#bbf7d0";
    feedbackEl.textContent = `✅ Correct! ${explanation}`;
    score++;
  } else {
    button.style.backgroundColor = "#fecaca";
    feedbackEl.textContent = `❌ Wrong! Correct: ${correctAnswer}. ${explanation}`;
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById("question-box").classList.add("hidden");
  nextBtn.classList.add("hidden");
  feedbackEl.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${shuffledQuestions.length}`;
}

function restartQuiz() {
  document.getElementById("question-box").classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  feedbackEl.classList.remove("hidden");
  resultBox.classList.add("hidden");
  startQuiz();
}

// Load first question on start
startQuiz();
