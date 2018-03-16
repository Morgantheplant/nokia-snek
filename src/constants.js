export const DIRECTIONS = {
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  UP: "UP"
};

export const KEY_LOOKUP = {
  ArrowDown: "button8",
  ArrowLeft:"button4",
  ArrowRight: "button6",
  ArrowUp: "button2",
  button2: DIRECTIONS.UP,
  button4: DIRECTIONS.LEFT,
  button6: DIRECTIONS.RIGHT,
  button8: DIRECTIONS.DOWN
};

export const INVALID_DIRECTION_MAP = {
  [DIRECTIONS.DOWN]: DIRECTIONS.UP,
  [DIRECTIONS.LEFT]: DIRECTIONS.RIGHT,
  [DIRECTIONS.RIGHT]: DIRECTIONS.LEFT,
  [DIRECTIONS.UP]: DIRECTIONS.DOWN
};

export const CHANGE_DIRECTION = "CHANGE_DIRECTION";
export const CHANGE_BOARD_HEIGHT = "CHANGE_BOARD_HEIGHT";
export const MOVE_SNAKE = "MOVE_SNAKE";
export const NEW_GAME = "NEW_GAME";
export const BUTTONS_ON = "BUTTONS_ON";
export const BUTTONS_OFF = "BUTTONS_OFF";
export const DEPRESS_BUTTON = "DEPRESS_BUTTON";
export const SET_SCORE = "SET_SCORE";
