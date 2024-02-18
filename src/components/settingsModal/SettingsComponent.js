import React, { useState, useEffect } from "react";
import "../../assets/css/settingsmodal.css";
import UserButton from "./UserButton";
import CloseButton from "./CloseButton";
import BrightnessButton from "./BrightnessButton";
import SoundEffectsButton from "./SoundEffectsButton";

const SettingsModal = ({ userNickname, onClose, onEditUsername }) => {
  // State pour gérer le bouton actif et d'autres états
  const [activeButton, setActiveButton] = useState(null);
  const [newUsername, setNewUsername] = useState(userNickname);
  const [brightnessValue, setBrightnessValue] = useState(100);
  const [isSoundEnabled, setIsSoundEnabled] = useState(
    JSON.parse(localStorage.getItem("soundPreference")) ?? true
  );

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

  const handleSoundToggle = () => {
    const newSoundPreference = !isSoundEnabled;
    localStorage.setItem("soundPreference", JSON.stringify(newSoundPreference));
    setIsSoundEnabled(newSoundPreference);
  };

  return (
    <div className="settings-modal">
      <h1>SETTINGS</h1>
      {/* Composant UserButton */}
      <UserButton
        active={activeButton}
        userNickname={userNickname}
        onClick={() => handleButtonClick("user")}
        onEditUsername={handleEditUsername}
        newUsername={newUsername}
        onReturn={handleReturn}
        setNewUsername={setNewUsername}
      />
      {/* Composant BrightnessButton */}
      <BrightnessButton
        active={activeButton}
        onClick={() => handleButtonClick("brightness")}
        brightnessValue={brightnessValue}
        onChange={handleBrightnessChange}
        onReturn={handleReturn}
      />
      {/* Composant SoundEffectsToggle */}
      <SoundEffectsButton
        key={Date.now()}
        active={activeButton}
        onClick={() => handleButtonClick("soundEffects")}
        isSoundEnabled={isSoundEnabled}
        onToggle={handleSoundToggle}
        onReturn={handleReturn}
      />
      {/* Composant CloseButton */}
      <CloseButton active={activeButton} onClose={onClose} />
    </div>
  );
};

export default SettingsModal;
