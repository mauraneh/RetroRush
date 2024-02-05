import React from 'react';

const SnakeScore = ({ isGameActive, score, bestScore }) => {
    return (
        <div>
            <div className="gameScoreWrapper" style={{ display: isGameActive ? 'flex' : 'none' }}>
                <div className="gameScore">Score : {score}</div>
                <div className="gameBestScore">Meilleur Score : {bestScore}</div>
            </div>
        </div>
    );
};

export default SnakeScore;
