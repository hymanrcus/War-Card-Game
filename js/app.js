/*------------------------- Constants -------------------------*/

const cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];

/*------------------------- Variables -------------------------*/

let player1Stack = []
let player2Stack = []
let player1Flip = []
let player2Flip = []
let currP1Flip;
let currP2Flip;
let p1War=[];
let p2War=[];
let p1iDeclareWar=[];
let p2iDeclareWar=[];
let winner;

/*------------------------- Cached elements  -------------------------*/

const p1deckEl = document.getElementById('p1deck')
const p2deckEl = document.getElementById('p2deck')
const p1flipEl = document.getElementById('p1flip')
const p2flipEl = document.getElementById('p2flip')
const dealButton = document.getElementById('deal-btn')
const flipButton = document.getElementById('flip-btn')
const p1warFlipEl = document.getElementById('p1warflip');
const p2warFlipEl = document.getElementById('p2warflip');
const p1iDeclareWarEl = document.getElementById('p1IDW');
const p2iDeclareWarEl = document.getElementById('p2IDW');
const gameStatusEl = document.getElementById('status');
// console.log(p1warFlipEl, p2warFlipEl, p1iDeclareWarEl, p2iDeclareWarEl, gameStatusEl)
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
  gameStatusEl.innerText = 'Flip The Cards!'
  dealButton.style.display = 'none'
  shuffleDeck();
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
function handleFlip(){
dealCards()
}

function handleFlip() {
  if (player1Stack.length > 0) {
    currP1Flip = player1Stack.splice(0, 1);
      //console.log(player1Flip)
      p1flipEl.classList.replace('outline', player1Flip);
      p1flipEl.classList.add('animated', 'zoomInLeft');
      player1Flip.push(currP1Flip);
  }
  if (player2Stack.length > 0) {
    currP2Flip= player2Stack.splice(0, 1);
      //console.log(player2Flip)
      p2flipEl.classList.replace('outline', player2Flip);
      p2flipEl.classList.add('animated', 'zoomInRight');
      player2Flip.push(currP2Flip)
  }
  if(winner = 1){
    p1flipEl.classList.replace('slideOutLeft', currP1Flip)
    p2flipEl.classList.replace('slideOutLeft', currP2Flip)
}
if(winner = 2){
    p1flipEl.classList.replace('slideOutRight', currP1Flip)
    p2flipEl.classList.replace('slideOutRight', currP2Flip)
  compareFlipped()
};}


function compareFlipped() {
  if (cardConversion(player1Flip) > cardConversion(player2Flip)) {
    player1Stack.push(`${player1Flip}`);
    player1Stack.push(`${player2Flip}`);
    player2Stack.splice(player2Stack.length, 1);
    winner = 1;
    gameStatusEl.innerText = "Player 1 Wins This Round!"
    clearDisplay()
    
  } else if (cardConversion(player1Flip) < cardConversion(player2Flip)) {
    player2Stack.push(`${player2Flip}`);
    player2Stack.push(`${player1Flip}`);
    player1Stack.splice(player1Stack.length, 1);
    winner = 2;
    gameStatusEl.innerText = "Player 2 Wins This Round!"
    clearDisplay()
  }else {
    war()
    setTimeout(function(){
      clearWarDisplay()
    },6000)
}
setTimeout (function (){
    flipButton.style.display = 'block';
    }, 3500)
  }


function war() {
  gameStatusEl.innerText = 'I DECLARE WAR!'
  warDisplay()
  if (player1Stack.length > 0) {
      p1iDeclareWar = player1Stack.splice(0, 3);
      p1War = player1Stack.splice(0, 1);
      player1Stack.push(p1War);
      setTimeout (function() {
          p1iDeclareWarEl.classList.replace('outline', 'back-blue');
          p1iDeclareWarEl.classList.add('animated', 'slideInLeft'); 
      }, 3000);
      setTimeout (function() {
          p1warFlipEl.classList.replace('outline', `${p1War}`);
          p1warFlipEl.classList.add('animated', 'slideInLeft'); 
      }, 4000);
      console.log("player 1 I DECLARE WAR" + p1iDeclareWar)
      console.log("player 1  war " + p1War)
  }
  if (player1Stack.length > 0) {
      p2iDeclareWar = player2Stack.splice(0, 3);

      p2War = player2Stack.splice(0, 1);
      player2Stack.push(p2War);
      setTimeout (function() {
          p2iDeclareWarEl.classList.replace('outline', 'back-blue');
          p2iDeclareWarEl.classList.add('animated', 'slideInRight'); 
      }, 3000);
      setTimeout (function() {
          p2warFlipEl.classList.replace('outline', `${p2War}`);
          p2warFlipEl.classList.add('animated', 'slideInRight'); 
      }, 4000);
      console.log("player 2 I DECLARE WAR " + p2iDeclareWar)
      console.log("player 2  war " + p2War)
  }
compareWarCards();
}

