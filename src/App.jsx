import { useState } from "react";

import MainMenu from "./MainMenu";
import PlaceBet from "./PlaceBet";
import GameRules from "./GameRules";
import InGame from "./InGame";

function App() {
    const [gameState, setGameState] = useState("MainMenu");
    const [playerBalance, setPlayerBalance] = useState(1000);
    const [playerBet, setPlayerBet] = useState();

    if (gameState === "MainMenu") {
        return <MainMenu setGameState={setGameState} />;
    } else if (gameState === "PlaceBet") {
        return <PlaceBet playerBalance={playerBalance} setPlayerBet={setPlayerBet} setGameState={setGameState} />;
    } else if (gameState === "GameRules") {
        return <GameRules setGameState={setGameState} />;
    } else if (gameState === "InGame") {
        return <InGame playerBalance={playerBalance} playerBet={playerBet} setPlayerBalance={setPlayerBalance} setPlayerBet={setPlayerBet} setGameState={setGameState} />;
    } else {
        return (
            <div className="App">
                <h1>Game State: {gameState}</h1>
            </div>
        );
    }
}

export default App;
