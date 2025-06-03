
const questions = [
{ word: "fresa", image: "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg", options: ["fresa", "sandía"] },
  { word: "sandía", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Watermelon_cross_BNC.jpg", options: ["melón", "sandía"] },
  { word: "piña", image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Pineapple_and_cross_section.jpg", options: ["piña", "limón"] },
  { word: "limón", image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Lemon-Whole-Split.jpg", options: ["naranja", "limón"] },
  { word: "naranja", image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg", options: ["naranja", "mandarina"] },
  { word: "zapato", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Black_Shoes.jpg", options: ["zapato", "sombrero"] },
  { word: "sombrero", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Hat_on_hook.jpg", options: ["sombrero", "guante"] },
  { word: "guante", image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Gloves_icon.png", options: ["guante", "calcetín"] },
  { word: "calcetín", image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Socks.jpg", options: ["camisa", "calcetín"] },
  { word: "camisa", image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/White_Shirt.jpg", options: ["camisa", "pantalón"] },
  { word: "pantalón", image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Jeans_for_women.jpg", options: ["falda", "pantalón"] },
  { word: "falda", image: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Skirt_2020.jpg", options: ["vestido", "falda"] },
  { word: "vestido", image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Dress_in_pink.jpg", options: ["vestido", "abrigo"] },
  { word: "abrigo", image: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Winter_coat_black.jpg", options: ["abrigo", "bufanda"] },
  { word: "bufanda", image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Woollen_scarf.jpg", options: ["bufanda", "gorra"] },
  { word: "gorra", image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Baseball_cap.jpg", options: ["sombrero", "gorra"] },
  { word: "vaso", image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Glass_water.jpg", options: ["vaso", "botella"] },
  { word: "botella", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Water_bottle.jpg", options: ["botella", "caja"] },
  { word: "caja", image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Cardboard_box.jpg", options: ["caja", "bolsa"] },
  { word: "bolsa", image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Shopping_bag.jpg", options: ["bolsa", "silla"] },
  { word: "silla", image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Wooden_chair.jpg", options: ["mesa", "silla"] },
  { word: "mesa", image: "https://upload.wikimedia.org/wikipedia/commons/5/54/Table.jpg", options: ["cama", "mesa"] },
  { word: "cama", image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Modern_bed.jpg", options: ["cama", "sofá"] },
  { word: "sofá", image: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Red_Sofa.jpg", options: ["silla", "sofá"] },
  { word: "reloj", image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Wristwatch.jpg", options: ["reloj", "cuadro"] },
  { word: "cuadro", image: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Painting_icon.png", options: ["cuadro", "lámpara"] },
  { word: "lámpara", image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Lamp_icon.png", options: ["televisión", "lámpara"] },
  { word: "televisión", image: "https://upload.wikimedia.org/wikipedia/commons/5/53/TV_icon.png", options: ["radio", "televisión"] },
  { word: "radio", image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Radio_icon_2.png", options: ["teléfono", "radio"] },
  { word: "teléfono", image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Smartphone_icon.png", options: ["teléfono", "ratón"] }
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
