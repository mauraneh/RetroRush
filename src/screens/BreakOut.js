import React, { useEffect, useRef, useState } from "react";

const BreakOut = () => {
    const canvasRef = useRef(null);
    const [rightPressed, setRightPressed] = useState(false);
    const [leftPressed, setLeftPressed] = useState(false);
    const [isGameActive, setIsGameActive] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 600;

        let x = canvas.width / 2;
        let y = canvas.height - 30;
        let dx = 2;
        let dy = -2;
        const ballRadius = 10;
        const paddleHeight = 10;
        const paddleWidth = 75;
        let paddleX = (canvas.width - paddleWidth) / 2;
        const brickRowCount = 5;
        const brickColumnCount = 3;
        const brickWidth = 75;
        const brickHeight = 20;
        const brickPadding = 10;
        const brickOffsetTop = 30;
        const brickOffsetLeft = 30;
        let score = 0;
        let bricks = [];

        function initBricks() {
            bricks = [];
            for (let c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (let r = 0; r < brickRowCount; r++) {
                    bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }
        }

        initBricks();

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawBricks() {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    if (bricks[c][r].status === 1) {
                        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#0095DD";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

        function collisionDetection() {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    let b = bricks[c][r];
                    if (b.status === 1) {
                        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            score++;
                        }
                    }
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            collisionDetection();

            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            } else if (y + dy > canvas.height - ballRadius) {
                if (x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                } else {
                    alert("GAME OVER");
                    document.location.reload();
                    return;
                }
            }

            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 7;
            } else if (leftPressed && paddleX > 0) {
                paddleX -= 7;
            }

            x += dx;
            y += dy;

            if (isGameActive) {
                requestAnimationFrame(draw);
            }
        }

        draw();

        const handleKeyDown = (event) => {
            if (event.key === "ArrowRight" || event.key === "d") {

                setRightPressed(true);
            } else if (event.key === "ArrowLeft" || event.key === "q") {
                setLeftPressed(true);
            }
        };

        const handleKeyUp = (event) => {
            if (event.key === "ArrowRight" || event.key === "d") {
                setRightPressed(false);
            } else if (event.key === "ArrowLeft" || event.key === "q") {
                setLeftPressed(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [isGameActive]);

    return (
        <div>
            <canvas ref={canvasRef} width="800" height="600"></canvas>
            <button onClick={() => setIsGameActive(!isGameActive)}>{isGameActive ? 'Pause' : 'Start'}</button>
        </div>
    );
};

export default BreakOut;
