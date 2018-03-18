import {
  CHANGE_DIRECTION,
  CHANGE_BOARD_HEIGHT,
  KEY_LOOKUP,
  MOVE_SNAKE,
  TITLE_SCREEN,
  NEW_GAME,
  GAME_OVER,
  BUTTONS_ON,
  BUTTONS_OFF,
  DEPRESS_BUTTON,
  SCREENS,
  BUTTON_NAMES,
} from './constants';
import { snakeReducer, screenReducer } from './selectors';
import { findNextCoords, hasCollision, screenDimsFromInnerHeight } from './reducers';

const changeDirection = direction => ({
  type: CHANGE_DIRECTION,
  direction,
});

const moveSnake = nextCoords => ({
  type: MOVE_SNAKE,
  nextCoords,
});

const showScores = () => ({
  type: GAME_OVER,
});

const titleScreen = () => ({
  type: TITLE_SCREEN,
});

const startNewGame = () => ({
  type: NEW_GAME,
});

const buttonsOn = name => ({
  type: BUTTONS_ON,
  name,
});

const buttonsOff = name => ({
  type: BUTTONS_OFF,
  name,
});

const depressButton = name => ({
  type: DEPRESS_BUTTON,
  name,
});

const boardHeight = (height, width) => ({
  type: CHANGE_BOARD_HEIGHT,
  height,
  width,
});

const gameOver = () => (dispatch, getState) => {
  dispatch(showScores());
  setTimeout(() => {
    const screen = screenReducer(getState());
    // go to title if still on scores screen
    screen === SCREENS.SCORES && dispatch(titleScreen());
  }, 5000);
};

export const nextTick = () => (dispatch, getState) => {
  const snakeState = snakeReducer(getState());
  const nextCoords = findNextCoords(snakeState);
  const collision = hasCollision(snakeState, nextCoords);
  return collision ? dispatch(gameOver()) : dispatch(moveSnake(nextCoords));
};

let timer;
export const pressButton = button => (dispatch) => {
  // handle secondary button actions
  switch (button) {
    case BUTTON_NAMES.HOME:
      dispatch(startNewGame());
      break;
    case BUTTON_NAMES.CLEAR:
      dispatch(titleScreen());
      break;
    default:
      const direction = KEY_LOOKUP[button];
      direction && dispatch(changeDirection(direction));
  }
  // handle button pressing
  dispatch(buttonsOn(button));
  setTimeout(() => {
    dispatch(depressButton(button));
  }, 50);
  // handle button lights
  clearTimeout(timer);
  timer = setTimeout(() => {
    dispatch(buttonsOff(button));
  }, 2000);
};

let debouncer;
export const changeBoardSize = ({ currentTarget }) => (dispatch) => {
  clearTimeout(debouncer);
  debouncer = setTimeout(() => {
    const { screenHeight, screenWidth } = screenDimsFromInnerHeight()
    dispatch(pressButton(BUTTON_NAMES.CLEAR)); // reset game
    dispatch(boardHeight(Math.round(screenHeight), Math.round(screenWidth)));
  }, 100);
};

export const keyDownHandler = ({ key }) => (dispatch) => {
  const button = KEY_LOOKUP[key];
  button && dispatch(pressButton(button));
};
