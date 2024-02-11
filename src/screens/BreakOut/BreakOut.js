import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Alert  from '../../components/Alert';
import HowToPlay from "../../components/HowToPlay";
import {useSpeed} from "../../Context/Speedcontext";
import GameTitle from "../../components/GameTitle";
import PlayButton from "../../components/BtnPlay";
import Score from "../../components/Score";

const BreakOut = () => {
    const { speedBall, setSpeedBall } = useSpeed(3);
    const canvasRef = useRef(null);
    const [rightPressed, setRightPressed] = useState(false);
    const [leftPressed, setLeftPressed] = useState(false);
    const [isGameActive, setIsGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [ballPosition, setBallPosition] = useState({ x: 250, y: 470 });
    const [ballDirection, setBallDirection] = useState({ dx: speedBall, dy: -speedBall });
    const [paddlePosition, setPaddlePosition] = useState({ paddleX: 212.5, paddleWidth: 75 });
    const [bricks, setBricks] = useState([]);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const [brickCounterBroken, setBrickCounterBroken] = useState(30);
    const text = 'Breakout - Game';

    const initBricks = () => {
        const brickRowCount = 5;
        const brickColumnCount = 6;
        const initialBricks = [];
        for (let c = 0; c < brickColumnCount; c++) {
            initialBricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                initialBricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        return initialBricks;
    };

    useEffect(() => {
        setBricks(initBricks());
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        canvas.width = 500;
        canvas.height = 500;

        const space = 10;
        const brickWidth = 71;
        const brickHeight = 20;

        const drawBall = () => {
            ctx.beginPath();
            ctx.arc(ballPosition.x, ballPosition.y, space, 0, Math.PI * 2);
            ctx.fillStyle = "#FDFFE6";
            ctx.fill();
            ctx.closePath();
        };

        const drawPaddle = () => {
            ctx.beginPath();
            ctx.rect(paddlePosition.paddleX, canvas.height - space, paddlePosition.paddleWidth, space);
            ctx.fillStyle = "#3A7DBA";
            ctx.fill();
            ctx.closePath();
        };

        const drawBricks = () => {
            for (let c = 0; c < bricks.length; c++) {
                for (let r = 0; r < bricks[c].length; r++) {
                    if (bricks[c][r].status === 1) {
                        const brickX = c * (brickWidth + space) + space;
                        const brickY = r * (brickHeight + space) + space;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = 'rgba(255,35,116,0.94)';
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        };

        const collisionDetection = () => {
            for (let c = 0; c < bricks.length; c++) {
                for (let r = 0; r < bricks[c].length; r++) {
                    const b = bricks[c][r];
                    if (b.status === 1) {
                        if (
                            ballPosition.x > b.x && ballPosition.x < b.x + brickWidth &&
                            ballPosition.y > b.y && ballPosition.y < b.y + brickHeight
                        ) {
                            setBallDirection(prev => ({ dx: prev.dx, dy: -prev.dy }));
                            b.status = 0;
                            setScore(prevScore => prevScore + 1);
                            setBrickCounterBroken(prevCount => prevCount - 1);
                        }
                    }
                }
            }
        };


        const updateGame = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            collisionDetection();

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

        if (isGameActive) {
            requestAnimationFrame(updateGame);
        }

        const handleKeyDown = (event) => {
            if (event.key === "Right" || event.key === "ArrowRight" || event.key === "d") {
                setRightPressed(true);
            } else if (event.key === "Left" || event.key === "ArrowLeft" || event.key === "q") {
                setLeftPressed(true);
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === "Right" || event.key === "ArrowRight" || event.key === "d") {
                setRightPressed(false);
            } else if (event.key === "Left" || event.key === "ArrowLeft" || event.key === "q") {
                setLeftPressed(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [isGameActive, ballPosition, ballDirection, paddlePosition, bricks, score, rightPressed, leftPressed, bestScore]);

    const initializeGame = () => {
        setBrickCounterBroken(30);
        setAlert({ show: false, type: '', message: '' });
        setBallPosition({ x: 250, y: 470 });
        setBallDirection({ dx: speedBall, dy: -speedBall });
        setPaddlePosition({ paddleX: 212.5, paddleWidth: 75 });
        setBricks(initBricks());
        setScore(0);
        setIsGameActive(true);
    };

    return (
        <div className="games breakout">
            <GameTitle text="Break Out" />
            <div id="gamesContainer">
                <canvas ref={canvasRef} id="breakOutCanvas canvas" width="500" height="500"></canvas>
                <Score isGameActive={isGameActive} score={score} bestScore={bestScore} initializeGame={initializeGame} />

                {!isGameActive && (
                    <PlayButton initializeGame={initializeGame} />
                )}
                <Link to="/homepage">
                    <button className="retour-button button">Retour</button>
                </Link>
                <HowToPlay gameToExplain={text}/>

            </div>
            {alert.show &&
                <Alert status={alert.type} message={alert.message} onRestart={initializeGame} show={alert.show} />
            }
        </div>
    );
};

export default BreakOut;
