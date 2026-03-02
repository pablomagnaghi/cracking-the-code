// LCCI 16.04. Tic-Tac-Toe
//
// Design an algorithm to figure out if someone has won a game of tic-tac-toe.
// Input is an N x N string array board containing "X", "O", and " " characters.
//
// Rules:
//   - A player wins by filling an entire row, column, or diagonal.
//   - "O" moves first, "X" moves second.
//
// Example 1:
//   Input: board = ["O X"," XO","X O"]
//   Output: "X"
//
// Example 2:
//   Input: board = ["OOX","XXO","OXO"]
//   Output: "Draw"
//
// Example 3:
//   Input: board = ["OOX","XXO","OX "]
//   Output: "Pending"
//
// Constraints:
//   - 1 <= board.length == board[i].length <= 100
//   - Input follows valid tic-tac-toe game rules.

export function ticTacWin(board: (string | null)[][], player: string): boolean {
  const n = board.length;

  // Check rows
  for (let i = 0; i < n; i++) {
    if (board[i].every((cell) => cell === player)) {
      return true;
    }
  }

  // Check columns
  for (let j = 0; j < n; j++) {
    let colWin = true;
    for (let i = 0; i < n; i++) {
      if (board[i][j] !== player) {
        colWin = false;
        break;
      }
    }
    if (colWin) return true;
  }

  // Check main diagonal
  let diagWin = true;
  for (let i = 0; i < n; i++) {
    if (board[i][i] !== player) {
      diagWin = false;
      break;
    }
  }
  if (diagWin) return true;

  // Check anti-diagonal
  diagWin = true;
  for (let i = 0; i < n; i++) {
    if (board[i][n - 1 - i] !== player) {
      diagWin = false;
      break;
    }
  }
  if (diagWin) return true;

  return false;
}
