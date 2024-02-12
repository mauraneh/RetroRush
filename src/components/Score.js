import React from 'react';

const Score = ({ isGameActive, isGameLost, score, bestScore }) => {
    const scoreBoardStyle = {
        backgroundColor: isGameLost ? 'red' : 'black', // Change la couleur de fond si le jeu est perdu
        color: isGameLost ? '#FFFFFF' : '#81e6d3', // Change la couleur du texte selon l'état du jeu
        borderColor: isGameLost ? '#ff0000' : '#fcd60c', // Change la couleur de la bordure si le jeu est perdu
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
