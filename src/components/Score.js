import React from 'react';

const Score = ({ isGameActive, isGameLost, score, bestScore }) => {
    const scoreBoardStyle = {
        backgroundColor: isGameLost ? 'red' : 'black',
        color: isGameLost ? '#FFFFFF' : '#81e6d3',
        borderColor: isGameLost ? '#ff0000' : '#fcd60c',
    };

    const gameMessage = isGameLost ? "Partie perdue !" : isGameActive ? "Jeu en cours..." : "Prêt à jouer ?";

    return (
        <div className="tabScore" style={scoreBoardStyle}>
            <h2>Résultat</h2>
            <div className="gameScore">Score: {score}</div>
            <div className="gameBestScore">Meilleur Score: {bestScore}</div>
            <div className="gameOverMessage">{gameMessage}</div>
        </div>
    );
};

export default Score;
