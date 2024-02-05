import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Cell from "../components/TicTacToeCell";
import Scoreboard from "../components/TicTacToeScoreBoard";

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
  const cellRefs = useRef([]);

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

  const removeClickEventHandlers = () => {
    cellRefs.current.forEach((row) => {
      row.forEach((cell) => {
        cell.onClick = null;
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
        cell.onClick = () => handleCellClick(rowIndex, colIndex);
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
  }, [displayBoard, isGameActive]);

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
                    <Cell
                      key={colIndex}
                      value={cell}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      isPlayerSymbol={cell === playerSymbol}
                      isBotSymbol={cell === botSymbol}
                      ref={(cellRef) => {
                        if (!cellRefs.current[rowIndex]) {
                          cellRefs.current[rowIndex] = [];
                        }
                        cellRefs.current[rowIndex][colIndex] = cellRef;
                      }}
                      row={rowIndex}
                      col={colIndex}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Scoreboard
            playerWins={playerWins}
            draws={draws}
            botWins={botWins}
            isGameActive={isGameActive}
          />
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
