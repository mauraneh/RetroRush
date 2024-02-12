import { useState, useCallback, useEffect } from 'react';
import { TETROMINOS, randomTetromino } from '../utils/tetrisHelper';

const useTetrisLogic = () => {
    //Generique aux autres mini-jeux
    const [isGameActive, setIsGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [isGameLost, setIsGameLost] = useState(false);
    const [isGameWin, setIsGameWin] = useState(false);
    //Nouvelle fonctionnalitées
    const [board, setBoard] = useState(createEmptyBoard());
    const [currentPiece, setCurrentPiece] = useState({});


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') movePiece('left');
            if (e.key === 'ArrowRight') movePiece('right');
            if (e.key === 'ArrowDown') movePiece('down');
            if (e.key === 'ArrowUp') movePiece('rotate');
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentPiece, board]);

    useEffect(() => {
        if (isGameActive) {
            const interval = setInterval(() => {
                dropPiece();
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isGameActive, currentPiece]); //DropPiece ici ???

    useEffect(() => {
        if (!isGameActive) return;
        const handleCompleteLines = () => {
            const linesCleared = clearLines(board);
            if (linesCleared > 0) {
                setScore(score + linesCleared * 100); // Update score based on cleared lines
                setBoard([...board]); // Update board
            }
        };

        handleCompleteLines();

        const checkGameOver = () => {
            if (checkCollision(currentPiece, board, { x: 0, y: 0 })) {
                setIsGameActive(false);
                setIsGameLost(true);
            }
        };

        checkGameOver();

    }, [board, currentPiece, isGameActive, score]);

    function createEmptyBoard() {
        return Array.from({ length: 20 }, () => Array(10).fill(0));
    }
    const checkCollision = (piece, board, { x: moveX, y: moveY }) => {
        for (let y = 0; y < piece.shape.length; y += 1) {
            for (let x = 0; x < piece.shape[y].length; x += 1) {
                if (piece.shape[y][x] !== 0) {
                    if (
                        !board[y + piece.pos.y + moveY] ||
                        !board[y + piece.pos.y + moveY][x + piece.pos.x + moveX] ||
                        board[y + piece.pos.y + moveY][x + piece.pos.x + moveX] !== 0
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    const initializeGame = () => {
        setIsGameActive(true);
        setIsGameLost(false);
        setBoard(createEmptyBoard());
        setCurrentPiece(randomTetromino());
        setScore(0);
    }

    const merge = (board, piece) => {
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    board[y + piece.pos.y][x + piece.pos.x] = value;
                }
            });
        });
        return board;
    };

    const rotate = (matrix) => {
        const N = matrix.length - 1;
        const result = matrix.map((row, i) =>
            row.map((val, j) => matrix[N - j][i])
        );
        return result;
    };

    const dropPiece = () => {
        if (!currentPiece) return;
        if (!checkCollision(currentPiece, board, { x: 0, y: 1 })) {
            setCurrentPiece({ ...currentPiece, pos: { x: currentPiece.pos.x, y: currentPiece.pos.y + 1 } });
        } else {
            // Merge the piece into the board
            let newBoard = merge(board, currentPiece);
            setBoard(newBoard);
            // Check for completed lines
            // Reset currentPiece
            setCurrentPiece(randomTetromino());
        }
    };

    const movePiece = (direction) => {
        if (!currentPiece) return;
        if (direction === 'left' && !checkCollision(currentPiece, board, { x: -1, y: 0 })) {
            setCurrentPiece({ ...currentPiece, pos: { x: currentPiece.pos.x - 1, y: currentPiece.pos.y } });
        } else if (direction === 'right' && !checkCollision(currentPiece, board, { x: 1, y: 0 })) {
            setCurrentPiece({ ...currentPiece, pos: { x: currentPiece.pos.x + 1, y: currentPiece.pos.y } });
        } else if (direction === 'down') {
            dropPiece();
        } else if (direction === 'rotate') {
            const rotatedPiece = { ...currentPiece, shape: rotate(currentPiece.shape) };
            if (!checkCollision(rotatedPiece, board, { x: 0, y: 0 })) {
                setCurrentPiece(rotatedPiece);
            }
        }
    };

    const clearLines = (board) => {
        let linesCleared = 0;
        for (let y = board.length - 1; y >= 0; y--) {
            if (board[y].every(value => value !== 0)) {
                linesCleared += 1;
                for (let yy = y; yy > 0; yy--) {
                    board[yy] = board[yy - 1];
                }
                board[0] = Array(10).fill(0);
                y++; // Check the new line at the same position
            }
        }
        return linesCleared;
    };

    return {
        board,
        currentPiece,
        movePiece,
        isGameLost,
        isGameWin,
        score,
        bestScore,
        isGameActive,
        initializeGame,
    };
}
export default useTetrisLogic;
