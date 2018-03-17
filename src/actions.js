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
  SCREENS
} from "./constants";
import { snakeReducer, screenReducer } from "./selectors";
import { findNextCoords, hasCollision } from "./reducers";

const changeDirection = direction => ({
  type: CHANGE_DIRECTION,
  direction
});

export const nextTick = () => (dispatch, getState) => {
  const snakeState = snakeReducer(getState());
  const nextCoords = findNextCoords(snakeState);
  const collision = hasCollision(snakeState, nextCoords);
  return collision ?
    dispatch(gameOver()) :
    dispatch(moveSnake(nextCoords))
};

export const showScores = () => ({
  type: GAME_OVER
});

export const titleScreen = ()=> ({
  type: TITLE_SCREEN
});

export const gameOver = () => (dispatch, getState)=> {
  dispatch(showScores());
  setTimeout(()=>{
    const screen = screenReducer(getState());
    // go to title if still on scores screen
    screen === SCREENS.SCORES && dispatch(titleScreen());
  },5000)
} 

export const moveSnake = nextCoords => ({
  type: MOVE_SNAKE,
  nextCoords
});
  

const startNewGame = () => ({
  type: NEW_GAME
});

let timer;
export const pressButton = button => dispatch => {
  if(button === "home"){
    dispatch(startNewGame())
  } else {
    const direction = KEY_LOOKUP[button];
    direction && dispatch(changeDirection(direction));    
  }  

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
    dispatch(pressButton()) // light up buttons
    dispatch(titleScreen());
    dispatch(boardHeight(Math.round(height), Math.round(width)));
  }, 100);
};

const boardHeight = (height, width) => ({
  type: CHANGE_BOARD_HEIGHT,
  height,
  width
});

export const keyDownHandler = ({ key }) => dispatch => {
  const button = KEY_LOOKUP[key];
  button && dispatch(pressButton(button));
};

