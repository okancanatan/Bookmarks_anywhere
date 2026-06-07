const quiz = document.querySelector("#whale-quiz");
const result = document.querySelector("#quiz-result");
const lock = document.querySelector("#download-lock");
const downloadLink = document.querySelector("#download-link");
const preview = document.querySelector("#wallpaper-preview");
const previewImg = preview.querySelector("img");

const questions = quiz.querySelectorAll(".question");
const totalQuestions = questions.length;

function lockWallpaper() {
  preview.classList.add("is-locked");
  preview.classList.remove("is-unlocked");
  previewImg.removeAttribute("src");
  document.body.classList.remove("is-wallpaper-unlocked");
  downloadLink.hidden = true;
}

function unlockWallpaper() {
  preview.classList.remove("is-locked");
  preview.classList.add("is-unlocked");
  previewImg.src = previewImg.dataset.src;
  document.body.classList.add("is-wallpaper-unlocked");
  downloadLink.hidden = false;
}

function clearQuestionStates() {
  questions.forEach((question) => question.classList.remove("is-wrong"));
}

quiz.addEventListener("submit", (event) => {
  event.preventDefault();

  clearQuestionStates();
  lock.classList.remove("is-unlocked", "is-warning");

  const answeredAll = [...questions].every(
    (question) => question.querySelector('input[type="radio"]:checked')
  );

  const score = [...questions].filter((question) => {
    const selected = question.querySelector('input[type="radio"]:checked');
    return selected?.value === "right";
  }).length;

  if (!answeredAll) {
    lock.classList.add("is-warning");
    result.textContent = `Answer all ${totalQuestions} whale questions first.`;
    lockWallpaper();
    return;
  }

  if (score === totalQuestions) {
    lock.classList.add("is-unlocked");
    result.textContent = "Unlocked. You know your whales.";
    unlockWallpaper();
    return;
  }

  questions.forEach((question) => {
    const selected = question.querySelector('input[type="radio"]:checked');
    if (selected?.value !== "right") {
      question.classList.add("is-wrong");
    }
  });

  lock.classList.add("is-warning");
  result.textContent = `Not quite. You got ${score} of ${totalQuestions}. Try again.`;
  lockWallpaper();
});
