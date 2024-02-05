import "../assets/css/games.css";

const Scoreboard = ({ playerWins, draws, botWins, isGameActive }) => {
  return (
    <div
      id="snakeScoreWrapper"
      style={{ display: isGameActive ? "flex" : "none" }}
    >
      <div id="snakeScore">
        Joueur : {playerWins} | Matchs nuls : {draws} | Bot : {botWins}
      </div>
    </div>
  );
};
export default Scoreboard;
