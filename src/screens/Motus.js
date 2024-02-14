import useMotusLogic from '../hooks/useMotusLogic';
import GameTitle from "../components/GameTitle";
import Score from "../components/Score";
import PlayButton from "../components/BtnPlay";
import {Link} from "react-router-dom";
import HowToPlay from "../components/HowToPlay";
import React, {useRef, useState} from "react";
import MotusCanvas from "../components/canvas/MotusCanvas";
const Motus = () => {

    const { userAttempts, isGameLost, isGameWin, score, bestScore, isGameActive, initializeGame, checkAttempt, displayWord, attemptsLeft } = useMotusLogic();
    const canvasRef = useRef(null);
    const [userInputs, setUserInputs] = useState([])
    const [currentUserInput, setCurrentUserInput] = useState(""); // Gérer l'entrée actuelle séparément

    const handleSubmit = (event) => {
        event.preventDefault();
        checkAttempt(currentUserInput); // Utiliser l'entrée actuelle pour vérifier la tentative
        setUserInputs([...userInputs, currentUserInput]); // Ajouter l'entrée actuelle au tableau des tentatives
        setCurrentUserInput(""); // Réinitialiser l'entrée actuelle
    };


    const handleInputChange = (event, index) => {
        const newInputs = [...userInputs];
        newInputs[index] = event.target.value;
        setUserInputs(newInputs);
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
                <HowToPlay gameToExplain="Breakout"/>
            </div>
            {isGameActive && !isGameWin && !isGameLost && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={userInputs[userInputs.length - 1]}
                        onChange={(e) => handleInputChange(e, userInputs.length - 1)}
                        placeholder="Entrez votre mot"
                        maxLength={displayWord.length} // Limiter la longueur à celle du mot à deviner
                    />
                    <button type="submit">Vérifier</button>
                </form>
            )}
        </div>
    )
}
export default Motus;