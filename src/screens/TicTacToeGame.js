import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TicTacToe = () => {
  const [playerTurnFlag, setPlayerTurnFlag] = useState(true);
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const playerSymbol = "X";
  const botSymbol = "O";
  const [playerWins, setPlayerWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [botWins, setBotWins] = useState(0);
  const text = "TicTacToe - Game";

  // Affiche le contenu de la grille
  const displayBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellId = `tictactoe-cell-${i}-${j}`;
        const cell = document.getElementById(cellId);

        // Vérifie si l'élément existe avant de le manipuler
        if (cell) {
          cell.textContent = board[i][j];

          if (board[i][j] === playerSymbol) {
            cell.classList.add("player-symbol");
          } else if (board[i][j] === botSymbol) {
            cell.classList.add("bot-symbol");
          }
        }
      }
    }
  };

  const removeClickEventHandlers = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellId = `tictactoe-cell-${i}-${j}`;
        const cell = document.getElementById(cellId);

        if (cell) {
          cell.removeEventListener("click", () => handleCellClick(i, j));
        }
      }
    }
  };

  // Ajoute des gestionnaires d'événements aux cellules
  const addClickEventHandlers = () => {
    if (!isGameActive) {
      return;
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellId = `tictactoe-cell-${i}-${j}`;
        const cell = document.getElementById(cellId);

        // Vérifie si l'élément existe avant d'ajouter l'événement
        if (cell) {
          cell.addEventListener("click", () => handleCellClick(i, j));
        }
      }
    }
  };

  // Met à jour le tableau des scores
  const updateScoreboard = () => {
    document.getElementById(
      "tictactoe-player-score"
    ).textContent = `Joueur : ${playerWins}`;
    document.getElementById(
      "tictactoe-draw-score"
    ).textContent = `Matchs nuls : ${draws}`;
    document.getElementById(
      "tictactoe-bot-score"
    ).textContent = `Bot : ${botWins}`;
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

  // Gère le tour du joueur
  const playerTurn = (row, col) => {
    if (playerTurnFlag && board[row][col] === "") {
      const updatedBoard = [...board];
      updatedBoard[row][col] = playerSymbol;
      setBoard(updatedBoard);

      if (checkWinner(playerSymbol)) {
        handleGameEnd("Tu as gagné !", setPlayerWins);
      } else if (checkDraw()) {
        handleGameEnd("Match Nul !", setDraws);
      } else {
        setPlayerTurnFlag(false);
        setTimeout(botTurn, 500);
      }
    }
  };

  // Gère le tour du bot
  const botTurn = () => {
    if (checkWinner(playerSymbol) || checkWinner(botSymbol) || checkDraw()) {
      return;
    }

    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = botSymbol;

          if (Math.random() < 0.01) {
            bestMove = { row: i, col: j };
          } else {
            let score = minimax(board, 0, false);

            if (score > bestScore) {
              bestScore = score;
              bestMove = { row: i, col: j };
            }
          }

          board[i][j] = "";
        }
      }
    }

    const { row, col } = bestMove;
    const updatedBoard = [...board];
    updatedBoard[row][col] = botSymbol;
    setBoard(updatedBoard);
    if (checkWinner(botSymbol)) {
      handleGameEnd("Le bot a gagné !", setBotWins);
    } else if (checkDraw()) {
      handleGameEnd("Match nul !", setDraws);
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
  const handleGameEnd = (message, setScore) => {
    setTimeout(() => {
      setIsGameActive(false);
      alert(message);
      setScore((prevScore) => prevScore + 1);
      updateScoreboard();
      removeClickEventHandlers(); // Supprimer les gestionnaires d'événements
      resetGame();
    }, 100);
  };

  // Gère le clic sur une cellule
  const handleCellClick = (row, col) => {
    if (isGameActive && playerTurnFlag && board[row][col] === "") {
      const updatedBoard = [...board];
      updatedBoard[row][col] = playerSymbol;
      setBoard(updatedBoard);

      if (checkWinner(playerSymbol)) {
        handleGameEnd("Tu as gagné !", setPlayerWins);
      } else if (checkDraw()) {
        handleGameEnd("Match Nul !", setDraws);
      } else {
        setPlayerTurnFlag(false);
        setTimeout(botTurn, 500);
      }
    }
  };
  // Réinitialise le jeu
  const resetGame = () => {
    removeClickEventHandlers();
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setIsGameActive(true);
    setPlayerTurnFlag(true);
  };

  useEffect(() => {
    displayBoard();
    addClickEventHandlers();
  }, [addClickEventHandlers, displayBoard, isGameActive]);

  return (
    <>
      <div
        className="games"
        style={{
          backgroundImage: `url(${require("../assets/images/tictactoeBG.png")})`,
        }}
      >
        <h1 className="title">
          {text.split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.2}s` }}>
              {char}
            </span>
          ))}
        </h1>
        <div id="gamesContainer">
          <table>
            <tbody>
              {board.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className={`tictactoe-cell ${
                        board[rowIndex][colIndex] === playerSymbol
                          ? "player-symbol"
                          : ""
                      } ${
                        board[rowIndex][colIndex] === botSymbol
                          ? "bot-symbol"
                          : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div id="gamesContainer">
            <div
              id="snakeScoreWrapper"
              style={{ display: isGameActive ? "flex" : "none" }}
            >
              <div id="tictactoe-player-score">Joueur : {playerWins}</div>
              <div id="tictactoe-draw-score">Matchs nuls : {draws}</div>
              <div id="tictactoe-bot-score">Bot : {botWins}</div>
            </div>
          </div>
        </div>
        {!isGameActive && (
          <button id="start-button" onClick={() => setIsGameActive(true)}>
            ▶
          </button>
        )}
        <Link to="/homepage">
          <button className="retour-button">Retour</button>
        </Link>
      </div>
    </>
  );
};

export default TicTacToe;
