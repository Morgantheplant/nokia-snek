export const DIRECTIONS = {
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  UP: 'UP'
};

export const BUTTON_NAMES = {
  CLEAR: 'clear',
  DOWN: 'down',
  UP: 'up',
  HOME: 'home',
  // number pad
  EIGHT: 'button8',
  FOUR: 'button4',
  SIX: 'button6',
  TWO: 'button2',
};

export const KEY_LOOKUP = {
  ' ': BUTTON_NAMES.HOME,
  ArrowDown: BUTTON_NAMES.EIGHT,
  ArrowLeft: BUTTON_NAMES.FOUR,
  ArrowRight: BUTTON_NAMES.SIX,
  ArrowUp: BUTTON_NAMES.TWO,
  Enter: BUTTON_NAMES.HOME,
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

export const BUTTONS_OFF = 'BUTTONS_OFF';
export const BUTTONS_ON = 'BUTTONS_ON';
export const CHANGE_BOARD_HEIGHT = 'CHANGE_BOARD_HEIGHT';
export const CHANGE_DIRECTION = 'CHANGE_DIRECTION';
export const DEPRESS_BUTTON = 'DEPRESS_BUTTON';
export const GAME_OVER = 'GAME_OVER';
export const MOVE_SNAKE = 'MOVE_SNAKE';
export const NEW_GAME = 'NEW_GAME';
export const TITLE_SCREEN = 'TITLE_SCREEN';

export const SCREENS = {
  SCORES: 'SCORES',
  SNAKE: 'SNAKE',
  TITLE: 'TITLE'
};

export const NUMBERS1TO9 = new Array(9).fill().map((_, i) => i + 1);
export const BOTTOM_ROW = ["star", 0, "pound"];
export const KEYPAD = [...NUMBERS1TO9, ...BOTTOM_ROW];