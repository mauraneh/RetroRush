import React from 'react';

const GameTitle = ({ text }) => {
  return (
    <h1 className="title">
      {text.split('').map((char, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.2}s` }}>{char}</span>
      ))}
    </h1>
  );
};

export default GameTitle;
