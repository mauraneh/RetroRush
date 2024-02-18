import React, { useState, useEffect } from "react";
import "../../assets/css/bestscoremodal.css";
import { useNavigate } from "react-router-dom";
import ScoreButton from "./ScoreButton";
import GameContainer from "./GameContainer";

const BestScoresModal = ({ onClose }) => {
  const navigate = useNavigate();
  const gameNames = ["TicTacToe", "Tetris", "Snake", "BreakOut", "Motus"];
  const [mountedItems, setMountedItems] = useState([]);
  const userNickname = localStorage.getItem("userNickname");
  const [selectedButton, setSelectedButton] = useState(null);
  const [viewOnlyUser, setViewOnlyUser] = useState(true);
  const [isHoveredState, setIsHoveredState] = useState({});

  useEffect(() => {
    handleButtonClick("user");
  }, []);

  const handleButtonClick = (buttonType) => {
    setMountedItems([buttonType]);
    setSelectedButton(buttonType);
    setViewOnlyUser(buttonType === "user");
  };

  const navigateToGame = (gameName) => {
    const gameRoute = `/${gameName.toLowerCase()}`;
    navigate(gameRoute);
  };

  // récupère soit le meilleur joueur d'un jeu ou le meilleur score du joueur
  const getBestPlayerData = (gameName) => {
    const keyPattern = viewOnlyUser
      ? `${userNickname}_${gameName}_bestScore`
      : `_${gameName}_bestScore`;

    const scores = Object.entries(localStorage)
      .filter(([key]) => key.endsWith(keyPattern))
      .map(([key, value]) => {
        const [, playerNickname] = key.match(/^(.+)_(.*)_bestScore$/);
        const score = parseInt(value) || 0;
        return { playerNickname, score };
      });

    return viewOnlyUser
      ? scores[0]
      : scores.reduce(
          (best, current) => (current.score > best.score ? current : best),
          { playerNickname: "", score: 0 }
        );
  };
  // gère le passage de la souris sur le bouton
  const handleMouseState = (gameName, isEnter) => {
    setIsHoveredState((prev) => ({ ...prev, [gameName]: isEnter }));
  };

  const renderGameScore = (gameName, index) => {
    return (
      <GameContainer
        key={index}
        gameName={gameName}
        userNickname={userNickname}
        getBestPlayerData={getBestPlayerData}
        viewOnlyUser={viewOnlyUser}
        handleMouseState={handleMouseState}
        navigateToGame={navigateToGame}
        isHoveredState={isHoveredState}
      />
    );
  };
  const renderScoreButton = (buttonType, label) => (
    <ScoreButton
      key={buttonType}
      buttonType={buttonType}
      selectedButton={selectedButton}
      handleButtonClick={() => handleButtonClick(buttonType)}
      label={label}
    />
  );

  const renderScores = (userScores) => (
    <div className="games-container">
      {userScores.map((gameName, index) =>
        renderGameScore(gameName, index, viewOnlyUser)
      )}
    </div>
  );

  return (
    <div className="best-scores-modal">
      <div className="Title">
        <h1>Les scores</h1>
      </div>
      <div className="best-scores-container">
        {userNickname && (
          <>
            {renderScoreButton("user", "Mes Scores")}
            {renderScoreButton("all", "Tous les scores")}
            {mountedItems.includes("user") && renderScores(gameNames)}
            {mountedItems.includes("all") && renderScores(gameNames)}
          </>
        )}
      </div>
    </div>
  );
};

export default BestScoresModal;
