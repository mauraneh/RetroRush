import logo from './assets/images/logoRR.png';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './screens/HomePage';
import { useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterNickname />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <input
            className="App-input"
            type="text"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button className="App-button" onClick={handleEnter}>Enter</button>
        </div>
      </header>
    </div>
  );
}

export default App;
