import {
  CHANGE_DIRECTION,
  DIRECTIONS,
  INVALID_DIRECTION_MAP,
  MOVE_SNAKE,
  NEW_GAME
} from "./constants";

const getColorBase = () => Math.round(Math.random() * 360);

const defaultState = {
  colorBase: getColorBase(),
  direction: DIRECTIONS.RIGHT,
  gameOver: false,
  height: 0,
  shouldAnimate: false,
  snack: {},
  snake: [],
  width: 0
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
        x: xRight >= height ? 0 : xRight
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
  gameOver: true
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

export const rootReducer = (state = defaultState, action) => {
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
      const { height, width } = action;
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
    default:
      return state;
  }
};
