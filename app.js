
let cards = 
    ['2C','2D','2S','2H',
     '3C','3D','3S','3H',
     '4C','4D','4S','4H',
     '5C','5D','5S','5H',
     '6C','6D','6S','6H',
     '7C','7D','7S','7H',
     '8C','8D','8S','8H',
     '9C','9D','9S','9H',
     '10C','10D','10S','10H',
     'JC','JD','JS','JH',
     'QC','QD','QS','QH',
     'KC','KD','KS','KH',
     'AC','AD','AS','AH'
    ]

let loc; 

const deck = document.getElementById('deck');
const dealerCard = document.getElementById('dealerCard');
let hands = [];
let cardsList = document.querySelectorAll('.card');
const playingDeck = document.querySelector('.playingDeck');

const traverseDeck = () => {
    if (typeof traverseDeck.counter == 'undefined' || traverseDeck.counter > 50) {
        traverseDeck.counter = 27;
    }
    traverseDeck.counter ++;
    
    let currentCard = cards[traverseDeck.counter];
    dealerCard.src = `cards/${currentCard}.svg`;
} //static counter

deck.addEventListener('click', traverseDeck);

const layoutDeck = () => {
    let index = 0;
    for(let i = 1; i <= 7; i++) {
        let hand = document.createElement('div');
        hand.className = 'hand';
        
        let cardsArray = [];
        for(let j = 0; j < i; j++) {
            if (j === i - 1) cardsArray.push(cards[index]);
            else cardsArray.push("BLUE_BACK");
            index++;
        }

        hands[i -1] = cardsArray;
        hand.setAttribute('data-hand', `flow: vertical; spacing: 0.2; cards:${cardsArray.join(',')}`);
        playingDeck.appendChild(hand);
    }

    //console.log(hands);
}

const dragEnd = e => {
    //console.log(loc);
    let source = e.target.src.split("/").slice(-1).pop().split(".")[0];
    let destination = loc.getAttribute('data-hand').split(":").slice(-1).pop().split(",");
    //console.log(destination);

    let index1;
    let position = -1;
    let done = false;
    for(let i = 0; i < hands.length; i++) {
        for (card of hands[i]) {
            if (card == source) {
                //hands[i].pop();
                index1 = i;
                //console.log(card);
                done = true;
                break;
            }

            position++;
        }

        if (done) break;
    }
    
    //console.log(index1);
    //console.log(playingDeck.childNodes[index1].childNodes);
    let parent = playingDeck.childNodes[index1];
    //console.log(playingDeck.childNodes[index1].getAttribute('data-hand'));
    let bool = false;
    let revealCard = document.createElement('img');
    revealCard.className = 'card';
    revealCard.src = `cards/${cards[position]}.svg`;
    for (card of parent.childNodes) {
        if (card.src === `http://127.0.0.1:5500/cards/${source}.svg`) {
            parent.removeChild(card);
            bool = true;
            let handCards = parent.getAttribute('data-hand').split(';').pop().split(':').pop().split(',');
            handCards.pop();
            //handCards.pop();
            handCards[handCards.length - 1] = cards[position];
            hands[index1] = handCards.slice(0);
            parent.setAttribute('data-hand', `flow: vertical; spacing: 0.2; cards:${handCards.join(',')}`);
        }

        if(bool) {
            parent.appendChild(revealCard);
        }

    }

    if (parent.childNodes.length > 1) {
        if (bool) parent.removeChild(parent.childNodes[parent.childNodes.length - 2]);
    }
    

    //console.log(destination);
    let index2;
    for(let i = 0; i < hands.length; i++) {
        if (arraysMatch(hands[i], destination)) {
            index2 = i;
            //console.log(hands[index2]);
            //console.log(index2);
        }
    }
    
    
    destination.push(source);
    //console.log(destination);
    hands[index2] = destination.slice(0); //cloning the array
    //console.log(hands[index2]);
    //console.log(hands[index2]);
    // console.log(index2);
    // console.log(hands[index2]);
    let newCard = document.createElement('img');
    newCard.className = 'card';
    newCard.src = `cards/${source}.svg`;
    let hand = playingDeck.childNodes[index2];
    hand.appendChild(newCard);
    hand.setAttribute('data-hand', `flow: vertical; spacing: 0.2; cards:${destination.join(',')}`);

} //returns source card

const dragEnter = (e) => {
    if (e.target.classList.contains("card")) {
        loc = e.target.parentElement;
        //console.log(loc);
    }
} //makes loc the target card

//playingDeck.addEventListener('dragstart', dragStart);
playingDeck.addEventListener('dragend', dragEnd);
//playingDeck.addEventListener('dragover', dragOver);
playingDeck.addEventListener('dragenter', dragEnter);
//playingDeck.addEventListener('dragleave', dragLeave);
//playingDeck.addEventListener('drop', drop);

// dealerCard.addEventListener('dragenter', dragEnter);
// dealerCard.addEventListener('dragend', dragEnd);

//Helper Functions
//Fisher-Yates shuffle algorithm
const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

const arraysMatch = (a1, a2) => {
    return JSON.stringify(a1)==JSON.stringify(a2);
}

const checkMove = (source, destination) => {
    
}

window.onload = () => {
    cards = shuffle(cards);
    layoutDeck();
};






