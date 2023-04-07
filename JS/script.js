const mesa = document.querySelector(".mesa");
let nmrCartas = 0;
let deck = [];
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

mesa.innerHTML = deck;

function comparador() { 
	return Math.random() - 0.5; 
}

function clicou(carta){

 carta.firstElementChild.style.transform = "rotateY(-180deg)";
 carta.lastElementChild.style.transform = "rotateY(0deg)";
 setTimeout(() => desclicar(carta), 3000);
}

function desclicar(carta){
  carta.firstElementChild.style.transform = "rotateY(0deg)";
 carta.lastElementChild.style.transform = "rotateY(-180deg)";
}