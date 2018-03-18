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
          width={props.width}
          score={props.score}
          isOn={props.isOn}
          highScore={props.highScore}
        />
      );
    case SCREENS.SNAKE:
      return (
        <SnakeBoard
          board={props.board}
          height={props.height}
          width={props.width}
          colorBase={props.colorBase}
          tileSize={props.tileSize}
          isOn={props.isOn}
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
    highScore,
    height,
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
    highScore,
    height,
    score,
    screen,
    tileSize,
    width,
    isOn
  };
};

export default connect(mapStateToProps)(Screen);
