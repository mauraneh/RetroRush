import { useState, useEffect } from 'react';
import { initializeGameSettings, gameLoop, handleKeyPress } from '../utils/snakeHelpers';

const useSnakeLogic = () => {
    const [snake, setSnake] = useState([]);
    const [food, setFood] = useState({});
    const [direction, setDirection] = useState('right');
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [isGameActive, setIsGameActive] = useState(false);

    useEffect(() => {
        document.addEventListener('keydown', (e) => handleKeyPress(e, setDirection, direction, isGameActive));
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [direction, isGameActive]);

    useEffect(() => {
        if (isGameActive) {
        const interval = setInterval(() => {
            gameLoop(snake, direction, setSnake, food, setFood, score, setScore, bestScore, setBestScore, setIsGameActive);
        }, 100);
        return () => clearInterval(interval);
        }
    }, [isGameActive, snake, direction, food, score, bestScore]);

    const initializeGame = () => initializeGameSettings(setSnake, setFood, setDirection, setScore, setIsGameActive);

    return { snake, food, score, bestScore, isGameActive, initializeGame };
    };

export default useSnakeLogic;
