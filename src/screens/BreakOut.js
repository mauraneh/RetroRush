import React, {useRef} from "react";
import { Link } from "react-router-dom";
import Alert from '../components/Alert';
import HowToPlay from "../components/HowToPlay";
import GameTitle from "../components/GameTitle";
import PlayButton from "../components/BtnPlay";
import Score from "../components/Score";
import useBreakOutLogic from "../hooks/useBreakOutLogic";
import BreakOutCanvas from "../components/BreakOutCanvas";
const BreakOut = () => {
    const { score, bestScore, isGameActive, initializeGame, alert, bricks, ballPosition, paddlePosition, updateGameState } = useBreakOutLogic();
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
                    score={score}
                    bestScore={bestScore}
                    initializeGame={initializeGame}
                />
                {!isGameActive && (
                    <PlayButton initializeGame={initializeGame} />
                )}
                <Link to="/homepage">
                    <button className="retour-button button">Retour</button>
                </Link>
                <HowToPlay gameToExplain="Breakout"/>
            </div>
            {alert.show &&
                <Alert status={alert.type} message={alert.message} onRestart={initializeGame} show={alert.show} />
            }
        </div>
    );
};

export default BreakOut;
