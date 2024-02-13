import React from 'react';
import userIcon from '../../assets/images/user.png';

const UserButton = ({ active, userNickname, onClick, onEditUsername, newUsername, onReturn, setNewUsername }) => {
  return (
    <div className={`User ${active === 'brightness' ? 'hidden' : ''}`}>
      <div className="icon-and-label" onClick={onClick}>
        <img src={userIcon} alt="User" className="settings-icon" />
        <span>Mes infos</span>
      </div>
      {active === 'user' && (
        <div>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button className="brightlessbuton" onClick={onEditUsername}>Sauvegarder</button>
          <button className="brightlessbuton" onClick={onReturn}>Retour</button>
        </div>
      )}
    </div>
  );
};

export default UserButton;
