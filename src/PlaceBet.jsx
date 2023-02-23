export default function PlaceBet(props) {
    return (
        <div className="App">
            <h1>Place Bet</h1>
            <p>You have ${props.playerBalance}</p>

            <label htmlFor={"bet"}>Enter Bet Amount: </label>
            <input type={"number"} max={props.playerBalance} min={5} style={{ width: "100px" }}></input>
            <p>
                <em>The minimum bet amount is $5.</em>
            </p>

            <button onClick={() => props.setGameState("MainMenu")}>Back</button>
            <button
                onClick={() => {
                    const betAmount = document.querySelector("input").value;
                    if (betAmount >= 5 && betAmount <= props.playerBalance) {
                        props.setPlayerBet(betAmount);
                        props.setGameState("InGame");
                    } else {
                        alert("Please enter a valid bet amount.");
                    }
                }}
            >
                Submit
            </button>
        </div>
    );
}
