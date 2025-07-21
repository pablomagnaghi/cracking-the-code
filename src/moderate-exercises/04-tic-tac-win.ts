// 16.4. Tic Tac Win
//
// Write a function to determine if a player has won a game of tic-tac-toe.
// The board is represented by a 2D array of 'X', 'O', or null.

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
