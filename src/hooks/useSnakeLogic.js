import { useState, useEffect } from 'react';
import { gameLoop, spawnFood } from '../utils/snakeHelpers';
import { useDirectionHandler } from './useDirectionHandler';
import {snakeConfig} from "../utils/gameHandlerConfig";

const useSnakeLogic = () => {
    const [snake, setSnake] = useState([]);
    const [food, setFood] = useState({});
    const [score, setScore] = useState(0);
    const[userNickname, setUserNickname] = useState(
     (localStorage.getItem("userNickname")) || "Anonymous");
    const [bestScore, setBestScore] = useState(
    parseInt(localStorage.getItem(`${userNickname}_Snake_bestScore`)) || 0 );
    const [isGameActive, setIsGameActive] = useState(false);
    const [isGameLost, setIsGameLost] = useState(false);
    const [direction] = useDirectionHandler(snakeConfig, isGameActive);
 
    useEffect(() => {
        localStorage.setItem(`${userNickname}_Snake_bestScore`, bestScore.toString());
    }, [bestScore, userNickname]);

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
