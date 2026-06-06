const notes = [
  "Today is a good day to start small.",
  "Clean page, clear mind.",
  "A little website with room to grow.",
  "Hello from plain HTML, CSS, and JavaScript."
];

const note = document.querySelector("#daily-note");
const button = document.querySelector(".spark-button");

function showRandomNote() {
  const nextNote = notes[Math.floor(Math.random() * notes.length)];
  note.textContent = nextNote;
}

button.addEventListener("click", showRandomNote);
showRandomNote();
