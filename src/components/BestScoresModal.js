import React, { useEffect, useState } from "react";
import "../assets/css/bestscoremodal.css";
import { useNavigate } from 'react-router-dom';


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
    const gameRoute = `/${gameName.toLowerCase()}`;  // Assurez-vous que gameName est en minuscules
    navigate(gameRoute);
  };

  const getBestPlayerData = (gameName) => {
const scoresForGame = Object.entries(localStorage)
  .filter(([key]) => key.endsWith(`_${gameName}_bestScore`))
  .map(([key, value]) => {
    const [, playerNickname] = key.match(/^(.+)_(.*)_bestScore$/);
    const score = parseInt(value, 10) || 0;
    return { playerNickname, score };
  });


    return scoresForGame.reduce((best, current) => (current.score > best.score ? current : best), { score: 0 });
  };
const renderGameScore = (gameName, key, isUserScore) => {
  const bestPlayerData = getBestPlayerData(gameName);

  let score = 0;
  let bestPlayerNickname;

  if (bestPlayerData) {
    score = bestPlayerData.score;
    bestPlayerNickname = bestPlayerData.playerNickname;
  }

  const displayName = isUserScore ? userNickname : bestPlayerNickname;
  let message;

  if (isUserScore) {
    if (score > 0) {
      message = `Bravo ${displayName} ! <br />Ton meilleur score<br />est ${score}`;
    } else {
      message = `Let's go ${displayName} ! Jouons au ${gameName}`;
    }
  } else if (userNickname === bestPlayerNickname) {
    message = `Bravo à toi ! <br />Tu as obtenu le meilleur score : ${score}`;
  } else if (bestPlayerNickname!== undefined) {
    message = `Bravo à ${bestPlayerNickname} ! <br />Il a obtenu ${score}`;
  } else {
    message = "Aucun meilleur joueur  <br /> pour le moment";
  }

  return (
    <div key={key} className={`game-container visible`}>
      <div className="game-info">
        <h3 className="score-text" dangerouslySetInnerHTML={{ __html: message }} />
        {isUserScore && score === 0 && (
 <button onClick={() => navigateToGame(gameName)}>Jouer à {gameName}</button>        )}
      </div>
      <h2 className="floating-text">{gameName}</h2>
    </div>
  );
};


  const renderUserScores = () => {
    const userScores = gameNames.map((gameName, index) => {
      return renderGameScore(gameName, index, true);
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
         <button
            onClick={() => handleButtonClick("user")}
            className={selectedButton === "user" ? "selected" : ""}
          >
            Mes Scores Personnels
          </button>
          <button
            onClick={() => handleButtonClick("all")}
            className={selectedButton === "all" ? "selected" : ""}
          >
            Meilleurs Scores
          </button>
          {mountedItems.includes("user") && renderUserScores()}
          {mountedItems.includes("all") && renderAllScores()}
        </>
      )}
    </div>
  );
};

export default BestScoresModal;
