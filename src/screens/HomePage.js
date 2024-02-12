import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/images/logoRR.png";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import snakeImage from "../assets/images/snakes.png";
import breakoutImage from "../assets/images/breakout.png";
import motusImage from "../assets/images/motus.png";
import tictactoeImage from "../assets/images/tictactoe.png";
import tetrisImage from "../assets/images/tetris.png";
import HowToPlay from "../components/HowToPlay";

function HomePage() {
  const location = useLocation();
  const { nickname } = location.state || { nickname: "Anonymous" };

  return (
    <div className="container-hp">
      <div className="header-hp">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="title-hp">Let's play, {nickname} !</h1>
      </div>
      <div className="container-carousel">
        <h2 className="subtitle-hp">Mini Jeux Rétro</h2>
        <Carousel>
          <div className="card">
            <img src={snakeImage} alt="Snake" className="card-image" />
            <Link to="/snake">
              <button className="jouer-button">Jouez</button>
            </Link>
          </div>
          <div className="card">
            <img
              src={breakoutImage}
              alt="casse-brique"
              className="card-image"
            />
            <Link to="/breakout">
              <button className="jouer-button">Jouez</button>
            </Link>
          </div>
          <div className="card">
            <img src={motusImage} alt="Snake" className="card-image" />
            <Link to="/motus">
              <button className="jouer-button">Jouez</button>
            </Link>
          </div>
          <div className="card">
            <img src={tictactoeImage} alt="Snake" className="card-image" />
            <Link to="/tictactoe">
              <button className="jouer-button">Jouez</button>
            </Link>
          </div>
          <div className="card">
            <img src={tetrisImage} alt="Tetris" className="card-image" />
            <Link to="/tetris">
              <button className="jouer-button">Jouez</button>
            </Link>
          </div>
        </Carousel>
      </div>
      <Link to="/">
        <button className="retour-button button">Retour</button>
      </Link>
      <HowToPlay gameToExplain="HomePage" />
    </div>
  );
}

export default HomePage;
