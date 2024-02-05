import React, { useState, useEffect } from "react";

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
  const [botWins, setBotWins] = useState(0);

  useEffect(() => {
    displayBoard();
    addClickEventHandlers();
  }, []); // Run once on component mount

  const displayBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.getElementById(`tictactoe-cell-${i}-${j}`);
        cell.textContent = board[i][j];

        if (board[i][j] === playerSymbol) {
          cell.classList.add("player-symbol");
        } else if (board[i][j] === botSymbol) {
          cell.classList.add("bot-symbol");
        }
      }
    }
  };

  const addClickEventHandlers = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.getElementById(`tictactoe-cell-${i}-${j}`);
        cell.addEventListener("click", () => {
          playerTurn(i, j);
        });
      }
    }
  };

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

  const playerTurn = (row, col) => {
    if (playerTurnFlag && board[row][col] === "") {
      const updatedBoard = [...board];
      updatedBoard[row][col] = playerSymbol;
      setBoard(updatedBoard);
      displayBoard();

      if (checkWinner(playerSymbol)) {
        setTimeout(() => {
          alert("Tu as gagné !");
          setPlayerWins(playerWins + 1);
          updateScoreboard();
          resetGame();
        }, 100);
      } else if (checkDraw()) {
        setTimeout(() => {
          alert("Match Nul !");
          setDraws(draws + 1);
          updateScoreboard();
          resetGame();
        }, 100);
      } else {
        setPlayerTurnFlag(false);
        setTimeout(botTurn, 500);
      }
    }
  };

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
    board[row][col] = botSymbol;
    displayBoard();

    if (checkWinner(botSymbol)) {
      setTimeout(() => {
        alert("Le bot a gagné !");
        setBotWins(botWins + 1);
        updateScoreboard();
        resetGame();
      }, 100);
    } else if (checkDraw()) {
      setTimeout(() => {
        alert("Match nul !");
        setDraws(draws + 1);
        updateScoreboard();
        resetGame();
      }, 100);
    } else {
      setPlayerTurnFlag(true);
    }
  };

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

  const resetGame = () => {
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    displayBoard();
    setPlayerTurnFlag(true);
  };

  const styleSheet = `
    @media screen and (max-width: 992px) {
      #tictactoeContainer {
        display: none !important;
      }
    }

    #tictactoeContainer {
      width: 28.125rem;
      margin: 0 auto;
    }

    table {
      border-collapse: collapse;
      margin: 1.25rem auto;
      background-color: #101010;
    }

    td {
      width: 9.375rem;
      height: 9.375rem;
      text-align: center;
      font-size: 4.5rem;
      border: 1px solid #333;
      cursor: pointer;
    }

    #tictactoe-scoreboard {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 1rem;
    }

    #tictactoe-scoreboard span {
      margin-right: 0.625rem;
    }

    .player-symbol, .bot-symbol {
      color: #fdd33c;
    }
  `;

  return (
    <>
      <style>{styleSheet}</style>

      <div id="tictactoeContainer">
        <table>
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    id={`tictactoe-cell-${rowIndex}-${colIndex}`}
                    className="tictactoe-cell"
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div id="tictactoe-scoreboard">
          <span id="tictactoe-player-score">Joueur : {playerWins}</span>
          <span id="tictactoe-draw-score">Matchs nuls : {draws}</span>
          <span id="tictactoe-bot-score">Bot : {botWins}</span>
        </div>
      </div>
    </>
  );
};

export default TicTacToe;
