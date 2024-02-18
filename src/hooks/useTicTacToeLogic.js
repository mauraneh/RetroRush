import { useState, useRef, useEffect } from "react";

// Fonction personnalisée pour la logique du jeu Tic Tac Toe
const useTicTacToeLogic = () => {
  // État du tour actuel du joueur
  const [playerTurnFlag, setPlayerTurnFlag] = useState(true);

  // État du plateau de jeu
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
/// Par défaut, le niveau est "facile"
  const [botDifficulty, setBotDifficulty] = useState("easy");

  // Symbole du joueur humain
  const playerSymbol = "X";

  // État de l'alerte pour afficher des messages de fin de jeu
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  // Symbole du bot
  const botSymbol = "O";

  // États des statistiques du jeu
  const [playerWins, setPlayerWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [botWins, setBotWins] = useState(0);

  // Référence aux cellules du plateau de jeu
  const cellRefs = useRef([]);

  // Nom du joueur (récupéré depuis le stockage local) ou "Anonymous" par défaut
  const [userNickname, setUserNickname] = useState(
    localStorage.getItem("userNickname") || "Anonymous"
  );

  // Meilleur score du joueur (récupéré depuis le stockage local) ou 0 par défaut
  const [bestScore, setBestScore] = useState(
    parseInt(localStorage.getItem(`${userNickname}_TicTacToe_bestScore`)) || 0
  );

  // Nom du jeu
  const gameName = "TicTacToe - Game";

  useEffect(() => {
    localStorage.setItem(`${userNickname}_TicTacToe_bestScore`, bestScore.toString());
  }, [bestScore, userNickname]);
  
   
  // Mettre à jour difficultés
const setDifficulty = (difficulty) => {
  setBotDifficulty(difficulty);
  setIsGameActive(false);
};

  // Affiche le contenu de la grille
  const displayBoard = () => {
    board.forEach((row, i) => {
      row.forEach((_, j) => {
        if (cellRefs.current[i] && cellRefs.current[i][j]) {
          const cell = cellRefs.current[i][j];
          cell.textContent = board[i][j];

          if (board[i][j] === playerSymbol) {
            cell.classList.add("player-symbol");
          } else if (board[i][j] === botSymbol) {
            cell.classList.add("bot-symbol");
          }
        }
      });
    });
  };

  // Ajoute des gestionnaires d'événements aux cellules
 const addClickEventHandlers = () => {
    if (!isGameActive) {
      return;
    }

    cellRefs.current.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        cell.onclick = () => handleCellClick(rowIndex, colIndex);
      });
    });
  };

  // Vérifie si un joueur a gagné
  const checkWinner = (symbol) => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === symbol &&
        board[i][1] === symbol &&
        board[i][2] === symbol
      ) {
        return true;
      }
    }

    for (let j = 0; j < 3; j++) {
      if (
        board[0][j] === symbol &&
        board[1][j] === symbol &&
        board[2][j] === symbol
      ) {
        return true;
      }
    }

    if (
      board[0][0] === symbol &&
      board[1][1] === symbol &&
      board[2][2] === symbol
    ) {
      return true;
    }
    if (
      board[0][2] === symbol &&
      board[1][1] === symbol &&
      board[2][0] === symbol
    ) {
      return true;
    }

    return false;
  };

  // Vérifie s'il y a un match nul
  const checkDraw = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  };

   // Gère le tour du bot
  const botTurn = () => {
    // Vérification des conditions de fin du jeu
    if (checkWinner(playerSymbol) || checkWinner(botSymbol) || checkDraw()) {
      return;
    }

    // Initialisation des variables
    let bestScore = -Infinity;
    let bestMove;

// Exploration de tous les coups possibles
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    // Vérification si la cellule est vide
    if (board[i][j] === "") {
      // Simulation du coup du bot dans la cellule
      board[i][j] = botSymbol;

      // Choix en fonction du niveau de difficulté
      if (botDifficulty === "easy" && Math.random() < 0.5) {
        bestMove = { row: i, col: j }; // 50% de chance de jouer aléatoirement
      } else if (botDifficulty === "medium" && Math.random() < 0.8) {
        bestMove = { row: i, col: j }; // 80% de chance de jouer aléatoirement
      } else {
        // Utilisation de l'algorithme minimax pour évaluer le score
        let score = minimax(board, 0, false);

        // Mise à jour du meilleur score et du meilleur coup
        if (score > bestScore) {
          bestScore = score;
          bestMove = { row: i, col: j };
        }
      }

      // Annulation du coup simulé
      board[i][j] = "";
    }
  }
}
    // Application du meilleur coup du bot
    const { row, col } = bestMove;
    const updatedBoard = [...board];
    updatedBoard[row][col] = botSymbol;
    setBoard(updatedBoard);

    // Vérification des conditions de fin après le coup du bot
    if (checkWinner(botSymbol)) {
      handleGameEnd("Le bot a gagné !", setBotWins, "error");
    } else if (checkDraw()) {
      handleGameEnd("Match nul !", setDraws, "win");
    } else {
      setPlayerTurnFlag(true);
    }
  };


  // Fonction minimax pour le bot
  const minimax = (board, depth, isMaximizingPlayer) => {
    let score = evaluateState();

    if (score !== undefined) {
      return score;
    }

    if (isMaximizingPlayer) {
      let bestScore = -Infinity;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = botSymbol;
            let score = minimax(board, depth + 1, false);
            board[i][j] = "";
            bestScore = Math.max(score, bestScore);
          }
        }
      }

      return bestScore;
    } else {
      let bestScore = Infinity;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = playerSymbol;
            let score = minimax(board, depth + 1, true);
            board[i][j] = "";
            bestScore = Math.min(score, bestScore);
          }
        }
      }

      return bestScore;
    }
  };

  // Évalue l'état actuel du jeu
  const evaluateState = () => {
    if (checkWinner(playerSymbol)) {
      return -1;
    } else if (checkWinner(botSymbol)) {
      return 1;
    } else if (checkDraw()) {
      return 0;
    } else {
      return undefined;
    }
  };

  // Fonction générique pour gérer la fin du jeu
 const handleGameEnd = (message, setScore, type) => {
    setTimeout(() => {
      // Mettre à jour le meilleur score si le score actuel est supérieur
      setIsGameActive(false);
      setAlert({ show: true, type: type, message: message });
      setScore((prevScore) => prevScore + 1);
    }, 100);
  };

  // Gère le clic sur une cellule
  const handleCellClick = (row, col) => {
    if (isGameActive && playerTurnFlag && board[row][col] === "") {
      const updatedBoard = [...board];
      updatedBoard[row][col] = playerSymbol;
      setBoard(updatedBoard);

      if (checkWinner(playerSymbol)) {
            if ( playerWins + 1 > bestScore) {
      setBestScore(playerWins + 1);
    }
        handleGameEnd("Tu as gagné !", setPlayerWins, "win");
      } else if (checkDraw()) {
        handleGameEnd("Match Nul !", setDraws, "error");
      } else {
        setPlayerTurnFlag(false);
        setTimeout(botTurn, 500);
      }
    }
  };

  // Réinitialise le jeu
  const resetGame = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setIsGameActive(true);
    setPlayerTurnFlag(true);
    setAlert({ show: false, type: "", message: "" });
  };

  return {
    playerTurnFlag,
    board,
    playerWins,
    draws,
    isGameActive,
    botWins,
    cellRefs,
    alert,
    bestScore,
    gameName,
    botDifficulty,
    setDifficulty,
    displayBoard,
    setIsGameActive,
    addClickEventHandlers,
    checkWinner,
    checkDraw,
    botTurn,
    handleGameEnd,
    handleCellClick,
    resetGame,
  };
};

export default useTicTacToeLogic;
