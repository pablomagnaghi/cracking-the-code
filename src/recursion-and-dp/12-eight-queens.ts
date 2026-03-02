// LCCI 08.12. Eight Queens
//
// Write an algorithm to print all ways of arranging n queens on an n x n chess
// board so that none of them share the same row, column, or diagonal. In this
// case, "diagonal" means all diagonals, not just the two that bisect the board.
//
// Example:
//   Input: 4
//   Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
//
// The output is a list of boards where each board is a list of strings,
// "Q" indicates a queen and "." indicates an empty position.

type Board = number[]; // board[i] = column of queen in row i

export function eightQueens(): number[][] {
  const results: number[][] = [];
  const board: Board = [];

  placeQueen(0, board, results);
  return results;
}

// Attempts to place a queen at each row, exploring all valid configurations
function placeQueen(row: number, board: Board, results: number[][]): void {
  // Base case: All 8 queens are placed successfully
  if (row === 8) {
    results.push([...board]); // Save a copy of the board configuration
    return;
  }

  // Try placing queen in each column of the current row
  for (let col = 0; col < 8; col++) {
    if (isValid(board, row, col)) {
      board[row] = col;
      placeQueen(row + 1, board, results);
    }
  }
}

function isValid(board: Board, row: number, col: number): boolean {
  for (let i = 0; i < row; i++) {
    const otherCol = board[i];

    if (otherCol === col) return false;

    // Check diagonal conflicts
    const rowDiff = row - i;
    const colDiff = Math.abs(col - otherCol);
    if (rowDiff === colDiff) return false;
  }
  return true;
}
