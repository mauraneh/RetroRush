import React from "react";
import keyBoardQ from "../assets/images/icon/lettre-q.png"
import keyBoardD from "../assets/images/icon/lettre-d.png"
import {useSpeed} from "../Context/Speedcontext";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

/* POSSIBILITEE DE METTRE PARAMETRES POUR CHANGER LES REGLAGES D'UNE PARTIE
EXEMPLE : VITESSE SERPENT
 */

const ExpansionPanel = ({ gameToExplain }) => {
    const navigate = useNavigate();
    const { speedBall, setSpeedBall } = useSpeed();
    const gameRoutes = ["/snake", "/breakout", "/motus", "/tictactoe"];
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

    switch (gameToExplain) {
        case 'Breakout':
            return (
                <div className="expansionPanel">
                    <h1>{gameToExplain}</h1>
                    <p className="gameTagline">Faites rebondir la balle, détruisez les briques, et ne laissez pas la
                        balle tomber !</p>
                    <div className="instructions">
                        <div className="key">
                            <p>LEFT</p>
                            <img src={keyBoardQ} alt="touche Q"/>
                        </div>
                        <div className="key">
                            <img src={keyBoardD} alt="touche D"/>
                            <p>RIGHT</p>
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
                    <p className="gameTagline">Guidez le serpent, mangez les pommes, et évitez de vous mordre la queue ou les murs !</p>
                    <p className="subgameTagline">Utilise les touches 'Haut', 'Bas', 'Droite', 'Gauche', pour déplacer le serpent.</p>
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
        case 'HomePage':
            return (
                <div className="expansionPanel">
                    <h1>{gameToExplain}</h1>
                    <div className="instructions">
                        <div className="instructionsHomePages">
                            <p className="pHomePage">Découvrez un univers de jeux rétro et plongez dans le plaisir
                                nostalgique ! <br/>Cliquez, jouez et laissez-vous transporter par l'aventure !</p>
                            <div className="buttonList">
                                <button className="button">Votre score</button>
                                <button className="button" onClick={() => navigate(selectRandomGame())}>Jeux aléatoire
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        default:
            return (
                <div className="expansionPanel">
                    <div className="instructions">
                        <p className="noGameFound">Aucuns jeux trouvés.</p>
                    </div>
                </div>
            );
    }

}

export default ExpansionPanel;
