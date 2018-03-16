import {
  CHANGE_DIRECTION,
  CHANGE_BOARD_HEIGHT,
  DIRECTIONS,
  INVALID_DIRECTION_MAP,
  MOVE_SNAKE,
  NEW_GAME,
  BUTTONS_ON,
  BUTTONS_OFF,
  DEPRESS_BUTTON,
  SCREENS,
  SET_SCORE
} from "./constants";
import { combineReducers } from "redux";

const getColorBase = () => 176;

const { innerHeight } = window;
const height = innerHeight * 0.0286;
const width = height * 1.38;

const defaultState = {
  colorBase: getColorBase(),
  direction: DIRECTIONS.RIGHT,
  gameOver: false,
  height: Math.round(height),
  width: Math.round(width),
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

const findNextCoords = ({ snake, direction, height, width }) => {
  const head = snake[0];
  return nextCordsForDirection({ coords: head, direction, height, width });
};

const hasCollision = (state, nextCoords) =>
  state.snake &&
  state.snake.some(({ x, y }) => nextCoords.x === x && nextCoords.y === y);

const gameOver = state => ({
  ...state,
  shouldAnimate: false,
  gameOver: true,
  highScore: state.snake.length > state.highScore ? state.snake.length : state.highScore
});

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

export const snakeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MOVE_SNAKE:
      const nextCoords = findNextCoords(state);
      return hasCollision(state, nextCoords)
        ? gameOver(state)
        : moveSnake(state, nextCoords);
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
        gameOver: false,
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
    default:
      return state;
  }
};

const numbers1to9 = new Array(9).fill().map((_, i) => i + 1);
const bottomRow = ["star", 0, "pound"];
const keyPad = [...numbers1to9, ...bottomRow];
const keyPressMap = keyPad.reduce(
  (acc, name) => ({
    ...acc,
    [name]: false
  }),
  keyPad
);

const defaultButtonState = {
  buttonsOn: false,
  keyPad,
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
      console.log('depressing', action.name)
      return {
        ...state,
        keyPressMap: {
          ...state.keyPressMap,
          [action.name]: false
        }
    }  
    default:
      return state;
  }
};


export const rootReducer = combineReducers({
  numbersReducer,
  snakeReducer
});
