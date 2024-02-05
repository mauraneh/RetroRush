import React, { useEffect } from 'react';
import { drawGame } from '../utils/snakeHelpers';

const SnakeCanvas = ({ canvasRef, snake, food, isGameActive }) => {
    useEffect(() => {
        drawGame(canvasRef, snake, food, isGameActive);
    }, [snake, food, isGameActive]);

    return <canvas ref={canvasRef} width="500" height="500" />;
};

export default SnakeCanvas;
