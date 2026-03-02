// 06.03. Dominos
//
// There is an 8x8 chessboard in which two diagonally opposite corners have
// been cut off. You are given 31 dominos, and a single domino can cover
// exactly two squares. Can you use the 31 dominos to cover the entire board?
// Prove your answer (by providing an example or showing why it is impossible).
//
// Key Insight:
//   Each domino placed on the board always covers one black square and one
//   white square. With 31 dominos you would need exactly 31 black and 31
//   white squares. However, diagonally opposite corners on a chessboard are
//   the same color. Removing them leaves 30 squares of one color and 32 of
//   the other, making it impossible to tile with dominos.
//
// Example:
//   Input: boardSize = 8 (standard chessboard)
//   Removed corners: (0,0) and (7,7) -- both black
//   Remaining: 30 black, 32 white
//   Output: false (cannot be covered)
//
// Constraints:
//   - Board is square with even side length
//   - Two diagonally opposite corners (same color) are removed
//   - Dominos cannot be broken, cut, or overlap

// SOLUTION:
// The answer is NO. The board with opposite corners removed has unequal numbers of black and white squares.
// Each domino must cover one black and one white square, so 31 dominos cover 31 black and 31 white.
// But the board now has 32 squares, with 30 of one color and 32 of the other — so it’s impossible.

export function canCoverWithDominos(boardSize = 8): boolean {
  // Remove opposite corners: one black, one black (or one white, one white)
  // On a standard chessboard, corners (0,0) and (7,7) are the same color — black
  // After removal, we have:
  const totalSquares = boardSize * boardSize - 2; // 64 - 2 = 62
  const dominos = 31; // each domino covers 2 squares => 31 * 2 = 62

  const blackSquares = (boardSize * boardSize) / 2 - 2; // 32 - 2 = 30
  const whiteSquares = (boardSize * boardSize) / 2; // 32

  // Since we have unequal counts of black and white, can't pair them all with dominos
  return blackSquares === whiteSquares;
}
