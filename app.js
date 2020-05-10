
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

const deck = document.getElementById('deck');
const dealerCard = document.getElementById('dealerCard');
let hands = document.querySelectorAll('.hand');

function traverseDeck(){
    if (typeof traverseDeck.counter == 'undefined' || traverseDeck.counter > 50) {
        traverseDeck.counter = 27;
    }
    traverseDeck.counter ++;
    //console.log(traverseDeck.counter - 28);
    let currentCard = cards[traverseDeck.counter];
    dealerCard.src = `cards/${currentCard}.svg`;
}
deck.addEventListener('click', traverseDeck);

function layoutHands() {
    let hand = document.querySelector('.hand');
    let attributes = hand.getAttribute('data-hand').split(';');
    let obj = {};
    attributes.forEach(str => {
        let keyValPair = str.split(":");
        obj[keyValPair[0].trim()] = keyValPair[1].trim();
    });

    obj.cards = obj.cards.split(",");
    // console.log(obj);
    // console.log(obj.cards.join(","));
}

const layoutDeck = () => {
    let i = 1, index = 0;
    for (hand of hands) {
        //console.log(hand);
        let attributes = hand.getAttribute('data-hand').split(';');
        //console.log(attributes);
        let obj = {};
        attributes.forEach(str => {
            let keyValPair = str.split(":");
            obj[keyValPair[0].trim()] = keyValPair[1].trim();
        });

        let cardsArray = [];
        for(let j = 0; j < i; j++) {
            if (j === i - 1) cardsArray.push(cards[index]);
            else cardsArray.push("BLUE_BACK");
            index++;
        }
        obj.cards = cardsArray.join("-");
        //console.log(obj);
        i++;
        //console.log(cardsArray);
        //console.log(obj);

        let outStr = JSON.stringify(obj).replace(/[{}]/g, '').split(",").join(";").replace(/"/g,'').replace(/-/g,",");
        hand.setAttribute('data-hand',outStr);

        //console.log(obj);
        //console.log(JSON.stringify(obj));
    }
}

//Fisher-Yates shuffle algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }

    //console.log(array);
    return array;
  }

window.onload = () => {
    cards = shuffle(cards);
    layoutDeck();
};






