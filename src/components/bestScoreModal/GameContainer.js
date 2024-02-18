// GameContainer.js
import React from "react";
import GameScore from "./GameScore";

const GameContainer = ({
  gameName,
  userNickname,
  getBestPlayerData,
  viewOnlyUser,
  handleMouseState,
  navigateToGame,
  isHoveredState,
}) => {
  return (
    <div
      className={`game-container visible`}
      onMouseEnter={() => handleMouseState(gameName, true)}
      onMouseLeave={() => handleMouseState(gameName, false)}
      onClick={() => navigateToGame(gameName)}
    >
      <div className="game-info">
        <GameScore
          gameName={gameName}
          userNickname={userNickname}
          getBestPlayerData={getBestPlayerData}
          viewOnlyUser={viewOnlyUser}
        />
      </div>
      {/* Afficher le nom du jeu */}
      {isHoveredState[gameName] ? (
        <h2
          className={`floating-text ${viewOnlyUser ? "play-text" : "show"}`}
          onClick={() => navigateToGame(gameName)}
        >
          JOUER
        </h2>
      ) : (
        <h2
          className="floating-text"
          onMouseEnter={() => handleMouseState(gameName, true)}
          onMouseLeave={() => handleMouseState(gameName, false)}
        >
          {gameName}
        </h2>
      )}
    </div>
  );
};

export default GameContainer;
