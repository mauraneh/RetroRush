import logo from "./assets/images/logoRR.png";
import "./App.css";
import React, {  useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomePage";
import SnakeGame from "./screens/SnakeGame";
import Motus from "./screens/Motus";
import { useNavigate } from "react-router-dom";
import TicTacToeGame from "./screens/TicTacToeGame";
import BreakOut from "./screens/BreakOut";
import Tetris from "./screens/Tetris";
import { SpeedProvider } from "./Context/Speedcontext";
import { TetrisProvider } from "./Context/TetrisContext";
import useSoundsManager from "./hooks/useSoundManager";


function App() {
  return (
    <SpeedProvider>
      <TetrisProvider>
        <Router>
          <Routes>
            <Route path="/" element={<EnterNickname />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/snake" element={<SnakeGame />} />
            <Route path="/tictactoe" element={<TicTacToeGame />} />
            <Route path="/breakout" element={<BreakOut />} />
            <Route path="/tetris" element={<Tetris />} />
            <Route path="/motus" element={<Motus />} />
          </Routes>
        </Router>
      </TetrisProvider>
    </SpeedProvider>
  );
}

function EnterNickname() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const isSoundEnabled = JSON.parse(localStorage.getItem('soundPreference') || 'true');
  const { playSound, audioRef } = useSoundsManager({isSoundEnabled });


  const handleEnter = () => {
    if (isSoundEnabled) {
      playSound('/assets/sounds/click.mp3');
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
}

export default App;