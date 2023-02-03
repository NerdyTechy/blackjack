var deck = [];
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];
var gameStarted = false;
var gameOver = false;
var playerWon = false;
var playerBust = false;
var dealerBust = false;
var dealerCards = [];
var playerCards = [];
var dealerScore = 0;
var playerScore = 0;
var balance = 100;

var textArea = document.getElementById("text-area");
var newGameButton = document.getElementById("new-game-button");
var hitButton = document.getElementById("hit-button");
var stayButton = document.getElementById("stay-button");

class Card {
    constructor(nameString, value, suit, asset) {
        this.nameString = nameString;
        this.value = value;
        this.suit = suit;
        this.asset = asset;
    }
    getNameString() {
        return this.nameString;
    }
    getValue() {
        return this.value;
    }
    getSuit() {
        return this.suit;
    }
    getAsset() {
        return this.asset;
    }
}

function createDeck() {
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            deck.push(new Card(`${values[valueIdx]} of ${suits[suitIdx]}`, getCardNumericValue(`${values[valueIdx]} of ${suits[suitIdx]}`), suits[suitIdx], `./assets/images/${suits[suitIdx]}/${values[valueIdx]}.png`));
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    deck.sort(() => Math.random() - 0.5);
}

function getNextCard() {
    return deck.pop();
}

function getCardNumericValue(card) {
    let cardValue = card.split(" ")[0];
    switch (cardValue) {
        case "Ace":
            return 1;
        case "Two":
            return 2;
        case "Three":
            return 3;
        case "Four":
            return 4;
        case "Five":
            return 5;
        case "Six":
            return 6;
        case "Seven":
            return 7;
        case "Eight":
            return 8;
        case "Nine":
            return 9;
        default:
            return 10;
    }
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardNumericValue(card.getNameString());
        if (card.getNameString()[0] === "A") {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function checkForEndOfGame() {
    updateScores();

    if (gameOver) {
        while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
        playerBust = true;
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
        dealerBust = true;
    } else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        } else {
            playerWon = false;
        }
    }
}

function showStatus() {
    if (!gameStarted) {
        return (textArea.value = "Welcome to Blackjack!");
    }

    updateScores();

    const dealerCardsDiv = document.getElementById("dealer-cards");
    dealerCardsDiv.innerHTML = "";

    const playerCardsDiv = document.getElementById("player-cards");
    playerCardsDiv.innerHTML = "";

    const playerCardScore = document.getElementById("player-score");
    playerCardScore.innerText = `Your Score: ${playerScore}`;

    const dealerCardScore = document.getElementById("dealer-score");

    if (!gameOver) {
        dealerCardScore.innerText = `Dealer Score: ${dealerCards[0].getValue()}`;
    } else {
        dealerCardScore.innerText = `Dealer Score: ${getScore(dealerCards)}`;
    }

    for (let i = 0; i < dealerCards.length; i++) {
        if (!gameOver) {
            if (i == 0) {
                const cardImage = document.createElement("img");
                cardImage.src = dealerCards[i].getAsset();
                cardImage.classList += "card";
                cardImage.draggable = false;
                dealerCardsDiv.appendChild(cardImage);
            } else {
                const cardImage = document.createElement("img");
                cardImage.src = "./assets/images/Other/BlueBack.png";
                cardImage.classList += "card";
                cardImage.draggable = false;
                dealerCardsDiv.appendChild(cardImage);
            }
        } else {
            const cardImage = document.createElement("img");
            cardImage.src = dealerCards[i].getAsset();
            cardImage.classList += "card";
            cardImage.draggable = false;
            dealerCardsDiv.appendChild(cardImage);
        }
    }

    for (let i = 0; i < playerCards.length; i++) {
        const cardImage = document.createElement("img");
        cardImage.src = playerCards[i].getAsset();
        cardImage.classList += "card";
        cardImage.draggable = false;
        playerCardsDiv.appendChild(cardImage);
    }

    if (gameOver) {
        if (playerWon) {
            balance *= 2;
            balance = Math.round((balance + Number.EPSILON) * 100) / 100;
            textArea.value = `You won!${dealerBust ? " Dealer went bust!" : ""} You currently have $${balance}.`;
            const playerHeader = document.getElementById("player-header");
            playerHeader.innerText = "Your cards 👑";
        } else {
            balance /= 2;
            balance = Math.round((balance + Number.EPSILON) * 100) / 100;
            if (balance < 1) balance = 0;
            textArea.value = `Dealer won!${playerBust ? " You went bust!" : ""} You currently have $${balance}.`;
            const playerHeader = document.getElementById("dealer-header");
            playerHeader.innerText = "Dealer cards 👑";
        }
        newGameButton.style.display = "inline";
        hitButton.style.display = "none";
        stayButton.style.display = "none";
    }
}

hitButton.style.display = "none";
stayButton.style.display = "none";
showStatus();

newGameButton.addEventListener("click", function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    dealerBust = false;
    playerBust = false;

    const playerHeader = document.getElementById("player-header");
    playerHeader.innerText = "Your cards";
    playerHeader.style.display = "block";

    const dealerHeader = document.getElementById("dealer-header");
    dealerHeader.innerText = "Dealer cards";
    dealerHeader.style.display = "block";

    const playerScore = document.getElementById("player-score");
    playerScore.style.display = "block";

    const dealerScore = document.getElementById("dealer-score");
    dealerScore.style.display = "block";

    textArea.value = `You currently have $${balance}.`;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];

    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    showStatus();
});

hitButton.addEventListener("click", function () {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener("click", function () {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});
