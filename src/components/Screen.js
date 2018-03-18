import "babel-polyfill";
import React from "react";
import { connect } from "react-redux";
import SnakeBoard from "./SnakeBoard";
import GameOver from "./GameOver";
import Title from "./Title";
import { SCREENS } from "../constants";
import {
  boardSelector,
  snakeReducer,
  numbersReducer,
  screenReducer
} from "../selectors";

const ActiveScreen = props => {
  switch (props.screen) {
    case SCREENS.SCORES:
      return (
        <GameOver
          height={props.height}
          highScore={props.highScore}
          isOn={props.isOn}
          score={props.score}
          width={props.width}
        />
      );
    case SCREENS.SNAKE:
      return (
        <SnakeBoard
          board={props.board}
          colorBase={props.colorBase}
          height={props.height}
          isOn={props.isOn}
          tileSize={props.tileSize}
          width={props.width}
        />
      );
    default:
      return <Title isOn={props.isOn} />;
  }
};

const Screen = props => (
  <div className="screen">
    <ActiveScreen {...props} />
  </div>
);

const mapStateToProps = state => {
  const {
    colorBase,
    gameOver,
    height,
    highScore,
    snack,
    snake,
    tileSize,
    width
  } = snakeReducer(state);
  const { buttonsOn: isOn } = numbersReducer(state);
  const screen = screenReducer(state);
  const board = boardSelector(height, width, snake, snack);
  const score = snake.length - 4; // default snek length is 4
  return {
    board,
    colorBase,
    gameOver,
    height,
    highScore,
    isOn,
    score,
    screen,
    tileSize,
    width
  };
};

export default connect(mapStateToProps)(Screen);
