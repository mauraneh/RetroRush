import React from 'react';

const Alert = ({ status, message, onRestart, show }) => {
    const renderContent = () => {
        if (status === 'win') {
            return <p className="customSuccess">Bravo, {message} a gagné!</p>;
        } else if (status === 'error') {
            return <p className="customError">{message}</p>;
        }
        return null;
    };

    if (!show) {
        return null;
    }

    return (
        <div className={`alert show`} id={status === 'win' ? 'success' : 'error'}>
            {renderContent()}
            <button onClick={onRestart}>Redémarrer</button>
        </div>
    );
};

export default Alert;
