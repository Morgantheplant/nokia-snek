const createNewBoard = (height, width) =>
  new Array(width).fill().map(() => new Array(height).fill().map(() => 0));

const addSnakeToBoard = (board = [], snake = []) => {
  if (board.length) {
    const height = board.length;
    const width = board[0].length;
    snake.slice(0, snake.length).forEach(({ x, y }) => {
      board[x][y] = 1;
    });
  }
  return board;
};

const addSnackToBoard = (board, { x, y }) => {
  if(x >= 0 && y >=0){
    board[x][y] = 2;
  }
  return board;
};

export const boardSelector = (height, width, snake, snack) => {
  const board = createNewBoard(height, width);
  const updatedBoard = addSnakeToBoard(board, snake);
  return addSnackToBoard(updatedBoard, snack);
};

export const snakeReducer = state => state.snakeReducer;
export const numbersReducer = state => state.numbersReducer;
export const scoreReducer = state => state.scoreReducer;
export const screenReducer = state => state.screenReducer;