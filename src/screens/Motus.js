import useMotusLogic from '../hooks/useMotusLogic';
import GameTitle from "../components/GameTitle";
import Score from "../components/Score";
import PlayButton from "../components/BtnPlay";
import {Link} from "react-router-dom";
import HowToPlay from "../components/HowToPlay";
import React, {useEffect, useRef, useState} from "react";
import MotusCanvas from "../components/canvas/MotusCanvas";
const Motus = () => {

    const { userAttempts, isGameLost, isGameWin, score, bestScore, isGameActive, initializeGame, checkAttempt, displayWord, attemptsLeft } = useMotusLogic();    const canvasRef = useRef(null);
    const [userInputs, setUserInputs] = useState([])
    const [currentUserInput, setCurrentUserInput] = useState("");

    useEffect(() => {
        if (isGameActive) {
            setUserInputs([]);
        }
    }, [isGameActive]);

    const handleSubmit = (event) => {
        event.preventDefault();
        checkAttempt(currentUserInput);
        setUserInputs([...userInputs, currentUserInput]);
        setCurrentUserInput("");
    };


    const handleInputChange = (event) => {
        setCurrentUserInput(event.target.value);
    };

    return (
        <div className="games motus">
            <GameTitle text="Motus"/>
            <div id="gamesContainer">
                <MotusCanvas
                    canvasRef={canvasRef}
                    checkAttempt={checkAttempt}
                    displayWord={displayWord}
                    attemptsLeft={attemptsLeft}
                    userAttempts={userAttempts}
                    userInputs={userInputs}
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
                <HowToPlay gameToExplain="Motus"/>
            </div>
            {isGameActive && !isGameWin && !isGameLost && (
                <div className="formMotus">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={currentUserInput}
                            onChange={handleInputChange}
                            placeholder="Entrez votre mot"
                            maxLength={displayWord.length}
                            minLength={displayWord.length}
                        />
                        <button type="submit">Vérifier</button>
                    </form>
                </div>
            )}
        </div>
    )
}
export default Motus;