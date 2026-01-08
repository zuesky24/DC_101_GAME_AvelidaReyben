const grid = document.getElementById("grid");
const movesEl = document.getElementById("moves");
const restartBtn = document.getElementById("restart");

const symbols = ["🍎","🍌","🍇","🍑","🍓","🍒","🥝","🍉"]; // 8 pairs
let firstCard = null;
let secondCard = null;
let lock = false;
let moves = 0;

function shuffle(array){
  for(let i = array.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setup(){
  grid.innerHTML = "";
  moves = 0;
  movesEl.textContent = moves;

  const doubled = [...symbols, ...symbols];
  shuffle(doubled);

  doubled.forEach((sym, index)=>{
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.symbol = sym;
    card.dataset.index = index;
    card.addEventListener("click", () => flip(card));
    grid.appendChild(card);
  });
}

function flip(card){
  if(lock) return;
  if(card === firstCard) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.symbol;

  if(!firstCard){
    firstCard = card;
    return;
  }

  secondCard = card;
  moves++;
  movesEl.textContent = moves;
  lock = true;

  if(firstCard.dataset.symbol === secondCard.dataset.symbol){
    firstCard = null;
    secondCard = null;
    lock = false;
  } else {
    setTimeout(()=>{
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard = null;
      secondCard = null;
      lock = false;
    }, 800);
  }
}

restartBtn.onclick = setup;
setup();

