import React, { useState, useEffect } from 'react';
import userIcon from '../assets/images/user.png';
import brightnessIcon from '../assets/images/brightness.png';
import "../assets/css/settingsmodal.css";

const SettingsModal = ({ userNickname, onClose, onEditUsername }) => {
  // State pour gérer le bouton actif et d'autres états
  const [activeButton, setActiveButton] = useState(null);
  const [newUsername, setNewUsername] = useState(userNickname);
  const [brightnessValue, setBrightnessValue] = useState(100);

  // Effet pour mettre à jour la luminosité lorsque la valeur change
  useEffect(() => {
    document.documentElement.style.filter = `brightness(${brightnessValue}%)`;
  }, [brightnessValue]);

  // Fonction pour gérer le clic sur les boutons
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
  };

  // Fonction pour gérer la modification du nom d'utilisateur
  const handleEditUsername = () => {
    onEditUsername(newUsername);
  };

  // Fonction pour gérer le changement de luminosité
  const handleBrightnessChange = (value) => {
    const brightnessValue = Math.max(30, value);
    setBrightnessValue(brightnessValue);
  };

  // Fonction pour gérer le retour en arrière
  const handleReturn = () => {
    setActiveButton(null);
  };

  return (
    <div className="settings-modal">
      <h1>SETTINGS</h1>
      {/* Section pour le bouton "User" */}
      <div className={`User ${activeButton === 'brightness' ? 'hidden' : ''}`}>
        <div className="icon-and-label" onClick={() => handleButtonClick('user')}>
          <img src={userIcon} alt="User" className="settings-icon" />
          <span>Mes infos</span>
        </div>
        {activeButton === 'user' && (
          <div>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button className="brightlessbuton" onClick={handleEditUsername}>Sauvegarder</button>
            <button className="brightlessbuton" onClick={handleReturn}>Retour</button>
          </div>
        )}
      </div>
      {/* Section pour le bouton "Brightness" */}
      <div className={`brightness ${activeButton === 'user' ? 'hidden' : ''}`}>
        <div className="icon-and-label" onClick={() => handleButtonClick('brightness')}>
          <img src={brightnessIcon} alt="Brightness" className="settings-icon" />
          <span>Luminosité</span>
        </div>
        {activeButton === 'brightness' && (
          <div>
            <input
              type="range"
              min="30"
              max="100"
              value={brightnessValue}
              onChange={(e) => handleBrightnessChange(e.target.value)}
            />
            <button className="brightlessbuton" onClick={handleReturn}>Ajuster la luminosité</button>
            <button className="brightlessbuton" onClick={handleReturn}>Retour</button>
          </div>
        )}
      </div>
      {/* Bouton pour fermer la fenêtre */}
      {!activeButton && <button className="brightlessbuton" onClick={onClose}>Fermer</button>}
    </div>
  );
};

export default SettingsModal;
