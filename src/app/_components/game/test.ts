type Player = 0 | 1 | 2; // 0 for empty, 1 for player 1, 2 for player 2
type Grid = Player[][]; // 2D array representing the grid

const ROWS = 6;
const COLS = 7;

function createBoard(): Grid {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function dropDisc(grid: Grid, column: number, player: Player): boolean {
  // Check if column is within bounds
  if (column < 0 || column >= COLS) {
    return false; // Invalid column
  }

  // Find the lowest empty row in the specified column
  for (let row = ROWS - 1; row >= 0; row--) {
    if (grid[row][column] === 0) {
      grid[row][column] = player;
      return true; // Disc successfully placed
    }
  }

  return false; // Column is full
}

function checkWinner(grid: Grid): Player {
  const directions = [
    { dx: 1, dy: 0 }, // horizontal right
    { dx: 0, dy: 1 }, // vertical down
    { dx: 1, dy: 1 }, // diagonal down-right
    { dx: 1, dy: -1 }, // diagonal up-right
  ];

  const checkDirection = (
    row: number,
    col: number,
    dx: number,
    dy: number,
    player: Player
  ): boolean => {
    for (let i = 1; i < 4; i++) {
      const newRow = row + i * dy;
      const newCol = col + i * dx;
      if (
        newRow < 0 ||
        newRow >= ROWS ||
        newCol < 0 ||
        newCol >= COLS ||
        grid[newRow][newCol] !== player
      ) {
        return false;
      }
    }
    return true;
  };

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const player = grid[row][col];
      if (player === 0) continue;

      for (const { dx, dy } of directions) {
        if (checkDirection(row, col, dx, dy, player)) {
          return player; // Return the winning player (1 or 2)
        }
      }
    }
  }

  return 0; // No winner yet
}

// Example usage:
const board: Grid = createBoard();

dropDisc(board, 0, 1); // Player 1 drops disc in column 0
dropDisc(board, 1, 1); // Player 1 drops disc in column 1
dropDisc(board, 2, 1); // Player 1 drops disc in column 2
dropDisc(board, 3, 1); // Player 1 drops disc in column 3

console.log(checkWinner(board)); // Output: 1 (Player 1 wins horizontally)

/////////////////////////////////////////////////////////////////////////////////////////

function checkWinner2(grid: Grid): Player {
  const rows = grid.length;
  const cols = grid[0].length;

  // Direction vectors for horizontal, vertical, and diagonal checks
  const directions = [
    { dx: 1, dy: 0 }, // horizontal right
    { dx: 0, dy: 1 }, // vertical down
    { dx: 1, dy: 1 }, // diagonal down-right
    { dx: 1, dy: -1 }, // diagonal up-right
  ];

  // Function to check if a sequence of four exists starting from (row, col)
  const checkDirection = (
    row: number,
    col: number,
    dx: number,
    dy: number,
    player: Player
  ): boolean => {
    for (let i = 1; i < 4; i++) {
      // { dx: 1, dy: 0 }
      const newRow = row + i * dy; // for row 0 col 6 newRow = 0 n
      const newCol = col + i * dx;
      // Check if within bounds and the pieces belong to the same player
      if (
        newRow < 0 ||
        newRow >= rows ||
        newCol < 0 ||
        newCol >= cols ||
        grid[newRow][newCol] !== player
      ) {
        return false;
      }
    }
    return true;
  };

  // Loop through each cell of the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const player = grid[row][col];
      if (player === 0) continue; // Skip empty cells

      // Check all directions for a possible winning line
      for (const { dx, dy } of directions) {
        if (checkDirection(row, col, dx, dy, player)) {
          return player; // Return the winning player (1 or 2)
        }
      }
    }
  }

  return 0; // Return 0 if no winner (game is ongoing or a draw)
}

// Example usage:

const grid: Grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

console.log(checkWinner2(grid)); // Output will be 1 (Player 1 wins)
