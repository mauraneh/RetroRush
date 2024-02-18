import React from "react";

const CloseButton = ({ active, onClose }) => {
  return (
    (!active || active === "soundEffects") && (
      <button className="brightlessbuton" onClick={onClose}>
        Fermer
      </button>
    )
  );
};

export default CloseButton;
