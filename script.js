
const questions = [
  { word: "manzana", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg", options: ["manzana", "pera"] },
  { word: "gato", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg", options: ["perro", "gato"] },
  { word: "avion", image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Airplane_silhouette.png", options: ["barco", "avion"] },
  { word: "perro", image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Collage_of_Nine_Dogs.jpg", options: ["gato", "perro"] },
  { word: "flor", image: "https://upload.wikimedia.org/wikipedia/commons/5/50/Flower_poster_2.jpg", options: ["flor", "zapato"] }
];

let current = 0;

function loadQuestion() {
  const q = questions[current];
  document.getElementById("image").src = q.image;

  const shuffled = q.options.sort(() => 0.5 - Math.random());
  const buttons = document.querySelectorAll(".option");
  buttons.forEach((btn, i) => {
    btn.textContent = shuffled[i];
    btn.dataset.correct = shuffled[i] === q.word;
  });

  document.getElementById("message").textContent = "";
}

function checkAnswer(button) {
  const correct = button.dataset.correct === "true";
  const message = document.getElementById("message");

  if (correct) {
    message.textContent = "¡Muy bien!";
    speakWord(questions[current].word);
    setTimeout(() => {
      current = (current + 1) % questions.length;
      loadQuestion();
    }, 2000);
  } else {
    message.textContent = "¡Inténtalo de nuevo!";
  }
}

function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "es-ES";
  speechSynthesis.speak(utterance);
}

window.onload = loadQuestion;
