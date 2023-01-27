var deck = [];
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack", "Ten", "Nine", "Eight", "Seven", "Six", "Five", "Four", "Three", "Two"];
var gameStarted = false;
var gameOver = false;
var playerWon = false;
var dealerCards = [];
var playerCards = [];
var dealerScore = 0;
var playerScore = 0;

var textArea = document.getElementById("text-area");
var newGameButton = document.getElementById("new-game-button");
var hitButton = document.getElementById("hit-button");
var stayButton = document.getElementById("stay-button");

function createDeck() {
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            deck.push(values[valueIdx] + " of " + suits[suitIdx]);
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
        score += getCardNumericValue(card);
        if (card[0] === "A") {
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
    } else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {
        if (dealerScore > playerScore) {
            playerWon = false;
        } else {
            playerWon = true;
        }
    }
}

function showStatus() {
    if (!gameStarted) {
        return (textArea.value = "Welcome to Blackjack!");
    }

    let dealerCardString = "";
    for (let i = 0; i < dealerCards.length; i++) {
        if (i == 0) {
            dealerCardString += `• ${dealerCards[i]}\n`;
        } else {
            dealerCardString += "• XXXXXXXXXXXX\n";
        }
    }

    let playerCardString = "";
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += `• ${playerCards[i]}\n`;
    }

    updateScores();

    textArea.value = "Dealer has:\n" + dealerCardString + `(score: ${getScore([dealerCards[0]])})\n\n` + "You have:\n" + playerCardString + "(score: " + playerScore + ")\n\n";

    if (gameOver) {
        if (playerWon) {
            textArea.value = `You won!\n\nYour Score: ${playerScore}\nDealer Score: ${dealerScore}`;
        } else {
            textArea.value = `Dealer won!\n\nYour Score: ${playerScore}\nDealer Score: ${dealerScore}`;
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
