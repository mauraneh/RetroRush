import React from "react";
import soundOnIcon from "../../assets/images/soundOn.png";
import soundOffIcon from "../../assets/images/soundOff.png";

const SoundEffectsButton = ({
  active,
  onClick,
  isSoundEnabled,
  onToggle,
  onReturn,
}) => {
  const handleClick = () => {
    // Inverse la valeur de la préférence de son
    onToggle();
  };
  return (
    <div
      className={`sound-effects ${active === "soundEffects" ? "active" : ""}`}
    >
      <div className="icon-and-label" onClick={handleClick}>
        <img
          src={isSoundEnabled ? soundOnIcon : soundOffIcon}
          alt={isSoundEnabled ? "Sound On" : "Sound Off"}
          className="settings-icon"
        />
        <span>Effets Sonores</span>
      </div>
      {active === "soundEffects" && (
        <div>
          <button className="brightlessbuton" onClick={onReturn}>
            Retour
          </button>
        </div>
      )}
    </div>
  );
};

export default SoundEffectsButton;
