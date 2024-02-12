import { useState, useEffect } from 'react';
import { useSpeed } from "../Context/Speedcontext";
import {collisionDetection, initBricks} from '../utils/breakOutHelper';
import {useDirectionHandler} from "./useDirectionHandler";
import { breakoutConfig} from "../utils/gameHandlerConfig";

export const useBreakOutLogic = () => {
    const { speedBall } = useSpeed();
    const [isGameActive, setIsGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(
    parseInt(localStorage.getItem(`BreakOut_bestScore`), 10) || 0 );
    const [bricks, setBricks] = useState([]);
    const [ballPosition, setBallPosition] = useState({ x: 250, y: 470 });
    const [paddlePosition, setPaddlePosition] = useState({ paddleX: 212.5, paddleWidth: 75 });
    const [ballDirection, setBallDirection] = useState({ dx: speedBall, dy: -speedBall });
    const [brickCounterBroken, setBrickCounterBroken] = useState(30);
    const [isGameLost, setIsGameLost] = useState(false);
    const [isGameWin, setIsGameWin] = useState(false);

    const [direction] = useDirectionHandler(breakoutConfig, isGameActive);

    useEffect(() => {
    localStorage.setItem(`BreakOut_bestScore`, bestScore.toString());
    }, [bestScore]);

    useEffect(() => {
        setBricks(initBricks(5, 6));
    }, []);

    const updateGameState = ( ctx, canvas) => {
        if (!isGameActive) return;

        let newX = ballPosition.x + ballDirection.dx;
        let newY = ballPosition.y + ballDirection.dy;
        let newPaddleX = paddlePosition.paddleX;

        collisionDetection(ballPosition, bricks, 71, 20, setBallDirection, setScore, setBrickCounterBroken);

        if (brickCounterBroken === 0) {
            setIsGameWin(true);
            setIsGameActive(false);
        }

        if (newX > canvas.width - 10 || newX < 10) {
            setBallDirection(prev => ({ dx: -prev.dx, dy: prev.dy }));
        }
        if (newY < 10) {
            setBallDirection(prev => ({ dx: prev.dx, dy: -prev.dy }));
        } else if (newY > canvas.height - 10) {
            if (newX > newPaddleX && newX < newPaddleX + paddlePosition.paddleWidth) {
                let impactPoint = (newX - (newPaddleX + paddlePosition.paddleWidth / 2)) / (paddlePosition.paddleWidth / 2);
                let angle = impactPoint * Math.PI / 4;
                let speed = Math.sqrt(ballDirection.dx ** 2 + ballDirection.dy ** 2);
                setBallDirection({
                    dx: speed * Math.sin(angle),
                    dy: -speed * Math.cos(angle)
                });
            } else {
                setIsGameLost(true);
                setIsGameActive(false);
                if (score > bestScore) {
                    setBestScore(score);
                }
            }
        }

        if (direction === 'right' && newPaddleX < canvas.width - paddlePosition.paddleWidth) {
            newPaddleX += 7;
        } else if (direction === 'left' && newPaddleX > 0) {
            newPaddleX -= 7;
        }

        setBallPosition({ x: newX, y: newY });
        setPaddlePosition(prev => ({ ...prev, paddleX: newPaddleX }));
    };

    const initializeGame = () => {
        setIsGameWin(false);
        setIsGameLost(false);
        setIsGameActive(true);
        setScore(0);
        setBricks(initBricks(5, 6));
        setBrickCounterBroken(30);
        setBallPosition({ x: 250, y: 470 });
        setPaddlePosition({ paddleX: 212.5, paddleWidth: 75 });
        setBallDirection({ dx: speedBall, dy: -speedBall });
    };

    return { isGameLost,isGameWin, score, bestScore, isGameActive, initializeGame, bricks, ballPosition, paddlePosition, updateGameState };
};

export default useBreakOutLogic;
