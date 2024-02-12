import { useState, useEffect } from 'react';
import { useSpeed } from "../Context/Speedcontext";
import { initBricks } from '../utils/breakOutHelper';

export const useBreakOutLogic = () => {
    const { speedBall } = useSpeed();
    const [isGameActive, setIsGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const [bricks, setBricks] = useState([]);
    const [ballPosition, setBallPosition] = useState({ x: 250, y: 470 });
    const [paddlePosition, setPaddlePosition] = useState({ paddleX: 212.5, paddleWidth: 75 });
    const [ballDirection, setBallDirection] = useState({ dx: speedBall, dy: -speedBall });
    const [brickCounterBroken, setBrickCounterBroken] = useState(30);


    const [rightPressed, setRightPressed] = useState(false);
    const [leftPressed, setLeftPressed] = useState(false);

    useEffect(() => {
        setBricks(initBricks(5, 6));
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowRight") setRightPressed(true);
            else if (event.key === "ArrowLeft") setLeftPressed(true);
        };
        const handleKeyUp = (event) => {
            if (event.key === "ArrowRight") setRightPressed(false);
            else if (event.key === "ArrowLeft") setLeftPressed(false);
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
/*
useEffect(() => {
    if (!isGameActive) return;

    const interval = setInterval(() => {
        updateGameState();
    }, 1000 / 60); // Exemple d'exécution 60 fois par seconde.

    return () => clearInterval(interval);
}, [isGameActive, ballPosition, ballDirection, paddlePosition]); // Ajoutez d'autres dépendances au besoin.
 */
    useEffect(() => {
        if (!isGameActive) return;

        const handleKeyDown = (event) => {
            if (event.key === "Right" || event.key === "ArrowRight") {
                setPaddlePosition(prev => ({ ...prev, paddleX: Math.min(prev.paddleX + 7, 500 - prev.paddleWidth) }));
            } else if (event.key === "Left" || event.key === "ArrowLeft") {
                setPaddlePosition(prev => ({ ...prev, paddleX: Math.max(prev.paddleX - 7, 0) }));
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isGameActive, paddlePosition]);

    const initializeGame = () => {
        setIsGameActive(true);
        setScore(0);
        setAlert({ show: false, type: '', message: '' });
        setBricks(initBricks(5, 6));
        setBrickCounterBroken(30);
        setBallPosition({ x: 250, y: 470 });
        setPaddlePosition({ paddleX: 212.5, paddleWidth: 75 });
        setBallDirection({ dx: speedBall, dy: -speedBall });
    };

    const updateGameState = ( ctx, canvas, ballPosition, ballDirection, paddlePosition, bricks, setBallPosition, setBallDirection, setIsGameActive, setAlert, space, score, bestScore) => {
        if (!isGameActive) return;


        let newX = ballPosition.x + ballDirection.dx;
        let newY = ballPosition.y + ballDirection.dy;
        let newPaddleX = paddlePosition.paddleX;

        if (brickCounterBroken === 0) {
            setAlert({ show: true, type: 'win', message: 'Vous avez gagné! ' });
            setIsGameActive(false);
        }

        if (newX > canvas.width - space || newX < space) {
            setBallDirection(prev => ({ dx: -prev.dx, dy: prev.dy }));
        }
        if (newY < space) {
            setBallDirection(prev => ({ dx: prev.dx, dy: -prev.dy }));
        } else if (newY > canvas.height - space) {
            if (newX > newPaddleX && newX < newPaddleX + paddlePosition.paddleWidth) {
                let impactPoint = (newX - (newPaddleX + paddlePosition.paddleWidth / 2)) / (paddlePosition.paddleWidth / 2);
                let angle = impactPoint * Math.PI / 4;
                let speed = Math.sqrt(ballDirection.dx ** 2 + ballDirection.dy ** 2);
                setBallDirection({
                    dx: speed * Math.sin(angle),
                    dy: -speed * Math.cos(angle)
                });
            } else {
                setAlert({ show: true, type: 'error', message: 'Vous avez perdu ! ' });
                setIsGameActive(false);
                if (score > bestScore) {
                    setBestScore(score);
                }
            }
        }

        if (rightPressed && newPaddleX < canvas.width - paddlePosition.paddleWidth) {
            newPaddleX += 7;
        } else if (leftPressed && newPaddleX > 0) {
            newPaddleX -= 7;
        }

        setBallPosition({ x: newX, y: newY });
        setPaddlePosition(prev => ({ ...prev, paddleX: newPaddleX }));
    };

    return { score, bestScore, isGameActive, initializeGame, alert, bricks, ballPosition, paddlePosition, updateGameState };
};

export default useBreakOutLogic;
