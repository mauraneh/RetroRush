import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/games.css';
import { Link } from 'react-router-dom';

const cellSize = 20;

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([]);
  const [direction, setDirection] = useState("right");
  const [food, setFood] = useState({});
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const text = "Snake - Game";


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isGameActive) return;
      switch (event.key) {
        case "ArrowUp": if (direction !== "down") setDirection("up"); break;
        case "ArrowDown": if (direction !== "up") setDirection("down"); break;
        case "ArrowLeft": if (direction !== "right") setDirection("left"); break;
        case "ArrowRight": if (direction !== "left") setDirection("right"); break;
        default: break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, isGameActive]);

  useEffect(() => {
    if (isGameActive) {
      const gameLoop = setInterval(updateGame, 1000 / 15);
      return () => clearInterval(gameLoop);
    }
  }, [isGameActive, snake, direction, food, score]);

  const initializeGame = () => {
    setTimeout(() => {
      setIsGameActive(true);
    setSnake([{ x: 10, y: 10 }]);
    setFood({
      x: Math.floor(Math.random() * canvasRef.current.width / cellSize),
      y: Math.floor(Math.random() * canvasRef.current.height / cellSize)
    });
    setDirection("right");
    setScore(0);
    setIsGameActive(true);
  }, 1000);
  };

  const updateGame = () => {
    if (!isGameActive) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    let newSnake = [...snake];
    let head = { ...newSnake[0] }; // Copie de la tête du serpent

    switch (direction) {
      case "right": head.x += 1; break;
      case "left": head.x -= 1; break;
      case "up": head.y -= 1; break;
      case "down": head.y += 1; break;
      default: break;
    }

    // Vérifier la collision avec la nourriture
    if (head.x === food.x && head.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * canvas.width / cellSize),
        y: Math.floor(Math.random() * canvas.height / cellSize),
      });
      setScore(score + 1);
      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }
    } else {
      newSnake.pop();
    }

    // Vérifier la collision avec les murs ou avec lui-même
    if (
      head.x >= canvas.width / cellSize ||
      head.x < 0 ||
      head.y >= canvas.height / cellSize ||
      head.y < 0 ||
      newSnake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      setIsGameActive(false);
      alert(`Game Over! Votre score est de ${score}.`);
      return;
    }

    newSnake.unshift(head);

    setSnake(newSnake);

    context.fillStyle = "#14b400"; // Couleur du serpent
    newSnake.forEach(segment => context.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize));

    context.fillStyle = "#fd028c"; // Couleur de la nourriture
    context.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
  };

  return (
    <div className='games' style={{backgroundImage: `url(${require('../assets/images/snakesBG.png')})`}}>
      <h1 className="title">
        {text.split('').map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.2}s` }}>{char}</span>
        ))}
      </h1>
      <div id="gamesContainer">
        <canvas ref={canvasRef} id="snakeCanvas" width="500" height="500"></canvas>
        <div id="snakeScoreWrapper" style={{ display: isGameActive ? 'flex' : 'none' }}>
          <div id="snakeScore">Score : {score}</div>
          <div id="snakeBestScore">Meilleur Score : {bestScore}</div>
        </div>
      </div>
      {!isGameActive && (
          <button id="start-button" onClick={initializeGame}>▶</button>
        )}
        <Link to="/homepage">
          <button className='retour-button'>Retour</button>
        </Link>
    </div>
    
  );
};

export default SnakeGame;
