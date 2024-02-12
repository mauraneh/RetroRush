import React from "react";

const Score = ({ isGameActive, isGameLost, isGameWin, score, bestScore }) => {
    let scoreBoardStyle, gameMessage;

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
            {morpion !== undefined ? (
            <div className="gameScore">
              Score: Joueur : {playerWins} | Matchs nuls : {draws} | Bot : {botWins}
            </div>
          ) : (
            <div className="gameScore">Score: {score}</div>
          )}
            <div className="gameBestScore">Meilleur Score: {bestScore}</div>
            <div className="gameOverMessage">{gameMessage}</div>
        </div>
    );
  }
};

export default Score;
