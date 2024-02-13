import React, { useEffect, useState } from "react";
import "../../assets/css/bestscoremodal.css";
import { useNavigate } from 'react-router-dom';
import ScoreButton from "./ScoreButton";
import GameScore from "./GameScore";

const BestScoresModal = ({ onClose }) => {
  const navigate = useNavigate();
  const gameNames = ["TicTacToe", "Tetris", "Snake", "BreakOut", "Motus"];
  const [mountedItems, setMountedItems] = useState([]);
  const userNickname = localStorage.getItem("userNickname");
  const [selectedButton, setSelectedButton] = useState(null);
  const [bestScores, setBestScores] = useState(() => {
    const storedBestScores = {};
    gameNames.forEach((gameName) => {
      const storedScore = parseInt(localStorage.getItem(`${userNickname}_${gameName}_bestScore`), 10) || 0;
      storedBestScores[gameName] = { score: storedScore };
    });
    return storedBestScores;
  });

  useEffect(() => {
    const storedBestScores = JSON.parse(localStorage.getItem("bestScores")) || {};
    if (storedBestScores) {
      setBestScores(storedBestScores);
    }

    setMountedItems(Object.keys(storedBestScores || {}));
  }, []);

  const handleButtonClick = (buttonType) => {
    setMountedItems([buttonType]);
    setSelectedButton(buttonType);
  };

  const navigateToGame = (gameName) => {
    const gameRoute = `/${gameName.toLowerCase()}`;
    navigate(gameRoute);
  };

  // Fonction pour obtenir les scores personnels du joueur pour un jeu spécifique
const getBestPlayerData = (gameName, viewUserScoresOnly) => {
  const allScores = Object.entries(localStorage)
    .filter(([key]) => key.endsWith(`_${gameName}_bestScore`))
    .map(([key, value]) => {
      const [, playerNickname] = key.match(/^(.+)_(.*)_bestScore$/);
      const score = parseInt(value) || 0;
      return { playerNickname, score };
    });

  if (viewUserScoresOnly) {
    const userScores = allScores.filter((userData) => userData.playerNickname === userNickname);
    const userBestScore = userScores.reduce((best, current) => (current.score > best.score ? current : best), { playerNickname: userNickname, score: 0 });
    return userBestScore;
  }

  // Trouver le meilleur score pour chaque joueur
  const bestScoresByPlayer = allScores.reduce((acc, scoreData) => {
    if (!acc[scoreData.playerNickname] || acc[scoreData.playerNickname].score < scoreData.score) {
      acc[scoreData.playerNickname] = { playerNickname: scoreData.playerNickname, score: scoreData.score };
    }
    return acc;
  }, {});

  // Convertir l'objet en liste
  const bestScoresList = Object.values(bestScoresByPlayer);

  // Trouver le meilleur score global parmi tous les joueurs
  const overallBestScore = bestScoresList.reduce((best, current) => (current.score > best.score ? current : best), { playerNickname: "", score: 0 });

  return overallBestScore;
};

  const renderGameScore = (gameName, key, isUserScore) => {
    return (
      <GameScore
        key={key}
        gameName={gameName}
        isUserScore={isUserScore}
        userNickname={userNickname}
        navigateToGame={navigateToGame}
        getBestPlayerData={getBestPlayerData}
      />
    );
  };

  const renderUserScores = () => {
  const userScores = gameNames.map((gameName, index) => {
    const bestPlayerData = getBestPlayerData(gameName, selectedButton === "user");
    return renderGameScore(gameName, index, true, bestPlayerData);
  });

  return (
    <div className="games-container">
      {userScores}
    </div>
  );
};


  const renderAllScores = () => {
    const allScores = gameNames.map((gameName, index) => {
      return renderGameScore(gameName, index, false);
    });

    return (
      <div className="games-container">
        {allScores}
      </div>
    );
  };

  return (
    <div className="best-scores-modal">
      <div className="Title">
        <h1>Mes meilleurs scores</h1>
      </div>
      {userNickname && (
        <>
          <ScoreButton
            buttonType="user"
            selectedButton={selectedButton}
            handleButtonClick={handleButtonClick}
            label="Mes Scores Personnels"
          />
          <ScoreButton
            buttonType="all"
            selectedButton={selectedButton}
            handleButtonClick={handleButtonClick}
            label="Meilleurs Scores"
          />
          {mountedItems.includes("user") && renderUserScores()}
          {mountedItems.includes("all") && renderAllScores()}
        </>
      )}
    </div>
  );
};

export default BestScoresModal;
