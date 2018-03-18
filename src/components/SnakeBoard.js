import React from "react";
import Tile from "./Tile";

const SnakeBoard = props => (
  <div className="board-container">
    {props.board.length > 0 &&
      props.board.reduce((acc, fullRow, i) => {
        fullRow.forEach((tileState, j) =>
          acc.push(
            <Tile
              colorBase={props.colorBase}
              col={j}
              key={`${i}-${j}`}
              row={i}
              type={tileState}
              tileSize={props.tileSize}
              isOn={props.isOn}
            />
          )
        );
        return acc;
      }, [])}
  </div>
);

export default SnakeBoard;
