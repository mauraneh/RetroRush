import React, { useRef } from 'react';
import '../assets/css/games.css';
import SnakeCanvas from '../components/SnakeCanvas';
import Score from '../components/Score';
import GameTitle from '../components/GameTitle';
import useSnakeLogic from '../hooks/useSnakeLogic';
import { Link } from 'react-router-dom';
import PlayButton from '../components/BtnPlay';
import HowToPlay from "../components/HowToPlay";

const SnakeGame = () => {
  const { snake, food, score, bestScore, isGameActive, isGameLost, initializeGame } = useSnakeLogic();
  const canvasRef = useRef(null);

  return (
    <div className='games' style={{backgroundImage: `url(${require('../assets/images/snakesBG.png')})`}}>
      <GameTitle text="Snake" />
      <div id="gamesContainer">
        <SnakeCanvas id="snakeCanvas" canvasRef={canvasRef} snake={snake} food={food} isGameActive={isGameActive} />
      </div>
      {!isGameActive && (
        <PlayButton initializeGame={initializeGame} />
      )}
      <Score
        isGameActive={isGameActive}
        score={score}
        bestScore={bestScore}
        isGameLost={isGameLost}
      />
      <Link to="/homepage">
        <button className='retour-button button'>Retour</button>
      </Link>
      <HowToPlay gameToExplain="Snake"/>
    </div>
  );
};

export default SnakeGame;
