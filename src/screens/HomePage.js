import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import logo from "../assets/images/logoRR.png";
import snakeImage from "../assets/images/snakes.png";
import breakoutImage from "../assets/images/breakout.png";
import motusImage from "../assets/images/motus.png";
import tictactoeImage from "../assets/images/tictactoe.png";
import tetrisImage from "../assets/images/tetris.png";
import HowToPlay from "../components/HowToPlay";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import SettingsModal from "../components/settingsModal/SettingsComponent";
import settingsIcon from "../assets/images/settings.png";
import useSoundsManager from "../hooks/useSoundManager";

function HomePage() {
  const [userNickname, setUserNickname] = useState(
    localStorage.getItem("userNickname") || "Anonymous"
  );
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    handleClick();
    setShowSettings(!showSettings);
  };
  const handleClose = () => {
    handleClick();
    setShowSettings(false);
  };

  const handleEditUsername = (newUsername) => {
    localStorage.setItem("userNickname", newUsername);
    setUserNickname(newUsername);
  };
  const isSoundEnabled = JSON.parse(
    localStorage.getItem("soundPreference") || "true"
  );
  const { playSound, audioRef } = useSoundsManager({ isSoundEnabled });

  const handleClick = () => {
    if (isSoundEnabled) {
      playSound("/assets/sounds/click.mp3");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
  };

  const games = [
    { img: snakeImage, link: "/snake", name: "Snake" },
    { img: breakoutImage, link: "/breakout", name: "Breakout" },
    { img: motusImage, link: "/motus", name: "Motus" },
    { img: tictactoeImage, link: "/tictactoe", name: "Tic Tac Toe" },
    { img: tetrisImage, link: "/tetris", name: "Tetris" },
  ];

  return (
    <div className="container-hp">
      <div className="header-hp">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="title-hp">Let's play, {userNickname}!</h1>
        <button className="settings-button" onClick={toggleSettings}>
          <img src={settingsIcon} alt="Settings" />
        </button>
      </div>
      <h2 className="subtitle-hp">Mini Jeux Rétro</h2>

      {showSettings && (
        <SettingsModal
          userNickname={userNickname}
          onClose={handleClose}
          onEditUsername={handleEditUsername}
          handleClick={handleClick}
        />
      )}

      <div className="container-carousel">
        <div className="slider-container">
          <Slider {...settings}>
            {games.map((game, index) => (
              <div key={index} className="game-card">
                <img className="card-image" src={game.img} alt={game.name} />
                <Link to={game.link} className="jouer-link">
                  <audio ref={audioRef}></audio>
                  <button
                    className="jouer-button play-card"
                    onClick={handleClick}
                  >
                    Jouez
                  </button>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <Link to="/">
        <audio ref={audioRef}></audio>
        <button className="retour-button button" onClick={handleClick}>
          Retour
        </button>
      </Link>
      <HowToPlay gameToExplain="HomePage" />
    </div>
  );
}

export default HomePage;
