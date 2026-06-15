import { quizQuestions } from "./quizData.js";

let currentQuestionIndex = 0;
let score = 0;
let isQuizActive = false;
let setMarkersVisibility = null;
let activeQuizBatch = [];

let overlay, questionText, feedbackText, scoreDisplay, progressDisplay;
let btnStart, btnStop, btnSkip, btnHint;

export function initQuizSystem(markerToggleFunc) {
  setMarkersVisibility = markerToggleFunc;
  
  // Select elements here to ensure they are available
  overlay = document.getElementById("quizMissionOverlay");
  questionText = document.getElementById("quizQuestionText");
  feedbackText = document.getElementById("quizFeedback");
  scoreDisplay = document.getElementById("quizScore");
  progressDisplay = document.getElementById("quizProgress");
  
  btnStart = document.getElementById("btnStartQuiz");
  btnStop = document.getElementById("btnStopQuiz");
  btnSkip = document.getElementById("btnSkipQuiz");
  btnHint = document.getElementById("btnHintQuiz");

  if (btnStart) btnStart.onclick = () => startQuiz();
  if (btnStop) btnStop.onclick = () => stopQuiz();
  if (btnSkip) btnSkip.onclick = () => skipQuestion();
  if (btnHint) btnHint.onclick = () => showHint();
}

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function showHint() {
  if (!isQuizActive || !feedbackText) return;
  const q = activeQuizBatch[currentQuestionIndex];
  
  feedbackText.textContent = `Hint: ${q.hint}`;
  feedbackText.style.color = "#f1c40f"; // Distinct yellow for hints
  feedbackText.style.opacity = "1";
  
  setTimeout(() => {
    if (feedbackText.textContent.startsWith("Hint:")) {
      feedbackText.textContent = "";
      feedbackText.style.color = "";
    }
  }, 4000);
}

function updateQuizUI() {
  if (currentQuestionIndex < activeQuizBatch.length) {
    const q = activeQuizBatch[currentQuestionIndex];
    questionText.textContent = q.question;
    if (scoreDisplay) scoreDisplay.textContent = score;
    if (progressDisplay) progressDisplay.textContent = `${currentQuestionIndex + 1}/${activeQuizBatch.length}`;
    if (feedbackText) {
      feedbackText.textContent = "";
      feedbackText.style.color = "";
    }
  }
}

function startQuiz() {
  activeQuizBatch = shuffleArray(quizQuestions).slice(0, 5);
  isQuizActive = true;
  currentQuestionIndex = 0;
  score = 0;
  
  const sideDrawer = document.getElementById("sideDrawer");
  if (sideDrawer) sideDrawer.classList.add("closed");

  if (setMarkersVisibility) {
    setMarkersVisibility(true);
    const markerBtn = document.getElementById("toggleMarkersBtn");
    if (markerBtn) markerBtn.classList.add("active");
  }

  if (overlay) overlay.classList.remove("hidden");
  if (btnStart) btnStart.classList.add("hidden");
  if (btnStop) btnStop.classList.remove("hidden");
  if (btnStop) btnStop.textContent = "End Quiz";
  
  updateQuizUI();
}

function stopQuiz() {
  isQuizActive = false;
  if (overlay) overlay.classList.add("hidden");
  if (btnStart) btnStart.classList.remove("hidden");
  if (btnStop) btnStop.classList.add("hidden");
  
  const sideDrawer = document.getElementById("sideDrawer");
  if (sideDrawer) sideDrawer.classList.remove("closed");

  if (setMarkersVisibility) {
    setMarkersVisibility(false);
    const markerBtn = document.getElementById("toggleMarkersBtn");
    if (markerBtn) markerBtn.classList.remove("active");
  }
}

function skipQuestion() {
  if (!isQuizActive) return;
  currentQuestionIndex++;
  if (currentQuestionIndex < activeQuizBatch.length) {
    updateQuizUI();
  } else {
    finishQuiz();
  }
}

export function handleMarkerClick(markerId) {
  if (!isQuizActive) return false;

  const q = activeQuizBatch[currentQuestionIndex];
  if (markerId === q.targetMarker) {
    handleCorrectAnswer();
  } else {
    handleIncorrectAnswer();
  }
  
  return true;
}

function handleCorrectAnswer() {
  score += 10;
  if (scoreDisplay) scoreDisplay.textContent = score;
  if (feedbackText) {
    feedbackText.textContent = "CORRECT! ✨";
    feedbackText.style.color = "#2ecc71";
  }
  
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < activeQuizBatch.length) {
      updateQuizUI();
    } else {
      finishQuiz();
    }
  }, 1200);
}

function handleIncorrectAnswer() {
  if (feedbackText) {
    feedbackText.textContent = "TRY AGAIN ❌";
    feedbackText.style.color = "#e74c3c";
  }
  setTimeout(() => {
    if (isQuizActive && feedbackText && !feedbackText.textContent.startsWith("Hint:")) {
      feedbackText.textContent = "";
    }
  }, 800);
}

function finishQuiz() {
  if (questionText) questionText.textContent = "Congratulations! Quiz Complete!";
  if (feedbackText) {
    feedbackText.textContent = `Final Score: ${score}`;
    feedbackText.style.color = "#2ecc71";
  }
  
  if (scoreDisplay) scoreDisplay.textContent = score;
  if (progressDisplay) progressDisplay.textContent = `${activeQuizBatch.length}/${activeQuizBatch.length}`;
  
  if (btnStop) btnStop.textContent = "Finish";
}
