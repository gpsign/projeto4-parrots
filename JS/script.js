const mesa = document.querySelector(".mesa");
let nmrCartas = 0;
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

function comparador() {
  return Math.random() - 0.5;
}

function clicou(carta) {
  if (buffer.length < 2 && !carta.classList.contains("virada")) {
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
      console.log("sim");
      return true;
    } else {
      console.log("nao");
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
