import React, {useEffect} from "react";
import {TETROMINOS} from "../../utils/tetrisHelper";

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
                        ctx.fillRect(x * 30, y * 30, 30, 30); // Adjust size as needed
                        ctx.strokeRect(x * 30, y * 30, 30, 30); // Draw border
                    }
                });
            });
            if (currentPiece && currentPiece.shape) {
                currentPiece.shape.forEach((row, y) => {
                    row.forEach((value, x) => {
                        if (value !== 0) {
                            ctx.fillStyle = currentPiece.color;
                            ctx.fillRect((currentPiece.pos.x + x) * 30, (currentPiece.pos.y + y) * 30, 30, 30); // Adjust size as needed
                            ctx.strokeRect((currentPiece.pos.x + x) * 30, (currentPiece.pos.y + y) * 30, 30, 30); // Draw border
                        }
                    });
                });
            }
        };

        drawBoard();
    }, [board, currentPiece, isGameActive]);
    return <canvas ref={canvasRef} width="500" height="500" />;

};
export default TetrisCanvas;
