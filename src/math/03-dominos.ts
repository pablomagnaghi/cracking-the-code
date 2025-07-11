// 6.3. Dominos:
//
// There is an 8x8 chessboard in which two diagonally opposite corners have been removed.
// You are given 31 dominos, and a single domino can cover exactly two squares.
// Can you use the 31 dominos to cover the entire board?
// (No domino can be broken or cut.)

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
