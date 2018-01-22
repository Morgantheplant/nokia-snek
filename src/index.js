import "babel-polyfill";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TITLE_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  FETCHING_STATUSES,
  DESCRIPTION_MAX_LENGTH
} from "./constants";
import {
  newGameHandler,
  moveSnakeHandler,
  changeDirectionHandler
} from "./actions";
import { boardSelector } from "./selectors";

const prettyColor = (a, b, c) => `hsl(${a - b}, ${100 - c}%, 50%)`;
const getColor = ({ type, colorBase, row, col }) => {
  switch (type) {
    case 2:
      const opposite = colorBase + 180;
      const complimenary = opposite > 360 ? opposite - 360 : opposite;
      return prettyColor(complimenary, row, col);
    case 1:
      return "black";
    default:
      return prettyColor(colorBase, row, col);
  }
};

const Tile = ({ row, col, height, width, colorBase, type }) => (
  <div
    className={`tile-${row}-${col}-${type}`}
    style={{
      backgroundColor: getColor({ type, colorBase, row, col }),
      border: `1px solid black`,
      height: `${height}px`,
      left: `${row * width}px`,
      position: "absolute",
      top: `${col * height}px`,
      width: `${width}px`
    }}
  />
);

const Board = props => (
  <div className="board-container">
    {props.board.length > 0 &&
      props.board.reduce((acc, fullRow, i) => {
        fullRow.forEach((tileState, j) =>
          acc.push(
            <Tile
              colorBase={props.colorBase}
              col={j}
              height={props.height}
              key={`${i}-${j}`}
              row={i}
              type={tileState}
              width={props.width}
            />
          )
        );
        return acc;
      }, [])}
  </div>
);

const GameOver = ({ score }) => (
  <div className="game-over">
    Game Over<p>{`score: ${score}`}</p>
  </div>
);

const App = props => (
  <div className="main-container">
    <button className="main-btn" onClick={props.newGameHandler}>
      New Game
    </button>
    <Board
      board={props.board}
      height={props.height}
      width={props.width}
      colorBase={props.colorBase}
    />
    {props.gameOver && <GameOver score={props.score} />}
  </div>
);

const mapStateToProps = ({
  colorBase,
  gameOver,
  height,
  snack,
  snake,
  width
}) => {
  const board = boardSelector(height, width, snake, snack);
  const score = snake.length - 4; // default snek length is 4
  return {
    board,
    colorBase,
    gameOver,
    height,
    score,
    width
  };
};

const mapDispatchToProps = {
  newGameHandler
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
