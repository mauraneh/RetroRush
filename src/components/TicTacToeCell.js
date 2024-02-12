import React from "react";

const TicTacToeCell = React.forwardRef((props, ref) => {
  const { value, onClick, isPlayerSymbol, isBotSymbol } = props;

  return (
    <td onClick={onClick} ref={ref}>
      {value && (
        <span
          className={
            isPlayerSymbol ? "player-symbol" : isBotSymbol ? "bot-symbol" : ""
          }
          style={{ color: "#fd028c" }}
        >
          {value}
        </span>
      )}
    </td>
  );
});

export default TicTacToeCell;
