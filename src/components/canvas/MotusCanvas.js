import {useEffect} from "react";

const MotusCanvas = ({canvasRef, checkAttempt, displayWord, attemptsLeft, userAttempts, userInputs}) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const letterWidth = displayWord.length > 12 ? 32 : 50;
        const font = displayWord.length > 12 ? "32px Arial" : "48px Arial";
        const startX = canvas.width / 2 - (displayWord.length * letterWidth) / 2;
        const startY = canvasHeight / 2;
        const squareSize = 48;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        for (let i = 0; i < displayWord.length; i++) {
            const char = displayWord[i];
            const x = startX + i * letterWidth;
            const y = startY;

            if (char !== '_') {
                ctx.font = font;
                ctx.fillStyle = "#d7c8c8";
                ctx.fillText(char.toUpperCase(), x, y);
            } else {
                ctx.fillStyle = "#da6565";
                ctx.fillRect(x - (letterWidth - squareSize) / 2, y - squareSize, squareSize, squareSize);
            }
        }

        const attemptsText = `Tentatives restantes : ${attemptsLeft}`;
        ctx.font = "20px Arial";
        ctx.fillStyle = "#beb9b9";
        ctx.fillText(attemptsText, 250, canvasHeight - 20);

    }, [attemptsLeft, canvasRef, displayWord, userInputs]);
    return <canvas ref={canvasRef} width="500" height="500" />;
};
export default MotusCanvas;
