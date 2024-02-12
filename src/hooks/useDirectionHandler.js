import { useState, useEffect } from 'react';

export const useDirectionHandler = (initialDirection = 'right', isActive = true) => {
    const [direction, setDirection] = useState(initialDirection);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!isActive) return;

            switch (e.key) {
                case 'ArrowUp': if (direction !== 'down') setDirection('up'); break;
                case 'ArrowDown': if (direction !== 'up') setDirection('down'); break;
                case 'ArrowLeft': if (direction !== 'right') setDirection('left'); break;
                case 'ArrowRight': if (direction !== 'left') setDirection('right'); break;
                default: break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [direction, isActive]);

    return [direction, setDirection];
};