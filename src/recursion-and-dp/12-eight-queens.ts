// 8.12 – Eight Queens Problem
//
// The goal is to place 8 queens on an 8x8 chessboard such that no two queens threaten each other.
// A queen can attack any other piece in the same row, column, or diagonal.
// This function returns all valid arrangements of 8 queens on the board.

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
