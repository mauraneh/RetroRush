import React, {useEffect} from "react";
import useSoundsManager from "../hooks/useSoundManager";
const Score = ({ isGameActive, isGameLost, isGameWin, score, bestScore,
tictactoe, playerWins, draws, botWins }) => {
let scoreBoardStyle, gameMessage;
const isSoundEnabled = JSON.parse(localStorage.getItem('soundPreference'));
const { playSound } = useSoundsManager({ isSoundEnabled });


// changer d'audio dès que les valeurs de isGameLost et isGameWin se mette à jour
useEffect(() => {
handleChange();
}, [isGameLost, isGameWin]);

const handleChange = async () => {
    if (isSoundEnabled) {
        if (isGameWin) {
            const audioSrc = '/assets/sounds/winGame.mp3';
                playSound(audioSrc);

        }
        if(isGameLost){
            const audioSrc = '/assets/sounds/gameOver.mp3';
            playSound(audioSrc);
        }
    }
};


if (isGameWin) {
    scoreBoardStyle = {
        backgroundColor: 'green',
        color: '#FFFFFF',
        borderColor: '#00ff00',
    };
    gameMessage = "Vous avez gagné !";
} else if (isGameLost) {
    scoreBoardStyle = {
        backgroundColor: 'red',
        color: '#FFFFFF',
        borderColor: '#ff0000',
    };
    gameMessage = "Partie perdue !";
} else {
    scoreBoardStyle = {
        backgroundColor: isGameActive ? 'black' : 'grey',
        color: '#81e6d3',
        borderColor: '#fcd60c',
    };
    gameMessage = isGameActive ? "Jeu en cours..." : "Prêt à jouer ?";
}

return (
    <div className="tabScore" style={scoreBoardStyle}>
        <h2>Résultat</h2>
        {tictactoe !== undefined ? (
            <div className="gameScore">
                Joueur : {playerWins}  Matchs nuls : {draws} | Bot : {botWins}
            </div>
        ) : (
            <div className="gameScore">Score: {score}</div>
        )}
        <div className="gameBestScore">Meilleur Score: {bestScore}</div>
        <div className="gameOverMessage">{gameMessage}</div>
    </div>
);
};

export default Score;
