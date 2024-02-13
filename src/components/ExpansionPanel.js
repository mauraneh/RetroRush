import React from "react";
import keyBoardQ from "../assets/images/icon/lettre-q.png";
import keyBoardD from "../assets/images/icon/lettre-d.png";
import cursor from "../assets/images/icon/icons8-curseur-unscreen.gif";
import BestScoresModal from "./bestScoreModal/BestScoresModal";
import { useSpeed } from "../Context/Speedcontext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowUp, faArrowDown, faArrowLeft, faArrowRight, faArrowsRotate} from '@fortawesome/free-solid-svg-icons';

/* POSSIBILITEE DE METTRE PARAMETRES POUR CHANGER LES REGLAGES D'UNE PARTIE
EXEMPLE : VITESSE SERPENT
 */

const ExpansionPanel = ({ gameToExplain,setDifficulty, botDifficulty }) => {
  const navigate = useNavigate();
  const { speedBall, setSpeedBall } = useSpeed();
    const gameRoutes = ["/snake", "/breakout", "/motus", "/tictactoe", "/tetris"];
    
    const [showBestScoresModal, setShowBestScoresModal] = useState(false);
    
const handleDifficultyClick = (difficulty) => {
    setDifficulty(difficulty);
  };
  const openBestScoresModal = () => {
    setShowBestScoresModal(true);
  };

  const closeBestScoresModal = () => {
    setShowBestScoresModal(false);
  };

  const selectRandomGame = () => {
    const randomIndex = Math.floor(Math.random() * gameRoutes.length);
    return gameRoutes[randomIndex];
    };
    

    const handleSpeedChange = (event) => {
        if (setSpeedBall) {
            setSpeedBall(Number(event.target.value));
        } else {
            setSpeedBall(3);
        }
    };

    // eslint-disable-next-line default-case
    switch (gameToExplain) {
        case 'Breakout':
            return (
                <div className="expansionPanel">
                    <h1>{gameToExplain}</h1>
                    <p className="gameTagline">Faites rebondir la balle pour détruire les briques tout en contrôlant la
                        plateforme pour ne pas laisser la balle tomber.</p>
                    <p className="subgameTagline">Utilisez les touches 'Q' et 'D' pour déplacer la plateforme vers la
                        gauche ou la droite.</p>
                    <div className="keys-container">
                        <div className="keySnake left">
                            <FontAwesomeIcon icon={faArrowLeft} className="touch"/>
                        </div>

                        <div className="keySnake right">
                            <FontAwesomeIcon icon={faArrowRight} className="touch"/>
                        </div>
                    </div>
                    <div className="sliderContainer">
                        <label htmlFor="speed-range" className="speedRangeText">Indiquez la vitesse de la balle, et
                            lancez !</label>
                        <input
                            id="sliderInput"
                            type="range"
                            min="1"
                            max="8"
                            value={speedBall}
                            onChange={handleSpeedChange}
                        />
                    </div>
                </div>
            );
        case 'Snake':
            return (
                <div className="expansionPanel">
                    <h1>Snake</h1>
                    <p className="gameTagline">Guidez le serpent, mangez les pommes, et évitez de vous mordre la queue
                        ou les murs !</p>
                    <p className="subgameTagline">Utilise les touches 'Haut', 'Bas', 'Droite', 'Gauche', pour déplacer
                        le serpent.</p>
                    <div className="keys-container">
                        <div className="keySnake up">
                            <FontAwesomeIcon icon={faArrowUp} className="touch"/>
                        </div>
                        <div className="keySnake left">
                            <FontAwesomeIcon icon={faArrowLeft} className="touch"/>
                        </div>
                        <div className="keySnake down">
                            <FontAwesomeIcon icon={faArrowDown} className="touch"/>
                        </div>
                        <div className="keySnake right">
                            <FontAwesomeIcon icon={faArrowRight} className="touch"/>
                        </div>
                    </div>
                </div>
            );
         case "TicTacToe - Game":
      return (
    <div className="expansionPanel">
      <h1>{gameToExplain}</h1>
      <p className="gameTagline">
        Affrontez le bot et alignez les symboles X horizontalement,
        verticalement ou en diagonale !
      </p>
      <div className="instructions">
        <div className="key">
          <img
            src={cursor}
            alt="souris"
            style={{ backgroundColor: "transparent" }}
          />
          <p>Utilise ta souris pour placer tes symboles</p>
        </div>
                  <div className="difficulty-buttons">
                      <h3>Difficulté</h3>
          <button
            className={botDifficulty === 'easy' ? 'selected' : ''}
            onClick={() => handleDifficultyClick('easy')}
          >
            Facile
          </button>
          <button
            className={botDifficulty === 'medium' ? 'selected' : ''}
            onClick={() => handleDifficultyClick('medium')}
          >
            Avancé
          </button>
          <button
            className={botDifficulty === 'hard' ? 'selected' : ''}
            onClick={() => handleDifficultyClick('hard')}
          >
            Difficile
          </button>
        </div>
      </div>
    </div>
  );

        case 'HomePage':
           return (
    <div className="expansionPanel">
      {!showBestScoresModal && (
        // Affichez le contenu de la HomePage uniquement si le modal n'est pas ouvert
        <>
          <h1>{gameToExplain}</h1>
          <div className="instructions">
            <div className="instructionsHomePages">
              <p className="pHomePage">
                Découvrez un univers de jeux rétro et plongez dans le plaisir nostalgique ! <br />
                Cliquez, jouez et laissez-vous transporter par l'aventure !
              </p>
              <div className="buttonList">
                <button className='button' onClick={openBestScoresModal}>Mes scores</button>
                <button className="button" onClick={() => navigate(selectRandomGame())}>
                  Jeux aléatoire
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {showBestScoresModal && <BestScoresModal onClose={closeBestScoresModal} />}
    </div>
  );
        case 'Tetris':
            return (
                <div className="expansionPanel">
                    <h1>TETRIS</h1>
                    <p className="gameTagline">Empilez les blocs pour compléter des lignes et marquer des points. Évitez
                        de laisser les blocs atteindre le haut de l'écran !</p>

                    <p className="subgameTagline">Utilisez les touches fléchées pour déplacer et tourner les pièces.</p>

                    <div className="keys-container">
                        <div className="keySnake up">
                            <FontAwesomeIcon icon={faArrowsRotate} className="touch"/>
                        </div>
                        <div className="keySnake left">
                            <FontAwesomeIcon icon={faArrowLeft} className="touch"/>
                        </div>
                        <div className="keySnake down">
                            <FontAwesomeIcon icon={faArrowDown} className="touch"/>
                        </div>
                        <div className="keySnake right">
                            <FontAwesomeIcon icon={faArrowRight} className="touch"/>
                        </div>
                    </div>
                </div>
            );
    }

}

export default ExpansionPanel;
