export default function GameRules(props) {
    return (
        <div className="App">
            <h1>Blackjack Rules</h1>

            <h3>Game Rules</h3>
            <ul>
                <li>Your aim is the get your total card value as close to 21 as possible, without going over.</li>
                <li>If you get a higher score than the dealer, without going over 21 (going bust), you win.</li>
                <li>If your total card score is lower than or equal to the dealer's score, the dealer wins.</li>
                <li>If the dealer goes bust, and you remain below 21, you win.</li>
            </ul>

            <h3>Betting</h3>
            <ul>
                <li>Bets are collected at the start of the game.</li>
                <li>If you stand below 21, and the dealer goes bust, you receive the value of your bet doubled.</li>
                <li>If you go bust, you lose your bet amount regardless of whether the dealer goes bust.</li>
                <li>If neither you or the dealer goes bust, and you have the higher total card value, you receive the value of your bet doubled.</li>
                <li>If neither you or the dealer goes bust, and your total card score is equal to or lower than the dealer's total score, you lose your bet amount.</li>
            </ul>

            <h3>Card Values</h3>
            <ul>
                <li>Number cards are worth their respective values.</li>
                <li>Picture cards are all worth a value of 10.</li>
                <li>Aces are worth 11, unless they would put the total score over 21. In this case, they are worth 1.</li>
            </ul>

            <button onClick={() => props.setGameState("MainMenu")}>Back</button>
        </div>
    );
}