function getWinner(){
  if (player1Stack.length === 52){
      gameStatusEl.innerText = 'Player 1 Wins!'
  }
  if (player2Stack.length === 52){
      gameStatusEl.innerText = 'Player 2 Wins!'
  }
}

function clearDisplay(){
  if(covertCardToNumber(currP1Flip) > covertCardToNumber(currP2Flip)){
      setTimeout (function(){
      p2flipEl.classList.add('animated', 'slideOutLeft')
      },1000)
      setTimeout (function(){
      p1flipEl.classList.add('animated', 'slideOutLeft')
      },2000)
  }

  if(covertCardToNumber(currP1Flip) < covertCardToNumber(currP2Flip)){
      setTimeout (function(){
      p1flipEl.classList.add('animated', 'slideOutRight')
      },1000)
      setTimeout (function(){
      p2flipEl.classList.add('animated', 'slideOutRight')
      },2000)
  }
  flipButton.style.display = 'none'
  render(currP1Flip, currP2Flip)
}

function clearWarDisplay(){
  if(covertCardToNumber(p1War) > covertCardToNumber(p2War)){
    setTimeout (function(){
        p2flipEl.classList.add('animated', 'slideOutLeft')
    },1000)
    setTimeout(function(){
        p2iDeclareWarEl.classList.add('animated', 'slideOutLeft')
    },2000)
    setTimeout (function(){
        p2warFlipEl.classList.add('animated', 'slideOutLeft')
    },3000)
    setTimeout (function(){
        p1warFlipEl.classList.add('animated', 'slideOutLeft')
    },4000)
    setTimeout(function(){
        p1iDeclareWarEl.classList.add('animated', 'slideOutLeft')
    },5000)
    setTimeout (function(){
       p1flipEl.classList.add('animated', 'slideOutLeft')
    },6000)
    setTimeout(function(){

        p2iDeclareWarEl.style.display = 'none'
        p2warFlipEl.style.display = 'none'
        p1warFlipEl.style.display = 'none'
        p1iDeclareWarEl.style.display = 'none'


    },7000)
  }
  if(covertCardToNumber(p1War) < covertCardToNumber(p2War)){
    setTimeout (function(){
      p1flipEl.classList.add('animated', 'slideOutRight')
    },1000)
    setTimeout(function(){
        p1iDeclareWarEl.classList.add('animated', 'slideOutRight')
    },2000)
    setTimeout (function(){
    p1warFlipEl.classList.add('animated', 'slideOutRight')
    },3000)
    setTimeout (function(){
      p2warFlipEl.classList.add('animated', 'slideOutRight')
    },4000)
    setTimeout(function(){
      p2iDeclareWarEl.classList.add('animated', 'slideOutRight')
    },5000) 
    setTimeout (function(){
      p2flipEl.classList.add('animated', 'slideOutRight')
    },6000)  
    setTimeout(function(){

        p2iDeclareWarEl.style.display = 'none'
        p2warFlipEl.style.display = 'none'
        p1warFlipEl.style.display = 'none'
        p1iDeclareWarEl.style.display = 'none'


    },7000)
  }
  flipButton.style.display = 'none'
  render(currP1Flip, currP2Flip)
}

function compareWarCards() {
  if (covertCardToNumber(p1War) > covertCardToNumber(p2War)) {
      player1Stack.push(`${p1iDeclareWar[0]}`, `${p1iDeclareWar[1]}`, `${p1iDeclareWar[2]}`);
      player1Stack.push(`${player1Flip[0]}`);
      player1Stack.push(`${p2iDeclareWar[0]}`, `${p2iDeclareWar[1]}`, `${p2iDeclareWar[2]}`);
      player1Stack.push(`${player2Flip[0]}`);
      player1Stack.push(`${p2War}`);
      player2Stack.splice(player2Stack.length - 1, 1);
      winner = 1;
      setTimeout(function(){
        gameStatusEl.innerText = "Player 1 Wins This WAR!"
      },5000)
  } else if (covertCardToNumber(p1War) < covertCardToNumber(p2War)) {
      player2Stack.push(`${p2iDeclareWar[0]}`, `${p2iDeclareWar[1]}`, `${p2iDeclareWar[2]}`);
      player2Stack.push(`${player2Flip[0]}`);
      player2Stack.push(`${p1iDeclareWar[0]}`, `${p1iDeclareWar[1]}`, `${p1iDeclareWar[2]}`);
      player2Stack.push(`${player1Flip[0]}`);
      player2Stack.push(p1War);
      player1Stack.splice(player1Stack.length - 1, 1);
      winner = 2;
      setTimeout(function(){
        gameStatusEl.innerText = "Player 2 Wins This WAR!"
    },5000) 
  } else {
      console.log("War for the second time");
  }
  setTimeout (function (){
  flipButton.style.display = 'block';
  }, 11000);
};


