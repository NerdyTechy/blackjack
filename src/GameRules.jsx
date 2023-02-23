export default function GameRules(props) {
    return (
        <div className="App">
            <h1>Blackjack Rules</h1>

            <ul>
                <li>Coming Soon</li>
            </ul>

            <button onClick={() => props.setGameState("MainMenu")}>Back</button>
        </div>
    );
}
