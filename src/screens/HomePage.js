import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/images/logoRR.png';

function HomePage() {
  const location = useLocation();
  const { nickname } = location.state || { nickname: 'Anonymous' };

  return (
    <div className='Container-hp'>
      <div className='Header-hp'>
        <img src={logo} className="Logo" alt="logo" />
        <h1 className='Title-hp'>Let's play, {nickname} !</h1>
      </div>
    </div>
  );
}

export default HomePage;
