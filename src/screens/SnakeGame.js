import React, { useRef, text} from 'react';
import '../assets/css/games.css';
import SnakeCanvas from '../components/SnakeCanvas';
import Score from '../components/Score';
import GameTitle from '../components/GameTitle';
import useGameLogic from '../hooks/useSnakeLogic';
import { Link } from 'react-router-dom';
import PlayButton from '../components/BtnPlay';
import Alert from "../components/Alert";
import HowToPlay from "../components/HowToPlay";

const SnakeGame = () => {
  const { snake, food, score, bestScore, isGameActive, initializeGame } = useGameLogic();
  const canvasRef = useRef(null);

  return (
      <div className='games' style={{backgroundImage: `url(${require('../assets/images/snakesBG.png')})`}}>
        <GameTitle text="Snake" />
        <div id="gamesContainer">
          <SnakeCanvas id="snakeCanvas" canvasRef={canvasRef} snake={snake} food={food} isGameActive={isGameActive} />
          <Score isGameActive={isGameActive} score={score} bestScore={bestScore} initializeGame={initializeGame} />
        </div>
        {!isGameActive && (
            <PlayButton initializeGame={initializeGame} />
        )}
        <Link to="/homepage">
          <button className='retour-button button'>Retour</button>
        </Link>
        {alert.show &&
            <Alert status={alert.type} message={alert.message} onRestart={initializeGame} show={alert.show} />
        }
        <HowToPlay gameToExplain={text}/>
        {alert.show &&
            <Alert status={alert.type} message={alert.message} onRestart={initializeGame} show={alert.show} />
        }
  </div>
  );
};

export default SnakeGame;