function cardConversion(card) {
  // if('${card}' === "d02", "c02", "s02", "h02")
  // return 2
  
  if(`${card}` === 'd02' || `${card}` === 'c02' || `${card}` === 's02' || card === 'h02'){
    return 2;
  }else if (`${card}`=== 'd03' || `${card}` === 'c03' || `${card}` === 's03' || `${card}` === 'h03') {
    return 3;
  }else if (`${card}`=== 'd04' || `${card}`=== 'c04' || `${card}` === 's04' || `${card}` === 'h04') {
    return 4;
  }else if (`${card}` === 'd05' || `${card}` === 'c05' || `${card}` === 's05' || `${card}` === 'h05') {
    return 5;
  }else if (`${card}`=== 'd06' || `${card}` === 'c06' || `${card}` === 's06' || `${card}` === 'h06') {
    return 6;
  }else if (`${card}` === 'd07' || `${card}` === 'c07' || `${card}` === 's07' || `${card}` === 'h07') {
    return 7;
  }else if (`${card}`=== 'd08' || `${card}` === 'c08' || `${card}` === 's08' || `${card}` === 'h08') {
    return 8;
  }else if (`${card}` === 'd09' || `${card}` === 'c09' || `${card}` === 's09' || `${card}` === 'h09') {
    return 9;
  }else if (`${card}`=== 'd10' || `${card}` === 'c10' || `${card}` === 's10' || `${card}` === 'h10') {
    return 10;
  }else if (`${card}` === 'dJ' || `${card}` === 'cJ' || `${card}` === 'sJ' || `${card}` === 'hJ') {
    return 11;
  }else if (`${card}`=== 'dQ' || `${card}` === 'cQ' || `${card}` === 'sQ' || `${card}` === 'hQ') {
    return 12;
  }else if (`${card}` === 'dK' || `${card}` === 'cK' || `${card}` === 'sK' || `${card}` === 'hK') {
      return 13;
  }else{
    return 14;
  }
}
function render(currP1Flip, currP2Flip) {
  //Player 1 Render
  let cardToRemove1, cardToRemove2;
    if(player1Flip.length === 1){
      p1flipEl.classList.remove('outline')
    }
    if (player1Flip.length  > 1) {
      p1flipEl.classList.remove(player1Flip[player1Flip.length - 2])
    }
     // Store the card to remove next round as a variable
    cardToRemove1 = `${player1Flip}`
    p1flipEl.classList.add(`${player1Flip}`)
    p1flipEl.classList.add('animated' ,'fadeInLeft')
  
  //Player 2 Render
  if(player2Flip.length === 1){
      p2flipEl.classList.remove('outline')
    }
    if (player1Flip.length  > 1) {
      p2flipEl.classList.remove(player2Flip[player2Flip.length - 2])
    }
     // Store the card to remove next round as a variable
    cardToRemove2 = `${player2Flip}`
    p2flipEl.classList.add(`${player2Flip}`)
    p2flipEl.classList.add('animated' , 'fadeInRight')
  }

/*------------------------- Display Functions -------------------------*/



function initDisplay(){
  p1warFlipEl.style.display = 'none'
  p2warFlipEl.style.display = 'none'
  p1iDeclareWarEl.style.display = 'none'
  p2iDeclareWarEl.style.display = 'none'
}

function warDisplay(){
  flipButton.style.display = 'none'
  p1warFlipEl.style.display = 'block'
  p2warFlipEl.style.display = 'block'
  p1iDeclareWarEl.style.display = 'block'
  p2iDeclareWarEl.style.display = 'block'
}


/*---------------- Functions called upon loading page-------------------------*/
initDisplay()


