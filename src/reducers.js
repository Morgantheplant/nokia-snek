import { combineReducers } from "redux";
import {
  CHANGE_DIRECTION,
  CHANGE_BOARD_HEIGHT,
  DIRECTIONS,
  INVALID_DIRECTION_MAP,
  MOVE_SNAKE,
  NEW_GAME,
  TITLE_SCREEN,
  GAME_OVER,
  BUTTONS_ON,
  BUTTONS_OFF,
  DEPRESS_BUTTON,
  SCREENS,
  KEYPAD
} from "./constants";

const getColorBase = () => 176;

const { innerHeight } = window;
const initialHeight = Math.min(innerHeight * 0.0286, 25);
const initialWidth = initialHeight * 1.38;

const defaultState = {
  colorBase: getColorBase(),
  direction: DIRECTIONS.RIGHT,
  height: Math.round(initialHeight),
  width: Math.round(initialWidth),
  tileSize: 5,
  shouldAnimate: false,
  snack: {},
  snake: [],
  highScore: 0
};

const getBaseSnake = (height, width, length = 4) => {
  const snakeHeadX = Math.floor(height / 2);
  const snakeHeadY = Math.floor(width / 2);
  return new Array(length).fill().reduce((acc, _, i) => {
    acc.push({
      x: snakeHeadX - i,
      y: snakeHeadY
    });
    return acc;
  }, []);
};

const nextCordsForDirection = ({ coords, direction, height, width }) => {
  switch (direction) {
    case DIRECTIONS.UP:
      const yUp = coords.y - 1;
      return {
        ...coords,
        y: yUp < 0 ? height - 1 : yUp
      };
    case DIRECTIONS.DOWN:
      const yDown = coords.y + 1;
      return {
        ...coords,
        y: yDown >= height ? 0 : yDown
      };
    case DIRECTIONS.LEFT:
      const xLeft = coords.x - 1;
      return {
        ...coords,
        x: xLeft < 0 ? width - 1 : xLeft
      };
    case DIRECTIONS.RIGHT:
      const xRight = coords.x + 1;
      return {
        ...coords,
        x: xRight >= width ? 0 : xRight
      };
    default:
      return coords;
  }
};

export const findNextCoords = ({ snake, direction, height, width }) => {
  const head = snake[0];
  return nextCordsForDirection({
    coords: head,
    direction,
    height,
    width
  });
};

export const hasCollision = (state, nextCoords) =>
  state.snake &&
  state.snake.some(({ x, y }) => nextCoords.x === x && nextCoords.y === y);

const gameOver = state => ({
  ...state,
  shouldAnimate: false,
  highScore:
    state.snake.length - 4 > state.highScore
      ? state.snake.length - 4
      : state.highScore
});

const findEmptyTile = (snake, height, width) => {
  let x, y;
  let invalid = true;
  while (invalid) {
    x = Math.floor(Math.random() * width);
    y = Math.floor(Math.random() * height);
    invalid = snake.some(section => section.x === x && section.y === y);
  }
  return {
    x,
    y
  };
};

const sameCoords = (first, second) =>
  first.x === second.x && first.y === second.y;

const moveSnake = (state, nextCoords) => {
  const lastSnake = state.snake;
  const eatingSnack = sameCoords(nextCoords, state.snack);
  const offset = eatingSnack ? 0 : 1;
  const snake = [nextCoords, ...lastSnake.slice(0, lastSnake.length - offset)];
  return {
    ...state,
    snake,
    snack: eatingSnack
      ? findEmptyTile(snake, state.height, state.width)
      : state.snack
  };
};

export const snakeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MOVE_SNAKE:
      const { nextCoords } = action;
      return moveSnake(state, nextCoords);
    case GAME_OVER:
      return gameOver(state);
    case CHANGE_DIRECTION:
      const invalid = INVALID_DIRECTION_MAP[state.direction];
      return action.direction !== invalid
        ? {
            ...state,
            direction: action.direction
          }
        : state;
    case NEW_GAME:
      const { height, width } = state;
      const snake = getBaseSnake(height, width, 4);
      const snack = findEmptyTile(snake, height, width);
      return {
        ...state,
        colorBase: getColorBase(),
        direction: defaultState.direction,
        height,
        shouldAnimate: true,
        snack,
        snake,
        width
      };
    case CHANGE_BOARD_HEIGHT:
      return {
        ...state,
        height: action.height,
        width: action.width
      };

    case TITLE_SCREEN:
      return {
        ...defaultState,
        shouldAnimate: false
      };
    default:
      return state;
  }
};

const keyPressMap = KEYPAD.reduce(
  (acc, name) => ({
    ...acc,
    [name]: false
  }),{});

const defaultButtonState = {
  buttonsOn: false,
  keyPad: KEYPAD,
  keyPressMap
};

export const numbersReducer = (state = defaultButtonState, action) => {
  switch (action.type) {
    case BUTTONS_ON:
      return {
        ...state,
        buttonsOn: true,
        keyPressMap: {
          ...state.keyPressMap,
          [action.name]: true
        }
      };
    case BUTTONS_OFF:
      return {
        ...state,
        buttonsOn: false
      };
    case DEPRESS_BUTTON:
      return {
        ...state,
        keyPressMap: {
          ...state.keyPressMap,
          [action.name]: false
        }
      };
    default:
      return state;
  }
};

const defaultScreenState = SCREENS.TITLE;

export const screenReducer = (state = defaultScreenState, action) => {
  switch (action.type) {
    case GAME_OVER:
      return SCREENS.SCORES;
    case NEW_GAME:
      return SCREENS.SNAKE;
    case TITLE_SCREEN:
      return SCREENS.TITLE;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  numbersReducer,
  screenReducer,
  snakeReducer
});
