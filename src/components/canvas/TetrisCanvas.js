import React, {useEffect} from "react";
import {TETROMINOS} from "../../utils/tetrisHelper";
import {BLOCK_SIZE, CANVAS_WIDTH} from "../../hooks/useTetrisLogic";

const TetrisCanvas = ({canvasRef, isGameActive, initializeGame, board, currentPiece}) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const drawBoard = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            board.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        ctx.fillStyle = TETROMINOS[value].color;
                        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    }
                });
            });
            if (currentPiece && currentPiece.shape) {
                currentPiece.shape.forEach((row, y) => {
                    row.forEach((value, x) => {
                        if (value !== 0) {
                            ctx.fillStyle = currentPiece.color;
                            ctx.fillRect((currentPiece.pos.x + x) * BLOCK_SIZE, (currentPiece.pos.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                            ctx.strokeRect((currentPiece.pos.x + x) * BLOCK_SIZE, (currentPiece.pos.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        }
                    });
                });
            }
        };

        drawBoard();
    }, [board, currentPiece, isGameActive]);
    return <canvas ref={canvasRef} width="500" height="500"/>;

};
export default TetrisCanvas;
