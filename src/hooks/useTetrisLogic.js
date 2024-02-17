import { useState, useEffect } from 'react';
import { randomTetromino } from '../utils/tetrisHelper';
import { useTetris } from "../Context/TetrisContext";




export const BLOCK_SIZE = 40; // px
export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 500;

export const COLS = Math.floor(CANVAS_WIDTH / BLOCK_SIZE);
export const ROWS = Math.floor(CANVAS_HEIGHT / BLOCK_SIZE);


const createEmptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));


const useTetrisLogic = () => {
    const { speedTetris } = useTetris(1000);
    const [isGameActive, setIsGameActive] = useState(false);
    const [score, setScore] = useState(0);
      const[userNickname, setUserNickname] = useState(
          (localStorage.getItem("userNickname")) || "Anonymous");
    const[bestScore, setBestScore] = useState(
        parseInt(localStorage.getItem(`${userNickname}_Tetris_bestScore`)) || 0);
    const [isGameLost, setIsGameLost] = useState(false);
    const [isGameWin, setIsGameWin] = useState(false);
    const [board, setBoard] = useState(createEmptyBoard);
    const [currentPiece, setCurrentPiece] = useState(() => randomTetromino());

    useEffect(() => {
        if (isGameActive) {
            checkGameOver();
            clearLines();
        }
    }, [currentPiece]);

    useEffect(() => {
    localStorage.setItem(`${userNickname}_Tetris_bestScore`, bestScore.toString());
    }, [bestScore, userNickname]);
    
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
                console.log(speedTetris)
            },  speedTetris);
            return () => clearInterval(interval);
        }
    }, [isGameActive, currentPiece]);



    const checkCollision = (x, y, candidate = currentPiece.shape) => {
        for (let row = 0; row < candidate.length; row++) {
            for (let col = 0; col < candidate[row].length; col++) {
                if (candidate[row][col] !== 0) {
                    let newX = col + currentPiece.pos.x + x;
                    let newY = row + currentPiece.pos.y + y;
                    if (newX < 0 || newX >= COLS || newY >= ROWS || board[newY][newX] !== 0) {
                        console.log(`Collision at newX: ${newX}, newY: ${newY}`);
                        return true;
                    }
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
        const transposedShape = currentPiece.shape[0].map((_, colIndex) =>
            currentPiece.shape.map(row => row[colIndex])
        );
        const rotatedShape = transposedShape.map(row => row.reverse());
        if (!checkCollision(0, 0, rotatedShape)) {
            setCurrentPiece(prev => ({
                ...prev,
                shape: rotatedShape
            }));
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
        let newBoard = [...board];
        for(let y = 0; y < ROWS; y++){
            let rowFilled = true;
            for(let x = 0; x < COLS; x++){
                if(board[y][x] === 0){
                    rowFilled = false;
                    break;
                }
            }
            if(rowFilled){
                setScore(prev => prev + 1);
                newBoard.splice(y, 1);
                newBoard.unshift(Array(COLS).fill(0));
            }
        }
        if(JSON.stringify(newBoard) !== JSON.stringify(board)){
            console.log("Board updated");
            setBoard(newBoard);
        }
        setScore(prev => prev + 1);
    };

    const checkGameOver = () => {
        if (checkCollision(0, 0)) {
            setIsGameActive(false);
            setIsGameLost(true);
            if (score > bestScore) {
                setBestScore(score);
            }
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
