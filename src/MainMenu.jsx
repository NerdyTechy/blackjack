export default function MainMenu(props) {
    return (
        <div className="App">
            <h1>Blackjack</h1>
            <p>Place your bets and try to beat the dealer!</p>

            <button onClick={() => props.setGameState("PlaceBet")}>Play</button>
            <button onClick={() => props.setGameState("GameRules")}>Rules</button>
        </div>
    );
}
