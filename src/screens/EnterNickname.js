import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSoundsManager from "../hooks/useSoundManager";
import logo from "../assets/images/logoRR.png";

const EnterNickname = () => {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const isSoundEnabled = JSON.parse(
    localStorage.getItem("soundPreference") || "true"
  );
  const { playSound, audioRef } = useSoundsManager({ isSoundEnabled });

  const handleEnter = () => {
    if (isSoundEnabled) {
      playSound("/assets/sounds/click.mp3");
    }

    if (nickname) {
      localStorage.setItem("userNickname", nickname);
    } else {
      localStorage.setItem("userNickname", "Anonymous");
    }
    navigate("/homepage");
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <div>
          <input
            className="app-input"
            type="text"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <audio ref={audioRef}></audio>
          <button className="app-button" onClick={handleEnter}>
            Enter
          </button>
        </div>
      </header>
    </div>
  );
};

export default EnterNickname;
