import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Slider from "react-slick";
import { useState } from 'react';
import logo from '../assets/images/logoRR.png';
import snakeImage from '../assets/images/snakes.png';
import breakoutImage from '../assets/images/breakout.png';
import motusImage from '../assets/images/motus.png';
import tictactoeImage from '../assets/images/tictactoe.png';
import tetrisImage from '../assets/images/tetris.png';
import HowToPlay from "../components/HowToPlay";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SettingsModal from '../components/settingsModal/SettingsComponent';
import settingsIcon from '../assets/images/settings.png';

function HomePage() {
const[userNickname, setUserNickname] = useState(
  (localStorage.getItem("userNickname")) || "Anonymous");
   const [showSettings, setShowSettings] = useState(false);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const games = [
    { img: snakeImage, link: "/snake", name: "Snake" },
    { img: breakoutImage, link: "/breakout", name: "Breakout" },
    { img: motusImage, link: "/motus", name: "Motus" },
    { img: tictactoeImage, link: "/tictactoe", name: "Tic Tac Toe" },
    { img: tetrisImage, link: "/tetris", name: "Tetris" },
  ];

  return (
    <div className='container-hp'>
      <div className='header-hp'>
        <img src={logo} className="logo" alt="logo" />
        <h1 className='title-hp'>Let's play, {nickname}!</h1>
      </div>
      <div className='container-carousel'>
        <h2 className='subtitle-hp'>Mini Jeux Rétro</h2>
        <div className="slider-container">
          <Slider {...settings}>
            {games.map((game, index) => (
              <div key={index} className='card'>
                <img src={game.img} alt={game.name} className="card-image"/>
                <Link to={game.link}>
                  <button className='jouer-button'>Jouez</button>
                </Link>
              </div>
            ))}
          </Slider>
        </div>

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleEditUsername = (newUsername) => {
    localStorage.setItem('userNickname', newUsername);
    setUserNickname(newUsername);
  };

   return (
    <div className="container-hp">
      <div className="header-hp">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="title-hp">Let's play, {userNickname} !</h1>
        <button className="settings-button" onClick={toggleSettings}>
          <img src={settingsIcon} alt="Settings" />
        </button>
      </div>

      {showSettings && (
       <SettingsModal
          userNickname={userNickname}
          onClose={() => setShowSettings(false)}
          onEditUsername={handleEditUsername}
        />
      )}

      <div className="container-carousel">
        <h2 className="subtitle-hp">Mini Jeux Rétro</h2>
        <Carousel>
          <div className='card'>
            <img src={snakeImage} alt="Snake" className="card-image"/>
            <Link to="/snake">
              <button className='jouer-button'>Jouez</button>
            </Link>
          </div>
          <div className='card'>
            <img src={breakoutImage} alt="casse-brique" className="card-image"/>
            <Link to="/breakout">
              <button className='jouer-button'>Jouez</button>
            </Link>
          </div>
          <div className='card'>
            <img src={motusImage} alt="Snake" className="card-image"/>
            <Link to="/motus">
              <button className='jouer-button'>Jouez</button>
            </Link>
          </div>
          <div className='card'>
            <img src={tictactoeImage} alt="Snake" className="card-image"/>
            <Link to="/tictactoe">
              <button className='jouer-button'>Jouez</button>
            </Link>
          </div>
          <div className='card'>
            <img src={tetrisImage} alt="Tetris" className="card-image"/>
            <Link to="/tetris">
              <button className='jouer-button'>Jouez</button>
            </Link>
          </div>
        </Carousel>
      </div>
      <Link to="/">
        <button className='retour-button button'>Retour</button>
      </Link>
      <HowToPlay gameToExplain='HomePage'/>
    </div>
  );
}

export default HomePage;
