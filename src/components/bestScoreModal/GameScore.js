const GameScore = ({ gameName, isUserScore, userNickname, navigateToGame, getBestPlayerData, viewOnlyUser }) => {
  // Obtenir les données du meilleur joueur pour le jeu en cours
  const bestPlayerData = getBestPlayerData(gameName, isUserScore);

  // Initialiser les variables pour le score et le nom du meilleur joueur
  let score = 0;
  let bestPlayerNickname;

  // Mettre à jour les variables si des données pour le meilleur joueur existent
  if (bestPlayerData) {
    score = bestPlayerData.score;
    bestPlayerNickname = bestPlayerData.playerNickname;
  }


  // Initialiser le message en fonction du résultat
  let message;

  if (isUserScore) {
    if (score > 0) {
      message = (
        <>
          Bravo {userNickname} ! <br />
          Ton meilleur score est {score}
        </>
      );
    } else {
      message = (
        <>
          Let's go {userNickname} ! <br />
          Jouons au {gameName}
        </>
      );
    }
  } else {
    if (score > 0) {
      if (userNickname === bestPlayerNickname) {
        message = (
          <>
            Bravo à toi ! <br />
            Tu as obtenu le meilleur score : {score}
          </>
        );
      } else {
        message = (
          <>
            Bravo à {bestPlayerNickname} ! <br />
            Il a obtenu {score}
          </>
        );
      }
    } else {
      message = (
        <>
          Aucun meilleur joueur <br />
          pour le moment !
        </>
      );
    }
  }

  // Rendu du composant
  return (
    <div className={`game-container visible`}>
      <div className="game-info">
        {/* Utilisation de balises HTML normales pour afficher le texte */}
        <h3 className={`score-text ${isUserScore ? "fixed" : ""}`}>{message}</h3>
      </div>
      {/* Afficher le nom du jeu */}
      <h2 className="floating-text">{gameName}</h2>
    </div>
  );
};

export default GameScore;
