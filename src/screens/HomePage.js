import React from 'react';
import { useLocation } from 'react-router-dom';

function HomePage() {
  const location = useLocation();
  const { nickname } = location.state || { nickname: 'Anonymous' };

  return (
    <div>
      <h1>Welcome, {nickname}</h1>
      
    </div>
  );
}

export default HomePage;
