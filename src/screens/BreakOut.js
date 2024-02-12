import React, {useRef} from "react";
import { Link } from "react-router-dom";
import HowToPlay from "../components/HowToPlay";
import GameTitle from "../components/GameTitle";
import PlayButton from "../components/BtnPlay";
import Score from "../components/Score";
import useBreakOutLogic from "../hooks/useBreakOutLogic";
import BreakOutCanvas from "../components/canvas/BreakOutCanvas";

const BreakOut = () => {
    const { isGameLost, isGameWin, score, bestScore, isGameActive, initializeGame, bricks, ballPosition, paddlePosition, updateGameState } = useBreakOutLogic();
    const canvasRef = useRef(null);

    return (
        <div className="games breakout">
            <GameTitle text="Break Out" />
            <div id="gamesContainer">
                <BreakOutCanvas
                    isGameActive={isGameActive}
                    bricks={bricks}
                    ballPosition={ballPosition}
                    paddlePosition={paddlePosition}
                    updateGameState={updateGameState}
                    canvasRef={canvasRef}
                />
                <Score
                    isGameActive={isGameActive}
                    isGameWin={isGameWin}
                    score={score}
                    bestScore={bestScore}
                    isGameLost={isGameLost}
                />
                {!isGameActive && (
                    <PlayButton initializeGame={initializeGame} />
                )}
                <Link to="/homepage">
                    <button className="retour-button button">Retour</button>
                </Link>
                <HowToPlay gameToExplain="Breakout"/>
            </div>
        </div>
    );
};

export default BreakOut;
