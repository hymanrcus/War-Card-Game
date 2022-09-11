/*------------------------- Constants -------------------------*/

const cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];



/*------------------------- Variables -------------------------*/




/*------------------------- Cached elements  -------------------------*/

const gameStatusEl = document.getElementById('gamestatus');


/*------------------------- Event Listeners  -------------------------*/

dealButton.addEventListener('click', dealCards);


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
}







console.log(temp)