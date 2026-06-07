const quiz = document.querySelector("#whale-quiz");
const result = document.querySelector("#quiz-result");
const lock = document.querySelector("#download-lock");
const downloadLink = document.querySelector("#download-link");

const totalQuestions = 3;

quiz.addEventListener("submit", (event) => {
  event.preventDefault();

  const answers = new FormData(quiz);
  const score = Array.from(answers.values()).filter((answer) => answer === "right").length;
  const answeredAll = [...answers.keys()].length === totalQuestions;

  lock.classList.remove("is-unlocked", "is-warning");

  if (!answeredAll) {
    lock.classList.add("is-warning");
    result.textContent = "Answer all three whale questions first.";
    downloadLink.hidden = true;
    return;
  }

  if (score === totalQuestions) {
    lock.classList.add("is-unlocked");
    result.textContent = "Unlocked. You know your whales.";
    downloadLink.hidden = false;
    return;
  }

  lock.classList.add("is-warning");
  result.textContent = `Not quite. You got ${score} of ${totalQuestions}. Try again.`;
  downloadLink.hidden = true;
});
