import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Cell from "../components/TicTacToeCell";
import GameTitle from "../components/GameTitle";
import useTicTacToeLogic from "../hooks/useTicTacToeLogic";
import Score from "../components/Score";
import Alert from "../components/Alert";
import HowToPlay from "../components/HowToPlay";

const TicTacToeScreen = () => {
  const {
    board,
    playerWins,
    draws,
    isGameActive,
    gameName,
    botWins,
    cellRefs,
    playerSymbol,
    botSymbol,
    alert,
    bestScore,
    displayBoard,
    addClickEventHandlers,
    handleCellClick,
    setIsGameActive,
    resetGame,
  } = useTicTacToeLogic();

  
  useEffect(() => {
    displayBoard();
    addClickEventHandlers();
  }, []);

  return (
    <>
      <div
        className="games"
        style={{
          backgroundImage: `url(${require("../assets/images/tictactoeBG.png")})`,
        }}
      >
        <GameTitle text={gameName}></GameTitle>
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
          <HowToPlay gameToExplain={gameName} />
          {alert.show && (
            <Alert
              status={alert.type}
              message={alert.message}
              onRestart={resetGame}
              show={alert.show}
            />
          )}
          <Score
            tictactoe={"yes"}
            bestScore={bestScore}
            playerWins={playerWins}
            draws={draws}
           isGameLost={alert.type === "error" ? alert.type : null}
  isGameWin={alert.type !== "error" ? alert.type : null}
            botWins={botWins}
            isGameActive={isGameActive}
          />
        </div>
        {!isGameActive && (
          <button id="start-button" onClick={() => setIsGameActive(true)}>
            ▶
          </button>
        )}
        <div>
          <Link to="/homepage">
            <button className="retour-button button">Retour</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TicTacToeScreen;
