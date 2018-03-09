export const DIRECTIONS = {
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  UP: "UP"
};

export const KEY_LOOKUP = {
  ArrowDown: DIRECTIONS.DOWN,
  ArrowLeft: DIRECTIONS.LEFT,
  ArrowRight: DIRECTIONS.RIGHT,
  ArrowUp: DIRECTIONS.UP
};

export const INVALID_DIRECTION_MAP = {
  [DIRECTIONS.DOWN]: DIRECTIONS.UP,
  [DIRECTIONS.LEFT]: DIRECTIONS.RIGHT,
  [DIRECTIONS.RIGHT]: DIRECTIONS.LEFT,
  [DIRECTIONS.UP]: DIRECTIONS.DOWN
};

export const CHANGE_DIRECTION = "CHANGE_DIRECTION";
export const MOVE_SNAKE = "MOVE_SNAKE";
export const NEW_GAME = "NEW_GAME";

export const LETTER_COORDS = {
  S: [
    { x: 4, y: 1 },
    { x: 3, y: 1 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
    { x: 4, y: 3 },
    { x: 4, y: 4 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
    { x: 2, y: 5 }
  ].map(({x,y})=>({ x, y:y + 6 })),
  N: [
    { x: 6, y: 1 },
    { x: 6, y: 2 },
    { x: 6, y: 3 },
    { x: 6, y: 4 },
    { x: 6, y: 5 },
    { x: 7, y: 2 },
    { x: 8, y: 3 },
    { x: 9, y: 1 },
    { x: 9, y: 2 },
    { x: 9, y: 3 },
    { x: 9, y: 4 },
    { x: 9, y: 5 }
  ].map(({x,y})=>({ x, y:y + 6 })),
  E: [
    { x: 11, y: 1 },
    { x: 11, y: 2 },
    { x: 11, y: 3 },
    { x: 11, y: 4 },
    { x: 11, y: 5 },
    { x: 12, y: 1 },
    { x: 13, y: 1 },
    { x: 12, y: 3 },
    { x: 13, y: 3 },
    { x: 12, y: 5 },
    { x: 13, y: 5 },
  ].map(({x,y})=>({ x, y:y + 6 })),
  K: [
    { x: 15, y: 1 },
    { x: 15, y: 2 },
    { x: 15, y: 3 },
    { x: 15, y: 4 },
    { x: 15, y: 5 },
    { x: 17, y: 1 },
    { x: 17, y: 2 },
    { x: 16, y: 3 },
    { x: 17, y: 4 },
    { x: 17, y: 5 },
  ].map(({x,y})=>({ x, y:y + 6 }))
};
