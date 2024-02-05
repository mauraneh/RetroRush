import React from 'react';

const PlayButton = ({ initializeGame }) => {
    return (
        <button id="start-button" onClick={initializeGame}>
        ▶
        </button>
    );
};

export default PlayButton;
