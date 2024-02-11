import React, { useRef } from 'react';
import '../assets/css/games.css';
import SnakeCanvas from '../components/SnakeCanvas';
import SnakeScore from '../components/SnakeScore';
import GameTitle from '../components/GameTitle';
import useGameLogic from '../hooks/useSnakeLogic';
import { Link } from 'react-router-dom';
import PlayButton from '../components/BtnPlay';
import Alert from "../components/Alert";

const cellSize = 20;

const SnakeGame = () => {
  const { snake, food, score, bestScore, isGameActive, initializeGame } = useGameLogic();
  const canvasRef = useRef(null);
  const text = "Snake - Game";

  return (
      <div className='games' style={{backgroundImage: `url(${require('../assets/images/snakesBG.png')})`}}>
        <GameTitle text="Snake" />
        <div id="gamesContainer">
          <SnakeCanvas id="snakeCanvas" canvasRef={canvasRef} snake={snake} food={food} isGameActive={isGameActive} />
          <SnakeScore isGameActive={isGameActive} score={score} bestScore={bestScore} initializeGame={initializeGame} />
        </div>
        {!isGameActive && (
            <PlayButton initializeGame={initializeGame} />
        )}
        <Link to="/homepage">
          <button className='retour-button'>Retour</button>
        </Link>
        {alert.show &&
            <Alert status={alert.type} message={alert.message} onRestart={initializeGame} show={alert.show} />
        }
      </div>
  );
};

export default SnakeGame;