const mesa = document.querySelector(".mesa");
let nmrCartas = 0;
let jogadas = 0;
let paresFeitos = 0;
let tempo = 0;
let funcaoTempo;
let deck = [];
let buffer = [];
let pares = [
  "bobrossparrot",
  "explodyparrot",
  "fiestaparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot",
];
pares.sort(comparador);

comecarJogo();

function comecarJogo() {
  nmrCartas = 0;
  jogadas = 0;
  paresFeitos = 0;
  tempo = 0;
  deck = [];

  while (nmrCartas < 4 || nmrCartas > 14 || nmrCartas % 2 !== 0) {
    nmrCartas = prompt("Numero de cartas:");
  }

  for (let i = 0; i < nmrCartas / 2; i++) {
    deck.push(`<div class="card" onclick="clicou(this)">
    <div class="front-face face">
      <img src="./imgs/back.png"></img>
    </div>
    <div class="back-face face">
      <img src="./imgs/${pares[i]}.gif"></img>
    </div>
  </div>`);
    deck.push(`<div class="card" onclick="clicou(this)">
  <div class="front-face face">
    <img src="./imgs/back.png"></img>
  </div>
  <div class="back-face face">
    <img src="./imgs/${pares[i]}.gif"></img>
  </div>
  </div>`);
  }

  deck.sort(comparador);

  mesa.innerHTML = deck.join(" ");
  mesa.style.gridTemplateColumns = `repeat(${deck.length / 2}, 117px)`;

  document.querySelector(".cronometro").innerHTML = `<p>0</p>`;
  funcaoTempo = setInterval(() => {
    tempo++;
    document.querySelector(".cronometro").innerHTML = `<p>${tempo}</p>`;
  }, 1000);
}

function comparador() {
  return Math.random() - 0.5;
}

function clicou(carta) {
  if (buffer.length < 2 && !carta.classList.contains("virada")) {
    jogadas++;
    carta.firstElementChild.style.transform = "rotateY(-180deg)";
    carta.lastElementChild.style.transform = "rotateY(0deg)";
    buffer.push(carta);
    carta.classList.add("virada");
    if (!verificarCarta()) setTimeout(desvirar, 1000);
  }
}

function verificarCarta() {
  if (buffer.length === 2) {
    console.log(buffer[0].id);
    if (
      buffer[0].lastElementChild.firstElementChild.src ==
      buffer[1].lastElementChild.firstElementChild.src
    ) {
      buffer = [];
      paresFeitos++;
      if (paresFeitos === nmrCartas / 2) {
        buffer = [];
        clearInterval(funcaoTempo);
        alert(
          `Você ganhou em ${jogadas} jogadas! A duração do jogo foi de ${tempo} segundos!`
        );
        let reiniciar = "";
        while (true) {
          reiniciar = prompt("Começar um novo jogo?");
          if (reiniciar === "sim") {
            comecarJogo();
            break;
          } else if (reiniciar === "não") break;
        }
      }
      return true;
    } else {
      return false;
    }
  } else return true;
}

function desvirar() {
  buffer[0].firstElementChild.style.transform = "rotateY(0deg)";
  buffer[0].lastElementChild.style.transform = "rotateY(-180deg)";

  buffer[1].firstElementChild.style.transform = "rotateY(0deg)";
  buffer[1].lastElementChild.style.transform = "rotateY(-180deg)";

  setTimeout(() => {
    buffer[0].classList.remove("virada");
    buffer[1].classList.remove("virada");
    buffer = [];
  }, 500);
}
