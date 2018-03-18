import React from "react";
import Tile from "./Tile";

const SnakeBoard = props => (
  <div className="board-container">
    {props.board.length > 0 &&
      props.board.reduce((acc, fullRow, i) => {
        fullRow.forEach((tileState, j) =>
          acc.push(
            <Tile
              col={j}
              colorBase={props.colorBase}
              isOn={props.isOn}
              key={`${i}-${j}`}
              row={i}
              tileSize={props.tileSize}
              type={tileState}
            />
          )
        );
        return acc;
      }, [])}
  </div>
);

export default SnakeBoard;
