import React from 'react';
import {Link} from "react-router-dom";
const Alert = ({ status, message, onRestart, show }) => {
    const renderContent = () => {
        if (status === 'win') {
            return (
                <div className="customSuccess templateAlert">
                    <p className="alertMessage">{message}</p>
                    <div className="buttonList">
                        <Link to="/homepage">
                            <button className='returnButtonAlertSuccess button'>Accueil</button>
                        </Link>
                        <button className="returnButtonRestartSuccess button" onClick={onRestart}>Rejouer</button>
                    </div>
                </div>
            );
        } else if (status === 'error') {
            return (
                <div className="customLoose templateAlert">
                    <p className="alertMessage">{message}</p>
                    <div className="buttonList">
                        <button className="returnButtonRestartFail button" onClick={onRestart}>Réessayer</button>
                    </div>
                </div>
            );
        }
        return null;
    };

    if (!show) {
        return null;
    }

    return (
        <div className={`alert show`} id={status === 'win' ? 'success' : 'error'}>
            {renderContent()}
        </div>
    );
};

export default Alert;
