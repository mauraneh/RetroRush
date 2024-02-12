import { useState, useEffect } from 'react';
import { gameLoop, spawnFood } from '../utils/snakeHelpers';
import { useDirectionHandler } from './useDirectionHandler';

const useSnakeLogic = () => {
    const [snake, setSnake] = useState([]);
    const [food, setFood] = useState({});
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(parseInt(localStorage.getItem('bestScore'), 10) || 0);
    const [isGameActive, setIsGameActive] = useState(false);
    const [isGameLost, setIsGameLost] = useState(false);
    const [direction] = useDirectionHandler('right', isGameActive); 

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
        setScore(0);
    };

    return { snake, food, direction, score, bestScore, isGameActive, isGameLost, initializeGame };
};

export default useSnakeLogic;
