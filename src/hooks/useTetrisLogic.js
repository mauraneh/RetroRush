import { useState, useEffect } from 'react';
import { TETROMINOS, randomTetromino } from '../utils/tetrisHelper';



export const BLOCK_SIZE = 40; // Taille d'un bloc en pixels
export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 500;

// Calcule le nombre de colonnes et de lignes en fonction de la taille du canvas et de la taille des blocs
export const COLS = Math.floor(CANVAS_WIDTH / BLOCK_SIZE);
export const ROWS = Math.floor(CANVAS_HEIGHT / BLOCK_SIZE);


const createEmptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

// const createEmptyBoard = () => Array.from({ length: 40 }, () => Array(30).fill(0));

const useTetrisLogic = () => {
    const [isGameActive, setIsGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const[bestScore, setBestScore] = useState(
        parseInt(localStorage.getItem(`Tetris_bestScore`), 10) || 0);
    const [isGameLost, setIsGameLost] = useState(false);
    const [isGameWin, setIsGameWin] = useState(false);
    const [board, setBoard] = useState(createEmptyBoard);
    const [currentPiece, setCurrentPiece] = useState(() => randomTetromino());

    useEffect(() => {
    localStorage.setItem(`Tetris_bestScore`, bestScore.toString());
    }, [bestScore]);
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isGameActive) return;

            switch (e.key) {
                case 'ArrowLeft':
                    movePiece(-1);
                    break;
                case 'ArrowRight':
                    movePiece(1);
                    break;
                case 'ArrowDown':
                    dropPiece();
                    break;
                case 'ArrowUp':
                    rotatePiece();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGameActive, currentPiece, board]);

    useEffect(() => {
        if (isGameActive) {
            const interval = setInterval(() => {
                dropPiece();
            }, 1000);   // TODO CHANGER VITESSE ICI //
            return () => clearInterval(interval);
        }
    }, [isGameActive, currentPiece]);

    useEffect(() => {
        if (isGameActive) {
            checkGameOver();
            clearLines();
        }
    }, [currentPiece]);

    const checkCollision = (x, y, candidate = currentPiece.shape) => {

        for (let row = 0; row < candidate.length; row++) {
            for (let col = 0; col < candidate[row].length; col++) {
                if (candidate[row][col] !== 0) {
                    let newX = col + currentPiece.pos.x + x;
                    let newY = row + currentPiece.pos.y + y;
                    if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
                    if (newX < 0 || newX >= 10 || newY >= 20) return true;
                    if (newY < 0) continue;
                    if (board[newY][newX] !== 0) return true;
                }
            }
        }
        return false;
    };

    const movePiece = (dir) => {
        if (!checkCollision(dir, 0)) {
            setCurrentPiece(prev => ({
                ...prev,
                pos: { x: prev.pos.x + dir, y: prev.pos.y }
            }));
        }
    };

    const dropPiece = () => {
        if (!checkCollision(0, 1)) {
            setCurrentPiece(prev => ({
                ...prev,
                pos: { x: prev.pos.x, y: prev.pos.y + 1 }
            }));
        } else {
            if (currentPiece.pos.y < 1) {
                // Game Over
                setIsGameActive(false);
                setIsGameLost(true);
                return;
            }
            updateBoard();
        }
    };

    const rotatePiece = () => {
        const rotatedShape = currentPiece.shape.map((_, index) =>
            currentPiece.shape.map(col => col[index])
        );
        const rotatedPiece = { ...currentPiece, shape: rotatedShape };
        if (!checkCollision(0, 0, rotatedPiece.shape)) {
            setCurrentPiece(rotatedPiece);
        }
    };

    const updateBoard = () => {
        const newBoard = board.map(row => [...row]);
        currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    newBoard[y + currentPiece.pos.y][x + currentPiece.pos.x] = value;
                }
            });
        });

        setBoard(newBoard);
        setCurrentPiece(randomTetromino());
    };

    const clearLines = () => {
        const newBoard = board.filter(row => row.some(value => value === 0));
        const clearedLines = ROWS - newBoard.length;
        for (let i = 0; i < clearedLines; i++) {
            newBoard.unshift(Array(COLS).fill(0));
        }
        if (clearedLines > 0) {
            setBoard(newBoard);
            setScore(score += 1);
        }
    };


    const checkGameOver = () => {
        if (checkCollision(0, 0)) {
            setIsGameActive(false);
            setIsGameLost(true);
        }
    };

    const initializeGame = () => {
        setIsGameActive(true);
        setIsGameLost(false);
        setIsGameWin(false);
        setBoard(createEmptyBoard());
        setCurrentPiece(randomTetromino());
        setScore(0);
    };

    return { board, currentPiece, isGameLost, isGameWin, score, bestScore, isGameActive, initializeGame };
};

export default useTetrisLogic;
