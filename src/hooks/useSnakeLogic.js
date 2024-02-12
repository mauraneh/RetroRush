import { useState, useEffect } from 'react';
import { initializeGameSettings, gameLoop, handleKeyPress, spawnFood } from '../utils/snakeHelpers';

const useSnakeLogic = () => {
    const [snake, setSnake] = useState([]);
    const [food, setFood] = useState({});
    const [direction, setDirection] = useState('right');
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(parseInt(localStorage.getItem('bestScore'), 10) || 0);
    const [isGameActive, setIsGameActive] = useState(false);
    const [isGameLost, setIsGameLost] = useState(false);

    useEffect(() => {
        const keyDownHandler = (e) => handleKeyPress(e, setDirection, direction, isGameActive);
        document.addEventListener('keydown', keyDownHandler);
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, [direction, isGameActive]);

    useEffect(() => {
        if (isGameActive) {
            const interval = setInterval(() => {
                gameLoop(snake, direction, setSnake, food, setFood, score, setScore, bestScore, setBestScore, setIsGameActive, setIsGameLost);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [snake, direction, food, score, bestScore, isGameActive, setIsGameLost]);

    const initializeGame = () => {
        setIsGameLost(false);
        setIsGameActive(true);
        setSnake([{ x: 10, y: 10 }]);
        setFood(spawnFood(25, 25));
        setDirection('right');
        setScore(0);
    };

    return { snake, food, direction, score, bestScore, isGameActive, isGameLost, initializeGame };
};

export default useSnakeLogic;
