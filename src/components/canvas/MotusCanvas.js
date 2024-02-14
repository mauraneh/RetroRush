import {useEffect} from "react";

const MotusCanvas = ({canvasRef, checkAttempt, displayWord, attemptsLeft, userAttempts, userInputs}) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const letterWidth = 50;
        const startX = (canvasWidth - displayWord.length * letterWidth) / 2;
        const startY = canvasHeight / 2;
        const squareSize = 48;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (let i = 0; i < displayWord.length; i++) {
            const char = displayWord[i];
            const x = startX + i * letterWidth;
            const y = startY;

            if (char !== '_') {
                ctx.font = "48px Arial";
                ctx.fillStyle = "#d7c8c8";
                ctx.fillText(char.toUpperCase(), x, y);
            } else {
                ctx.fillStyle = "#da6565";
                ctx.fillRect(x - (letterWidth - squareSize) / 2, y - squareSize, squareSize, squareSize);
            }
        }
        const userInputY = startY + 60; // Ajuster la position en Y selon vos besoins
        userInputs.forEach((userInput, index) => {
            const y = userInputY + index * 60;
            userInputs.forEach((userInput, index) => {
                const y = userInputY + index * 60;
                userInput.split('').forEach((inputDetail, charIndex) => {
                    const x = startX + charIndex * letterWidth;
                    if (inputDetail.correct) {
                        ctx.font = "48px Arial";
                        ctx.fillStyle = "#000000";
                        ctx.fillText(inputDetail.char.toUpperCase(), x, y);
                    } else {
                        ctx.fillStyle = "#da6565";
                        ctx.fillRect(x - (letterWidth - squareSize) / 2, y - squareSize, squareSize, squareSize);
                    }
                });
            });
        });
    }, [canvasRef, displayWord, userInputs]);

    return <canvas ref={canvasRef} width="500" height="500" />;
};
export default MotusCanvas;
