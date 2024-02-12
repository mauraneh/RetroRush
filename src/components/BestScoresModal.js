import React, { useEffect, useState } from "react";
import "../assets/css/bestscoremodal.css";

const BestScoresModal = ({ onClose }) => {
  const gameNames = ["TicTacToe", "Tetris", "Snake", "BreakOut", "Motus"];
  const [mountedItems, setMountedItems] = useState([]);

  const [bestScores, setBestScores] = useState(() => {
    const storedBestScores = {};
    gameNames.forEach((gameName) => {
      const storedScore = JSON.parse(localStorage.getItem(`${gameName}_bestScore`));
      storedBestScores[gameName] = storedScore || 0;
    });
    return storedBestScores;
  });

  useEffect(() => {
    const storedBestScores = JSON.parse(localStorage.getItem("bestScores"));
    if (storedBestScores) {
      setBestScores(storedBestScores);
    }

    // Mettez à jour la liste des éléments montés
    setMountedItems(Object.keys(storedBestScores || {}));
  }, []);

    const renderGameScore = (gameName, score, imagePath, key) => (
      
        <div key={key} className={`game-container visible`}>
      <div className="game-info">
              <h3 className="score-text"> Bravo ! <br></br>
                      Ton meilleur score<br></br>
                      est {score}</h3>
      </div>
      <h2 className="floating-text">{gameName}</h2>
    </div>
  );

  return (
    <div className="best-scores-modal">
      <div className="Title">
        <h1>Mes meilleurs scores</h1>
      </div>
      
          <div className="games-container">
        {Object.entries(bestScores).map(([gameName, score], index) => (
          renderGameScore(
            gameName,
            score,
            `../assets/images/${gameName.toLowerCase()}.png`,
            index 
          )
        ))}
              
      </div>
    </div>
  );
};

export default BestScoresModal;
