import logo from './assets/images/logoRR.png';
import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import SnakeGame from './screens/SnakeGame';
import { useNavigate } from 'react-router-dom';
import BreakOut from "./screens/BreakOut";
import {SpeedProvider} from "./Context/Speedcontext";
import Tetris from "./screens/Tetris";
function App() {


  return (
      <SpeedProvider>
        <Router>
          <Routes>
            <Route path="/" element={<EnterNickname />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/snake" element={<SnakeGame />} />
            <Route path="/breakout" element={<BreakOut />} />
            <Route path="/tetris" element={<Tetris />} />
          </Routes>
        </Router>
      </SpeedProvider>
  );
}

function EnterNickname() {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleEnter = () => {
    if (nickname) {
      navigate('/homepage', { state: { nickname } });
    }
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
          <button className="app-button" onClick={handleEnter}>Enter</button>
        </div>
      </header>
    </div>
  );
}

export default App;
