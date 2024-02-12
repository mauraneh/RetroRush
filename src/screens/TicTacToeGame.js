import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cell from "../components/TicTacToeCell";
import Scoreboard from "../components/TicTacToeScoreBoard";
import GameTitle from "../components/GameTitle";
import useTicTacToeLogic from "../hooks/useTicTacToeLogic";

const TicTacToeScreen = () => {
  const {
    board,
    playerWins,
    draws,
    isGameActive,
    botWins,
    cellRefs,
    playerSymbol,
    botSymbol,
    displayBoard,
    addClickEventHandlers,
    handleCellClick,
    setIsGameActive,
  } = useTicTacToeLogic();

  useEffect(() => {
    displayBoard();
    addClickEventHandlers();
  }, [isGameActive]);

  return (
    <>
      <div
        className="games"
        style={{
          backgroundImage: `url(${require("../assets/images/tictactoeBG.png")})`,
        }}
      >
        <GameTitle text="TicTacToe - Game"></GameTitle>
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

export default TicTacToeScreen;
