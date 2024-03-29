import React from "react";

const ScoreButton = ({ buttonType, selectedButton, handleButtonClick, label }) => {
  return (
    <button
      onClick={() => handleButtonClick(buttonType)}
      className={`best-scores-modal-button ${selectedButton === buttonType ? "selected" : ""}`}
    >
      {label}
    </button>
  );
};


export default ScoreButton;
