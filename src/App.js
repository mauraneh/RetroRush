import logo from "./assets/images/logoRR.png";
import "./App.css";
import React, {  useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomePage";
import SnakeGame from "./screens/SnakeGame";
import { useNavigate } from "react-router-dom";
import TicTacToeGame from "./screens/TicTacToeGame";
import BreakOut from "./screens/BreakOut";
import Tetris from "./screens/Tetris";
import { SpeedProvider } from "./Context/Speedcontext";
import {TetrisProvider} from "./Context/TetrisContext";
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
          </Routes>
        </Router>
      </TetrisProvider>
    </SpeedProvider>
  );
}

function EnterNickname() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleEnter = () => {
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
          <button className="app-button" onClick={handleEnter}>
            Enter
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
