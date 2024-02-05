const Cell = ({ value, onClick, isPlayerSymbol, isBotSymbol }) => {
  return (
    <td
      onClick={onClick}
      className={`tictactoe-cell ${isPlayerSymbol ? "player-symbol" : ""} ${
        isBotSymbol ? "bot-symbol" : ""
      }`}
    >
      {value}
    </td>
  );
};
export default Cell;
