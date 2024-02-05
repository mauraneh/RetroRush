import React, { useRef } from 'react';
import '../assets/css/games.css';
import SnakeCanvas from '../components/SnakeCanvas';
import SnakeScore from '../components/SnakeScore';
import GameTitle from '../components/GameTitle';
import useGameLogic from '../hooks/useSnakeLogic';
import { Link } from 'react-router-dom';
import PlayButton from '../components/BtnPlay';

const SnakeGame = () => {
  const { snake, food, score, bestScore, isGameActive, initializeGame } = useGameLogic();
  const canvasRef = useRef(null);

  return (
    <div className='games' style={{backgroundImage: `url(${require('../assets/images/snakesBG.png')})`}}>
      <GameTitle text="Snake" />
      <div id="gamesContainer">
        <div id='snakeCanvas'>
          <SnakeCanvas canvasRef={canvasRef} snake={snake} food={food} isGameActive={isGameActive} />
        </div>
        <div id='snakeScore'>
          <SnakeScore isGameActive={isGameActive} score={score} bestScore={bestScore} initializeGame={initializeGame} />
        </div>
      </div>
      {!isGameActive && (
        <PlayButton initializeGame={initializeGame} />
      )}
      <Link to="/homepage">
        <button className='retour-button'>Retour</button>
      </Link>
    </div>
  );
};

export default SnakeGame;