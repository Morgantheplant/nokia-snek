import {
  CHANGE_DIRECTION,
  CHANGE_BOARD_HEIGHT,
  KEY_LOOKUP,
  MOVE_SNAKE,
  NEW_GAME,
  BUTTONS_ON,
  BUTTONS_OFF,
  DEPRESS_BUTTON
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

let timer;
export const pressButton = button => dispatch => {
  const direction = KEY_LOOKUP[button];
  direction && dispatch(changeDirection(direction));
  dispatch(buttonsOn(button));
  setTimeout(function() {
    dispatch(depressButton(button));
  }, 50);
  clearTimeout(timer);
  timer = setTimeout(() => {
    dispatch(buttonsOff(button));
  }, 2000);
};

export const buttonsOn = name => ({
  type: BUTTONS_ON,
  name
});

export const buttonsOff = name => ({
  type: BUTTONS_OFF,
  name
});

export const depressButton = name => ({
  type: DEPRESS_BUTTON,
  name
});

let debouncer;
export const changeBoardSize = ({ currentTarget }) => dispatch => {
  clearTimeout(debouncer);
  debouncer = setTimeout(function() {
    const { innerHeight, innerWidth } = currentTarget;
    const height = innerHeight * 0.0286;
    const width = height * 1.38;
    dispatch(boardHeight(Math.round(height), Math.round(width)));
    dispatch(startNewGame(18, 25))
  }, 100);
};

const boardHeight = (height, width) => ({
  type: CHANGE_BOARD_HEIGHT,
  height,
  width
});

export const changeDirectionHandler = ({ key }) => dispatch => {
  const button = KEY_LOOKUP[key];
  button && dispatch(pressButton(button));
};

export const newGameHandler = (button) => dispatch => {
  dispatch(pressButton(button))
  dispatch(startNewGame(18, 25))
};
