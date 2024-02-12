import React, { useEffect } from 'react';
import {drawBall, drawBricks, drawPaddle } from "../utils/breakOutHelper";
const BreakOutCanvas = ({ isGameActive, bricks, ballPosition, paddlePosition, updateGameState, canvasRef }) => {

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const gameLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks(ctx, bricks, 10, 71, 20);
            drawBall(ctx, ballPosition, 10);
            drawPaddle(ctx, paddlePosition, canvas.height, 10);

            if (isGameActive) {
                requestAnimationFrame(gameLoop);
            }
        };

        gameLoop();
    }, [isGameActive, ballPosition, paddlePosition, bricks]);


    return <canvas ref={canvasRef} width="500" height="500" />;
};

export default BreakOutCanvas;
