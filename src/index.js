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
import { boardSelector, snakeReducer, numbersReducer } from "./selectors";

const prettyColor = (a, b, c, d) => {
  const hue = d ? a : 57;
  const sat = d ? 60 : 20;
  return `hsl(${hue - b}, ${sat - c}%, 40%)`;
};
const getColor = ({ type, colorBase, row, col, isOn }) => {
  switch (type) {
    //case 2:
    // return prettyColor(complimenary, row, col);
    case 1:
      return "rgb(3,83,59)";
    default:
      const color = isOn ? colorBase : 57;
      return prettyColor(color, row, col, isOn);
  }
};

const Snack = ({ backgroundColor }) => (
  <div className="snack">
    <div className="middle" style={{ backgroundColor }} />
    <div className="vertical" />
    <div className="horizontal" />
  </div>
);

const Tile = ({ row, col, tileSize = 10, colorBase, type, isOn }) => {
  const backgroundColor = getColor({ type, colorBase, row, col, isOn });
  return (
    <div
      className={`tile-${row}-${col}-${type}`}
      style={{
        backgroundColor,
        border: `.5px solid ${isOn
          ? "rgba(42, 163, 122, 0.5)"
          : getColor({
              type,
              colorBase: colorBase - 10,
              row: row - 1,
              col,
              isOn
            })}`,
        height: `${tileSize}px`,
        left: `${row * tileSize}px`,
        position: "absolute",
        top: `${col * tileSize}px`,
        width: `${tileSize}px`
      }}
    >
      {type === 2 && <Snack backgroundColor={backgroundColor} />}
    </div>
  );
};

const Board = props => (
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

const GameOver = ({ score, highScore, height, width, isOn }) => (
  <div
    className={`game-over ${isOn ? 'on' : ''}`}
    style={{
      height: `${5 * height}px`,
      width: `${5 * width}px`
    }}
  >
    <p>{`score: ${score}`}</p>
    <p>{`high score: ${highScore}`}</p>
  </div>
);

const App = props => (
  <div className="main-container">
    {!props.gameOver ? (
      <Board
        board={props.board}
        height={props.height}
        width={props.width}
        colorBase={props.colorBase}
        tileSize={props.tileSize}
        isOn={props.isOn}
      />
    ) : (
      <GameOver
        height={props.height}
        width={props.width}
        score={props.score}
        isOn={props.isOn}
        highScore={props.highScore}
      />
    )}
  </div>
);

const mapStateToProps = state => {
  const {
    colorBase,
    gameOver,
    highScore,
    height,
    snack,
    snake,
    tileSize,
    width
  } = snakeReducer(state);
  const { buttonsOn: isOn } = numbersReducer(state);
  const board = boardSelector(height, width, snake, snack);
  const score = snake.length - 4; // default snek length is 4
  return {
    board,
    colorBase,
    gameOver,
    highScore,
    height,
    score,
    tileSize,
    width,
    isOn
  };
};

const mapDispatchToProps = {
  newGameHandler
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
