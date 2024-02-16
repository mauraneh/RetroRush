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
  const [viewOnlyUser, setViewOnlyUser] = useState(true);

  const handleButtonClick = (buttonType) => {
    setMountedItems([buttonType]);
    setSelectedButton(buttonType);
    setViewOnlyUser(buttonType === "user"); // Update viewOnlyUser based on buttonType
  };

  const navigateToGame = (gameName) => {
    const gameRoute = `/${gameName.toLowerCase()}`;
    navigate(gameRoute);
  };

  const getBestPlayerData = (gameName) => {
    const keyPattern = viewOnlyUser ? `${userNickname}_${gameName}_bestScore` : `_${gameName}_bestScore`;

    const scores = Object.entries(localStorage)
      .filter(([key]) => key.endsWith(keyPattern))
      .map(([key, value]) => {
        const [, playerNickname] = key.match(/^(.+)_(.*)_bestScore$/);
        const score = parseInt(value) || 0;
        return { playerNickname, score };
      });

    return viewOnlyUser ? scores[0] : scores.reduce((best, current) => (current.score > best.score ? current : best), { playerNickname: "", score: 0 });
  };

  const renderGameScore = (gameName, index, isUserScore) => {
    const bestPlayerData = getBestPlayerData(gameName);
    return (
      <GameScore
        key={index}
        gameName={gameName}
        isUserScore={isUserScore}
        userNickname={userNickname}
        navigateToGame={navigateToGame}
        getBestPlayerData={getBestPlayerData}
        viewOnlyUser={viewOnlyUser}
      />
    );
  };

  const renderScores = () => (
    <div className="games-container">
      {gameNames.map((gameName, index) => renderGameScore(gameName, index, viewOnlyUser))}
    </div>
  );

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
            handleButtonClick={() => handleButtonClick("user")}
            label="Mes Scores"
          />
          <ScoreButton
            buttonType="all"
            selectedButton={selectedButton}
            handleButtonClick={() => handleButtonClick("all")}
            label="Meilleurs Scores"
          />
          {mountedItems.includes("user") && renderScores()}
          {mountedItems.includes("all") && renderScores()}
        </>
      )}
    </div>
  );
};

export default BestScoresModal;
