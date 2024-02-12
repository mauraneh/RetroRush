export const initBricks = (rowCount, columnCount) => {
    let bricks = [];
    for (let c = 0; c < columnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < rowCount; r++) {
            bricks[c][r] = { x: c * (71 + 10) + 10, y: r * (20 + 10) + 30, status: 1 };
        }
    }
    return bricks;
};

export const drawBall = (ctx, ballPosition, space) => {
    ctx.beginPath();
    ctx.arc(ballPosition.x, ballPosition.y, space, 0, Math.PI * 2);
    ctx.fillStyle = "#FDFFE6";
    ctx.fill();
    ctx.closePath();
};

export const drawPaddle = (ctx, paddlePosition, canvasHeight, space) => {
    ctx.beginPath();
    ctx.rect(paddlePosition.paddleX, canvasHeight - space, paddlePosition.paddleWidth, space);
    ctx.fillStyle = "#3A7DBA";
    ctx.fill();
    ctx.closePath();
};

export const drawBricks = (ctx, bricks, space, brickWidth, brickHeight) => {
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

export const collisionDetection = (ballPosition, bricks, brickWidth, brickHeight, setBallDirection, setScore, setBrickCounterBroken) => {
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


