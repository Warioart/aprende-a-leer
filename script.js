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
  { word: "limón", image: "https://cdn.pixabay.com/photo/2017/01/20/00/30/lemons-1995056_1280.jpg", options: ["naranja", "limón"] },
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
