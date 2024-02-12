import {useEffect, useState} from "react";



//************** CONFIGURATION DU JEUX DANS gameHandlerConfig.js dans utils ***************//
export const useDirectionHandler = (config, isActive = true) => {
    const [direction, setDirection] = useState(config.initialDirection || null);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!isActive) return;

            const keyAction = config.keyActions[e.key];
            if (keyAction) {
                setDirection(keyAction.direction);
            }
        };

        const handleKeyRelease = (e) => {
            if (!isActive || !config.stopOnKeyUp) return;

            const keyAction = config.keyActions[e.key];
            if (keyAction && direction === keyAction.direction) {
                setDirection(null);
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('keyup', handleKeyRelease);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('keyup', handleKeyRelease);
        };
    }, [direction, isActive, config]);

    return [direction, setDirection];
};
