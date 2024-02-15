import {useEffect} from "react";

const MotusCanvas = ({canvasRef, checkAttempt, displayWord, attemptsLeft, userAttempts, userInputs}) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const letterWidth = 50;
        const startX = (canvasWidth - displayWord.length * letterWidth) / 4;
        const startY = canvasHeight / 5.5;
        const squareSize = 48;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const userInputY = startY + 90; // Ajuster la position en Y pour les entrées utilisateur
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
    }, [canvasRef, displayWord, userInputs]);
    /*
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

        const userInputY = startY + 60;
        userInputs.forEach((userInput, index) => {
            const y = userInputY + index * 60;
            // Supposition que userInput est un tableau de {char, correct}
            userInput.forEach((inputDetail, charIndex) => {
                const x = startX + charIndex * letterWidth;
                // Afficher uniquement les lettres correctes sans carré rouge
                if (inputDetail.correct) {
                    ctx.font = "48px Arial";
                    ctx.fillStyle = "#000000";
                    ctx.fillText(inputDetail.char.toUpperCase(), x, y);
                }
                // Omission volontaire du dessin du carré rouge pour les lettres incorrectes
            });
        });

        // Dessin des indications pour le mot à trouver
        for (let i = 0; i < displayWord.length; i++) {
            const char = displayWord[i];
            const x = startX + i * letterWidth;
            const y = startY;
            // Afficher les caractères découverts ou un placeholder
            if (char !== '_') {
                ctx.font = "48px Arial";
                ctx.fillStyle = "#d7c8c8";
                ctx.fillText(char.toUpperCase(), x, y);
            }
        }
    }, [canvasRef, displayWord, userInputs]);
     */

    return <canvas ref={canvasRef} width="500" height="500" />;
};
export default MotusCanvas;
