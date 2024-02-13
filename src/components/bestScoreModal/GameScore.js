import React from "react";

const GameScore = ({ gameName, isUserScore, userNickname, navigateToGame, getBestPlayerData }) => {
  // Obtenir les données du meilleur joueur pour le jeu en cours
  const bestPlayerData = getBestPlayerData(gameName);

  // Initialiser les variables pour le score et le nom du meilleur joueur
  let score = 0;
  let bestPlayerNickname;

  // Mettre à jour les variables si des données pour le meilleur joueur existent
  if (bestPlayerData) {
    score = bestPlayerData.score;
    bestPlayerNickname = bestPlayerData.playerNickname;
  }

  // Déterminer le nom à afficher en fonction de l'utilisateur ou du meilleur joueur
  const displayName = isUserScore ? userNickname : bestPlayerNickname;

  // Initialiser le message en fonction du résultat
  let message;

  if (isUserScore) {
    // Si l'utilisateur a un score supérieur à 0, afficher un message de félicitations avec le score
    if (score > 0) {
      message = `Bravo ${displayName} ! <br />Ton meilleur score<br />est ${score}`;
    } else {
      // Sinon, encourager l'utilisateur à jouer au jeu
      message = `Let's go ${displayName} ! Jouons au ${gameName}`;
    }
  } else if (userNickname === bestPlayerNickname) {
    // Si l'utilisateur est le meilleur joueur, afficher un message de félicitations avec le score
    message = `Bravo à toi ! <br />Tu as obtenu le meilleur score : ${score}`;
  } else if (bestPlayerNickname !== "") {
    // Si un autre joueur a le meilleur score, afficher un message de félicitations avec le score
    message = `Bravo à ${bestPlayerNickname} ! <br />Il a obtenu ${score}`;
  } else {
    // Si aucun meilleur joueur, afficher un message par défaut
    message = "Aucun meilleur joueur  <br /> pour le moment";
  }

  // Rendu du composant
  return (
    <div className={`game-container visible`}>
      <div className="game-info">
        {/* Utilisation de dangerouslySetInnerHTML pour afficher du HTML dans le message */}
        <h3 className="score-text" dangerouslySetInnerHTML={{ __html: message }} />
        {/* Afficher le bouton de jeu si l'utilisateur n'a pas de score */}
        {isUserScore && score === 0 && (
          <button onClick={() => navigateToGame(gameName)}>Jouer à {gameName}</button>
        )}
      </div>
      {/* Afficher le nom du jeu */}
      <h2 className="floating-text">{gameName}</h2>
    </div>
  );
};

export default GameScore;
