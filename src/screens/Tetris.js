import useTetrisLogic from "../hooks/useTetrisLogic";
import React, {useRef} from "react";
import GameTitle from "../components/GameTitle";
import Score from "../components/Score";
import PlayButton from "../components/BtnPlay";
import {Link} from "react-router-dom";
import HowToPlay from "../components/HowToPlay";
import TetrisCanvas from "../components/canvas/TetrisCanvas"

const Tetris = () => {
    const {board, currentPiece, movePiece, isGameLost, isGameWin, score, bestScore, isGameActive, initializeGame} = useTetrisLogic();
    const canvasRef = useRef(null);

    return (
        <div className="games tetris">
            <GameTitle text="Tetris"/>
            <div id="gamesContainer">
                <TetrisCanvas
                    canvasRef={canvasRef}
                    isGameActive={isGameActive}
                    initializeGame={initializeGame}
                    board={board}
                    currentPiece={currentPiece}
                />
                <Score
                    isGameActive={isGameActive}
                    isGameWin={isGameWin}
                    score={score}
                    bestScore={bestScore}
                    isGameLost={isGameLost}
                />
                {!isGameActive && (
                    <PlayButton initializeGame={initializeGame}/>
                )}
                <Link to="/homepage">
                    <button className="retour-button button">Retour</button>
                </Link>
                <HowToPlay gameToExplain="Tetris"/>
            </div>
        </div>
    )
}
export default Tetris;
