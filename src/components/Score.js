import React from "react";

const Score = ({
  isGameActive,
  score,
  bestScore,
  game,
  playerWins,
  draws,
  botWins,
}) => {
  if (game === "morpion") {
    return (
      <div
        className="gameScoreWrapper"
        style={{ display: isGameActive ? "flex" : "none" }}
      >
        <div className="gameScore">
          Joueur : {playerWins} | Matchs nuls : {draws} | Bot : {botWins}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          className="gameScoreWrapper"
          style={{ display: isGameActive ? "flex" : "none" }}
        >
          <div className="gameScore">Score : {score}</div>
          <div className="gameBestScore">Meilleur Score : {bestScore}</div>
        </div>
      </div>
    );
  }
};

export default Score;
