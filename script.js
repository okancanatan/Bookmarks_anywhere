const quiz = document.querySelector("#whale-quiz");
const result = document.querySelector("#quiz-result");
const lock = document.querySelector("#download-lock");
const downloadLink = document.querySelector("#download-link");
const preview = document.querySelector("#wallpaper-preview");
const previewImg = preview.querySelector(".preview-image");
const progress = document.querySelector("#quiz-progress");

const wallpaperSrc = previewImg.dataset.src;
const questions = quiz.querySelectorAll(".question");
const totalQuestions = questions.length;

function getAnsweredCount() {
  return [...questions].filter(
    (question) => question.querySelector('input[type="radio"]:checked')
  ).length;
}

function getScore() {
  return [...questions].filter((question) => {
    const selected = question.querySelector('input[type="radio"]:checked');
    return selected?.value === "right";
  }).length;
}

function lockWallpaper() {
  preview.classList.add("is-locked");
  preview.classList.remove("is-unlocked");
  previewImg.hidden = true;
  previewImg.removeAttribute("src");

  downloadLink.hidden = true;
  downloadLink.removeAttribute("href");
  downloadLink.setAttribute("aria-disabled", "true");
  downloadLink.setAttribute("tabindex", "-1");
}

function unlockWallpaper() {
  preview.classList.remove("is-locked");
  preview.classList.add("is-unlocked");
  previewImg.src = wallpaperSrc;
  previewImg.hidden = false;

  downloadLink.hidden = false;
  downloadLink.href = wallpaperSrc;
  downloadLink.removeAttribute("aria-disabled");
  downloadLink.removeAttribute("tabindex");
}

function updateQuestionStates() {
  questions.forEach((question) => {
    const selected = question.querySelector('input[type="radio"]:checked');
    question.classList.remove("is-wrong", "is-correct");

    if (!selected) {
      return;
    }

    if (selected.value === "right") {
      question.classList.add("is-correct");
      return;
    }

    question.classList.add("is-wrong");
  });
}

function checkQuiz() {
  const answeredCount = getAnsweredCount();
  const score = getScore();
  const answeredAll = answeredCount === totalQuestions;
  const passed = answeredAll && score === totalQuestions;

  updateQuestionStates();
  lock.classList.remove("is-unlocked", "is-warning");

  progress.textContent = `${answeredCount} of ${totalQuestions} answered`;

  if (!answeredAll) {
    result.textContent = "Answer every question to unlock the wallpaper.";
    lockWallpaper();
    return;
  }

  if (passed) {
    lock.classList.add("is-unlocked");
    progress.textContent = `${totalQuestions} of ${totalQuestions} correct`;
    result.textContent = "All answers correct. Your wallpaper is ready.";
    unlockWallpaper();
    return;
  }

  lock.classList.add("is-warning");
  progress.textContent = `${score} of ${totalQuestions} correct`;
  result.textContent = `${score} of ${totalQuestions} correct. Review the highlighted questions.`;
  lockWallpaper();
}

downloadLink.addEventListener("click", (event) => {
  if (getScore() !== totalQuestions) {
    event.preventDefault();
  }
});

quiz.addEventListener("change", checkQuiz);

checkQuiz();
