import React from "react";
import brightnessIcon from "../../assets/images/brightness.png";

const BrightnessButton = ({
  active,
  onClick,
  brightnessValue,
  onChange,
  onReturn,
}) => {
  return (
    <div className={`brightness ${active === "user" ? "hidden" : ""}`}>
      <div className="icon-and-label" onClick={onClick}>
        <img src={brightnessIcon} alt="Brightness" className="settings-icon" />
        <span>Luminosité</span>
      </div>
      {active === "brightness" && (
        <div>
          <input
            type="range"
            min="30"
            max="99"
            value={brightnessValue}
            onChange={(e) => onChange(e.target.value)}
          />
          <button className="brightlessbuton" onClick={onReturn}>
            Ajuster la luminosité
          </button>
          <button className="brightlessbuton" onClick={onReturn}>
            Retour
          </button>
        </div>
      )}
    </div>
  );
};

export default BrightnessButton;
