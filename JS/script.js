const mesa = document.querySelector(".mesa");
let nmrCartas = 0;
let jogadas = 0;
let paresFeitos = 0;
let tempo = 0;
let funcaoTempo;
let tela;
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
    deck.push(`<div class="card" data-test="card" onclick="clicou(this)">
    <div class="front-face face">
      <img src="./imgs/back.png" data-test="face-down-image"></img>
    </div>
    <div class="back-face face">
      <img src="./imgs/${pares[i]}.gif" data-test="face-up-image"></img>
    </div>
  </div>`);
    deck.push(`<div class="card" data-test="card" onclick="clicou(this)">
  <div class="front-face face">
    <img src="./imgs/back.png" data-test="face-down-image"></img>
  </div>
  <div class="back-face face">
    <img src="./imgs/${pares[i]}.gif" data-test="face-up-image"></img>
  </div>
  </div>`);
  }

  deck.sort(comparador);

  setInterval(ajustaTela, 100);

  mesa.innerHTML = deck.join(" ");

  document.querySelector(".cronometro p").innerHTML = 0;
  funcaoTempo = setInterval(() => {
    tempo++;
    document.querySelector(".cronometro p").innerHTML = tempo;
  }, 1000);
}

function ajustaTela() {
  tela = window.matchMedia("(max-width: 1024px)");
  if (!tela.matches) {
    mesa.style.gridTemplateColumns = `repeat(${deck.length / 2}, 117px)`;
    mesa.style.gridTemplateRows = `repeat(2, 146px)`;
  } else {
    mesa.style.gridTemplateColumns = "117px";
    mesa.style.gridTemplateRows = `repeat(${deck.length}, 146px)`;
  }
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
    setTimeout(verificarVitoria, 500);
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
      return true;
    } else {
      return false;
    }
  } else return true;
}

function verificarVitoria() {
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
