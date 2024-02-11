import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";

const TETROMINOS = {
    0: { shape: [[0]], color: '0, 0, 0' },
    I: {
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        color: '80, 227, 230',
    },
    J: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0],
        ],
        color: '36, 95, 223',
    },
    L: {
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L'],
        ],
        color: '223, 173, 36',
    },
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O'],
        ],
        color: '223, 217, 36',
    },
    S: {
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0],
        ],
        color: '48, 211, 56',
    },
    T: {
        shape: [
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0],
        ],
        color: '132, 61, 198',
    },
    Z: {
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0],
        ],
        color: '227, 78, 78',
    },
};

const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino =
        TETROMINOS[tetrominos[Math.floor(Math.random() * tetrominos.length)]];
    return { ...randTetromino, pos: { x: 0, y: 0 } };
};


const createBoard = (w, h) => Array.from({ length: h }, () => Array(w).fill(0));

const Tetris = () => {
    const [bestScore, setBestScore] = useState(localStorage.getItem('tetrisBestScore') || 0);

    const [board, setBoard] = useState(createBoard(10, 20));
    const [currentPiece, setCurrentPiece] = useState(randomTetromino());
    const [nextPiece, setNextPiece] = useState(randomTetromino());
    const [isGameActive, setIsGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const canvasRef = useRef(null);
    const requestRef = useRef(null);
    const text = 'Tetris - Game';
    useEffect(() => {
        if (!isGameActive) return;

        const context = canvasRef.current.getContext('2d');
        context.scale(20, 20);

        const renderLoop = () => {
            updateGame();
            draw();
            requestRef.current = requestAnimationFrame(renderLoop);
        };

        renderLoop();

        return () => cancelAnimationFrame(requestRef.current);
    }, [isGameActive]);



    const keyListener = (event) => {
        if (!isGameActive) return;

        switch (event.keyCode) {
            case 37:
                movePiece(-1, 0);
                break;
            case 39:
                movePiece(1, 0);
                break;
            case 40:
                movePiece(0, 1);
                break;
            case 38:
                rotatePiece();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', keyListener);
        return () => window.removeEventListener('keydown', keyListener);
    }, [keyListener]);

    const draw = () => {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawBoard(context, board);
        drawPiece(context, currentPiece);
    };





    const drawPiece = (context, { shape, pos }) => {
        console.log('Drawing piece', { shape, pos });

        shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillStyle = TETROMINOS[value].color;
                    context.fillRect(x + pos.x, y + pos.y, 1, 1); // Utilisation de pos directement
                }
            });
        });
    };

    const drawBoard = (context, board) => {
        board.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillStyle = TETROMINOS[value].color;
                    context.fillRect(x, y, 1, 1);
                }
            });
        });
    };

    const movePiece = (dirX, dirY) => {
        if (!checkCollision(currentPiece, board, { x: dirX, y: dirY })) {
            setCurrentPiece(prev => ({
                ...prev,
                pos: { x: prev.pos.x + dirX, y: prev.pos.y + dirY }
            }));
        } else if (dirY > 0) {
            fixPieceToBoard();
            setCurrentPiece(nextPiece);
            setNextPiece(randomTetromino());
            clearLines();
        }
    };



    const checkCollision = (piece, board, { x: moveX, y: moveY }) => {
        for (let y = 0; y < piece.shape.length; y += 1) {
            for (let x = 0; x < piece.shape[y].length; x += 1) {
                if (piece.shape[y][x] !== 0 && (board[y + piece.pos.y + moveY] && board[y + piece.pos.y + moveY][x + piece.pos.x + moveX]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    };

    const rotatePiece = (piece, direction) => {
        setCurrentPiece(prev => ({
            ...prev,
            shape: prev.shape.map((row, y) => row.map((val, x) => prev.shape[prev.shape.length - 1 - x][y]))
        }));

        if (checkCollision(currentPiece, board, { x: 0, y: 0 })) {
            // Si la rotation cause une collision, on annule la rotation
            setCurrentPiece(prev => ({
                ...prev,
                shape: prev.shape.map((row, y) => row.map((val, x) => prev.shape[x][prev.shape.length - 1 - y]))
            }));
        }
    };
    const updateGame = () => {
        if (!isGameActive) return;

        const newPos = { ...currentPiece.pos, y: currentPiece.pos.y + 1 };
        if (!checkCollision(currentPiece, board, { x: 0, y: 1 })) {
            setCurrentPiece({ ...currentPiece, pos: newPos });
        } else {
            fixPieceToBoard();
            clearLines();
            setCurrentPiece({ ...nextPiece, pos: { x: 5, y: 0 } });
            setNextPiece(randomTetromino());
            if (checkCollision(nextPiece, board, { x: 0, y: 0 })) {
                // Jeu terminé
                setIsGameActive(false);
                setAlert({ show: true, type: 'error', message: 'Game Over' });
            }
        }
    };

    const fixPieceToBoard = () => {
        setCurrentPiece(prev => {
            const newBoard = board.map(row => [...row]);
            prev.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newBoard[y + prev.pos.y][x + prev.pos.x] = value;
                    }
                });
            });
            setBoard(newBoard);
            return nextPiece;
        });
    };

    const clearLines = () => {
        let linesCleared = 0;
        setBoard(prevBoard => {
            const newBoard = prevBoard.filter(row => row.some(cell => cell === 0));
            linesCleared = 20 - newBoard.length;
            for (let i = 0; i < linesCleared; i++) {
                newBoard.unshift(Array(10).fill(0));
            }
            return newBoard;
        });

        if (linesCleared > 0) {
            setScore(prevScore => prevScore + linesCleared * 10);
        }
    };

    const initializeGame = () => {
        setAlert({ show: false, type: '', message: '' });

        setIsGameActive(true);
        setBoard(createBoard(10, 20));
        setCurrentPiece({ ...randomTetromino(), pos: { x: 5, y: 0 } });
        setNextPiece(randomTetromino());
        setScore(0);
    };

//TODO ENLEVER BREAKOUT //
    return (
        <div className="games breakout tetris">
            <h1 className="title">
                {text.split('').map((char, index) => (
                    <span key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                        {char}
                    </span>
                ))}
            </h1>
            <div id="gamesContainer">
                <canvas ref={canvasRef} id="breakOutCanvas canvas" width="500" height="500"></canvas>
                <div id="scoreWrapper" style={{display: isGameActive ? 'flex' : 'flex'}}>
                    <div id="score">Score: {score}</div>
                    <div id="bestScore">Best Score: {bestScore}</div>
                </div>
                {!isGameActive && (
                    <button onClick={initializeGame}>Démarrer le jeu</button>
                )}
                <Link to="/homepage">
                    <button className="retour-button button">Retour</button>
                </Link>
                {alert.show &&
                    <Alert status={alert.type} message={alert.message} onRestart={initializeGame} show={alert.show} />
                }
            </div>
        </div>
    );
};

            export default Tetris;
