<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Adivina la Palabra</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      text-align: center;
      background-color: #fef6e4;
      padding: 20px;
    }
    h1 {
      color: #f582ae;
    }
    img {
      width: 200px;
      height: 200px;
      object-fit: contain;
      margin: 20px;
    }
    .options {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
    }
    .option {
      background-color: #8bd3dd;
      border: none;
      padding: 15px 25px;
      font-size: 18px;
      border-radius: 12px;
      cursor: pointer;
    }
    .message {
      font-size: 24px;
      margin-top: 20px;
    }
  </style>
</head>
<body>

<h1>¡Adivina la Palabra!</h1>
<div id="game">
  <img id="image" src="" alt="Imagen" />
  <div class="options">
    <button class="option" onclick="checkAnswer(this)"></button>
    <button class="option" onclick="checkAnswer(this)"></button>
  </div>
  <div class="message" id="message"></div>
</div>

<script>
const questions = [
  { word: "fresa", image: "https://cdn.pixabay.com/photo/2016/06/15/14/43/strawberry-1454320_1280.jpg", options: ["fresa", "sandía"] },
  { word: "sandía", image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/watermelon-1238253_1280.jpg", options: ["melón", "sandía"] },
  { word: "piña", image: "https://cdn.pixabay.com/photo/2017/03/12/13/41/pineapple-2138949_1280.jpg", options: ["piña", "limón"] },
  { word: "limón", image: "data:image/jpeg;base64,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", options: ["naranja", "limón"] },
  { word: "naranja", image: "https://cdn.pixabay.com/photo/2016/07/27/07/20/orange-1541419_1280.jpg", options: ["naranja", "mandarina"] },
  { word: "zapato", image: "https://cdn.pixabay.com/photo/2016/11/29/05/32/shoes-1869263_1280.jpg", options: ["zapato", "sombrero"] },
  { word: "sombrero", image: "https://cdn.pixabay.com/photo/2014/12/27/15/40/hat-581961_1280.jpg", options: ["sombrero", "guante"] },
  { word: "guante", image: "https://cdn.pixabay.com/photo/2018/04/23/15/20/gloves-3346956_1280.jpg", options: ["guante", "calcetín"] },
  { word: "calcetín", image: "https://cdn.pixabay.com/photo/2017/01/20/00/30/socks-1995030_1280.jpg", options: ["camisa", "calcetín"] },
  { word: "camisa", image: "https://cdn.pixabay.com/photo/2016/03/27/07/08/shirt-1284377_1280.jpg", options: ["camisa", "pantalón"] },
  { word: "pantalón", image: "https://cdn.pixabay.com/photo/2016/03/27/07/39/jeans-1284385_1280.jpg", options: ["falda", "pantalón"] },
  { word: "falda", image: "https://cdn.pixabay.com/photo/2017/01/10/03/33/skirt-1960934_1280.jpg", options: ["vestido", "falda"] },
  { word: "vestido", image: "https://cdn.pixabay.com/photo/2017/07/10/19/14/dress-2498133_1280.jpg", options: ["vestido", "abrigo"] },
  { word: "abrigo", image: "https://cdn.pixabay.com/photo/2016/03/27/19/56/jacket-1284423_1280.jpg", options: ["abrigo", "bufanda"] },
  { word: "bufanda", image: "https://cdn.pixabay.com/photo/2016/10/06/08/36/scarf-1711017_1280.jpg", options: ["bufanda", "gorra"] },
  { word: "gorra", image: "https://cdn.pixabay.com/photo/2016/01/22/22/10/cap-1152709_1280.jpg", options: ["sombrero", "gorra"] },
  { word: "vaso", image: "https://cdn.pixabay.com/photo/2014/04/03/10/32/water-310354_1280.png", options: ["vaso", "botella"] },
  { word: "botella", image: "https://cdn.pixabay.com/photo/2014/03/25/17/22/bottle-297273_1280.png", options: ["botella", "caja"] },
  { word: "caja", image: "https://cdn.pixabay.com/photo/2013/07/12/18/46/cardboard-box-153645_1280.png", options: ["caja", "bolsa"] },
  { word: "bolsa", image: "https://cdn.pixabay.com/photo/2018/10/02/19/38/shopping-bag-3724848_1280.png", options: ["bolsa", "silla"] },
  { word: "silla", image: "https://cdn.pixabay.com/photo/2014/04/03/10/30/chair-310352_1280.png", options: ["mesa", "silla"] },
  { word: "mesa", image: "https://cdn.pixabay.com/photo/2014/04/03/10/30/table-310351_1280.png", options: ["cama", "mesa"] },
  { word: "cama", image: "https://cdn.pixabay.com/photo/2017/01/31/18/35/bed-2028118_1280.jpg", options: ["cama", "sofá"] },
  { word: "sofá", image: "https://cdn.pixabay.com/photo/2017/08/07/22/19/sofa-2607881_1280.jpg", options: ["silla", "sofá"] },
  { word: "reloj", image: "https://cdn.pixabay.com/photo/2014/04/02/16/34/watch-306190_1280.png", options: ["reloj", "cuadro"] },
  { word: "cuadro", image: "https://cdn.pixabay.com/photo/2013/07/12/12/43/painting-148059_1280.png", options: ["cuadro", "lámpara"] },
  { word: "lámpara", image: "https://cdn.pixabay.com/photo/2014/04/02/16/34/lamp-306188_1280.png", options: ["televisión", "lámpara"] },
  { word: "televisión", image: "https://cdn.pixabay.com/photo/2014/04/03/10/35/tv-310353_1280.png", options: ["radio", "televisión"] },
  { word: "radio", image: "https://cdn.pixabay.com/photo/2017/08/07/21/29/radio-2607761_1280.png", options: ["teléfono", "radio"] },
  { word: "teléfono", image: "https://cdn.pixabay.com/photo/2014/04/03/10/36/mobile-phone-310354_1280.png", options: ["teléfono", "ratón"] }
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
</script>

</body>
</html>
