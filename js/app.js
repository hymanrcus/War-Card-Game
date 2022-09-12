/*------------------------- Constants -------------------------*/

const cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];



/*------------------------- Variables -------------------------*/
let player1Stack = []
let player2Stack = []
let player1Flip = []
let player2Flip = []
let currP1Flip;


/*------------------------- Cached elements  -------------------------*/

const p1deck = document.getElementById('p1deck')
const p2deck = document.getElementById('p2deck')
const p1flip = document.getElementById('p1flip')
const p2flip = document.getElementById('p2flip')
const dealButton = document.getElementById('deal-btn')
const flipButton = document.getElementById('flip-btn')

/*------------------------- Event Listeners  -------------------------*/

dealButton.addEventListener('click', dealCards)
flipButton.addEventListener('click', handleFlip )


/*------------------------- Functions  -------------------------*/

function shuffleDeck() {
  let temp = null
  for (let idx = cards.length - 1; idx > 0; idx -= 1) {
    let rndIdx = Math.floor(Math.random() * (idx + 1))
    temp = cards[idx]
    cards[idx] = cards[rndIdx]
    cards[rndIdx] = temp
}
return cards

}

function dealCards() {
  if (cards.length > 0) {
      for (let i = 0; i < 26; i++) {
          let cardDealt1;
          cardDealt1 = cards.splice(0, 1);
          player1Stack.push(cardDealt1);
          player1Stack = player1Stack.flat()
      }
      for (let i = 0; i < 26; i++) {
          let cardDealt2;
          cardDealt2 = cards.splice(0, 1);
          player2Stack.push(cardDealt2);
          player2Stack = player2Stack.flat()
      }
  }
  render()
}

dealCards()

function handleFlip() {
  if (player1Stack.length > 0) {
      player1Flip = player1Stack.splice(0, 1);
      //console.log(player1Flip)
      p1flipEl.classList.replace('outline', player1Flip);
      p1flipEl.classList.add('animated', 'zoomInLeft');
  }
  if (player2Stack.length > 0) {
      player2Flip= player2Stack.splice(0, 1);
      //console.log(player2Flip)
      p2flipEl.classList.replace('outline', player2Flip);
      p2flipEl.classList.add('animated', 'zoomInRight');
  }

};

function render(){
  //Player 1 Render
  let cardToRemove1 = this.cardDealt1
    if (player1Stack.length > 0) {
      p1deckEl.classList.remove('outline');
      p1deckEl.classList.remove(cardToRemove1);
    }
  //Player 2 Render
  let cardToRemove2 = this.cardDealt2
    if (player2Stack.length > 0) {
      p2deckEl.classList.remove('outline');
      p2deckEl.classList.remove(cardToRemove2);
    }
  }


function compareFlipped() {
  if (covertCardToNumber(player1Flip) > covertCardToNumber(player2Flip)) {
      player1Stack.push(`${player1Flip}`);
      player1Stack.push(`${player2Flip}`);
      player2Stack.splice(player2Stack.length, 1);

  } else if (covertCardToNumber(player1Flip) < covertCardToNumber(player2Flip)) {
      player2Stack.push(`${player2Flip}`);
      player2Stack.push(`${player1Flip}`);
      player1Stack.splice(player1Stack.length, 1);

  }else {
    // war()
  }
}


console.log(`Player 1 has ${player1Stack.length} cards`)
console.log(`Player 2 has ${player2Stack.length} cards`)