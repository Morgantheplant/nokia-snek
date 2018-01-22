import {
  CHANGE_DIRECTION,
  KEY_LOOKUP,
  MOVE_SNAKE,
  NEW_GAME
} from "./constants";

const changeDirection = direction => ({
  type: CHANGE_DIRECTION,
  direction
});

export const moveSnake = () => ({
  type: MOVE_SNAKE
});

const startNewGame = (height = 10, width = 10) => ({
  type: NEW_GAME,
  height,
  width
});

export const changeDirectionHandler = ({ key }) => dispatch => {
  const direction = KEY_LOOKUP[key];
  direction && dispatch(changeDirection(direction));
};

export const newGameHandler = () => dispatch => dispatch(startNewGame(20, 20));
