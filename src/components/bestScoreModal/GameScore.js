// ...

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
    if (score > 0) {
      message = (
        <>
          Bravo {displayName} ! <br />
          Ton meilleur score est {score}
        </>
      );
    } else {
      message = `Let's go ${displayName} ! Jouons au ${gameName}`;
    }
  } else if (userNickname === bestPlayerNickname) {
    message = (
      <>
        Bravo à toi ! <br />
        Tu as obtenu le meilleur score : {score}
      </>
    );
  } else if (bestPlayerNickname !== "") {
    message = (
      <>
        Bravo à {bestPlayerNickname} ! <br />
        Il a obtenu {score}
      </>
    );
  } else {
       message = (
      <>
        Aucun meilleur joueur <br />
        pour le moment !
      </>
    );
        }

  // Rendu du composant
  return (
    <div className={`game-container visible`}>
      <div className="game-info">
        {/* Utilisation de balises HTML normales pour afficher le texte */}
        <h3 className={`score-text ${isUserScore ? "fixed" : ""}`}>{message}</h3>
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
