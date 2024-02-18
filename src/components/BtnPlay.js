import React from 'react';
import useSoundManager from '../hooks/useSoundManager';

const BtnPlay = ({ initializeGame }) => {
const isSoundEnabled = JSON.parse(localStorage.getItem('soundPreference'));
const { playSound, audioRef } = useSoundManager({ initializeGame, isSoundEnabled });

    const handleButtonClick = () => {
        //si le sound est activé joué le son sinon lancer le jeu 
        if (isSoundEnabled) {
            playSound('/assets/sounds/startGame.mp3?v=2');
        }
        else {
            initializeGame();
        }
    };

    return (
    <div>
        <audio ref={audioRef}></audio>
        <button id="start-button" onClick={handleButtonClick}>
        ▶
        </button>
    </div>
    );
};
export default BtnPlay;
