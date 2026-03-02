import {
  PieceType,
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
} from '../../src/testing/03-chess-test';

describe('Pawn', () => {
  test('white pawn can move one square forward (row decreasing)', () => {
    const pawn = new Pawn('white', { row: 6, col: 3 });
    expect(pawn.canMoveTo({ row: 5, col: 3 })).toBe(true);
  });

  test('white pawn at starting position can move two squares forward', () => {
    const pawn = new Pawn('white', { row: 6, col: 3 }, false);
    expect(pawn.canMoveTo({ row: 4, col: 3 })).toBe(true);
  });

  test('white pawn that has moved cannot move two squares forward', () => {
    const pawn = new Pawn('white', { row: 5, col: 3 }, true);
    expect(pawn.canMoveTo({ row: 3, col: 3 })).toBe(false);
  });

  test('pawn can capture diagonally', () => {
    const pawn = new Pawn('white', { row: 4, col: 4 });
    expect(pawn.canMoveTo({ row: 3, col: 5 })).toBe(true);
    expect(pawn.canMoveTo({ row: 3, col: 3 })).toBe(true);
  });

  test('pawn cannot move backward', () => {
    const pawn = new Pawn('white', { row: 4, col: 4 });
    expect(pawn.canMoveTo({ row: 5, col: 4 })).toBe(false);
  });

  test('black pawn moves in opposite direction (row increasing)', () => {
    const pawn = new Pawn('black', { row: 1, col: 3 });
    expect(pawn.canMoveTo({ row: 2, col: 3 })).toBe(true);
    expect(pawn.canMoveTo({ row: 3, col: 3 })).toBe(true); // initial two-square
  });

  test('pawn cannot move sideways', () => {
    const pawn = new Pawn('white', { row: 4, col: 4 });
    expect(pawn.canMoveTo({ row: 4, col: 5 })).toBe(false);
  });
});

describe('Rook', () => {
  test('can move horizontally', () => {
    const rook = new Rook('white', { row: 0, col: 0 });
    expect(rook.canMoveTo({ row: 0, col: 7 })).toBe(true);
  });

  test('can move vertically', () => {
    const rook = new Rook('white', { row: 0, col: 0 });
    expect(rook.canMoveTo({ row: 7, col: 0 })).toBe(true);
  });

  test('cannot move diagonally', () => {
    const rook = new Rook('white', { row: 0, col: 0 });
    expect(rook.canMoveTo({ row: 3, col: 3 })).toBe(false);
  });

  test('cannot stay in place', () => {
    const rook = new Rook('white', { row: 3, col: 3 });
    expect(rook.canMoveTo({ row: 3, col: 3 })).toBe(false);
  });
});

describe('Knight', () => {
  test('can move in L-shape (2 rows, 1 col)', () => {
    const knight = new Knight('white', { row: 4, col: 4 });
    expect(knight.canMoveTo({ row: 6, col: 5 })).toBe(true);
    expect(knight.canMoveTo({ row: 2, col: 3 })).toBe(true);
  });

  test('can move in L-shape (1 row, 2 cols)', () => {
    const knight = new Knight('white', { row: 4, col: 4 });
    expect(knight.canMoveTo({ row: 5, col: 6 })).toBe(true);
    expect(knight.canMoveTo({ row: 3, col: 2 })).toBe(true);
  });

  test('cannot move straight', () => {
    const knight = new Knight('white', { row: 4, col: 4 });
    expect(knight.canMoveTo({ row: 4, col: 6 })).toBe(false);
    expect(knight.canMoveTo({ row: 6, col: 4 })).toBe(false);
  });

  test('cannot move diagonally', () => {
    const knight = new Knight('white', { row: 4, col: 4 });
    expect(knight.canMoveTo({ row: 6, col: 6 })).toBe(false);
  });

  test('cannot move off the board', () => {
    const knight = new Knight('white', { row: 0, col: 0 });
    expect(knight.canMoveTo({ row: -1, col: 2 })).toBe(false);
  });
});

describe('Bishop', () => {
  test('can move diagonally', () => {
    const bishop = new Bishop('white', { row: 2, col: 0 });
    expect(bishop.canMoveTo({ row: 5, col: 3 })).toBe(true);
    expect(bishop.canMoveTo({ row: 0, col: 2 })).toBe(true);
  });

  test('cannot move in a straight line', () => {
    const bishop = new Bishop('white', { row: 3, col: 3 });
    expect(bishop.canMoveTo({ row: 3, col: 7 })).toBe(false);
    expect(bishop.canMoveTo({ row: 7, col: 3 })).toBe(false);
  });

  test('cannot move in a non-diagonal pattern', () => {
    const bishop = new Bishop('white', { row: 3, col: 3 });
    expect(bishop.canMoveTo({ row: 5, col: 4 })).toBe(false);
  });
});

describe('Queen', () => {
  test('can move horizontally', () => {
    const queen = new Queen('white', { row: 3, col: 3 });
    expect(queen.canMoveTo({ row: 3, col: 7 })).toBe(true);
  });

  test('can move vertically', () => {
    const queen = new Queen('white', { row: 3, col: 3 });
    expect(queen.canMoveTo({ row: 7, col: 3 })).toBe(true);
  });

  test('can move diagonally', () => {
    const queen = new Queen('white', { row: 3, col: 3 });
    expect(queen.canMoveTo({ row: 6, col: 6 })).toBe(true);
    expect(queen.canMoveTo({ row: 0, col: 0 })).toBe(true);
  });

  test('cannot move in L-shape like a knight', () => {
    const queen = new Queen('white', { row: 3, col: 3 });
    expect(queen.canMoveTo({ row: 5, col: 4 })).toBe(false);
  });
});

describe('King', () => {
  test('can move one square in any direction', () => {
    const king = new King('white', { row: 4, col: 4 });
    expect(king.canMoveTo({ row: 3, col: 3 })).toBe(true); // diagonal
    expect(king.canMoveTo({ row: 3, col: 4 })).toBe(true); // up
    expect(king.canMoveTo({ row: 4, col: 5 })).toBe(true); // right
    expect(king.canMoveTo({ row: 5, col: 4 })).toBe(true); // down
  });

  test('cannot move more than one square', () => {
    const king = new King('white', { row: 4, col: 4 });
    expect(king.canMoveTo({ row: 6, col: 4 })).toBe(false);
    expect(king.canMoveTo({ row: 4, col: 6 })).toBe(false);
    expect(king.canMoveTo({ row: 6, col: 6 })).toBe(false);
  });

  test('cannot move off the board from a corner', () => {
    const king = new King('white', { row: 0, col: 0 });
    expect(king.canMoveTo({ row: -1, col: 0 })).toBe(false);
    expect(king.canMoveTo({ row: 0, col: -1 })).toBe(false);
  });
});

describe('ChessPiece common behavior', () => {
  test('no piece can move off the board', () => {
    const rook = new Rook('white', { row: 0, col: 0 });
    expect(rook.canMoveTo({ row: -1, col: 0 })).toBe(false);
    expect(rook.canMoveTo({ row: 0, col: 8 })).toBe(false);
  });

  test('no piece can stay in the same position', () => {
    const queen = new Queen('black', { row: 4, col: 4 });
    expect(queen.canMoveTo({ row: 4, col: 4 })).toBe(false);
  });

  test('pieces have correct type assigned', () => {
    expect(new Pawn('white', { row: 6, col: 0 }).type).toBe(PieceType.Pawn);
    expect(new Rook('white', { row: 0, col: 0 }).type).toBe(PieceType.Rook);
    expect(new Knight('white', { row: 0, col: 1 }).type).toBe(PieceType.Knight);
    expect(new Bishop('white', { row: 0, col: 2 }).type).toBe(PieceType.Bishop);
    expect(new Queen('white', { row: 0, col: 3 }).type).toBe(PieceType.Queen);
    expect(new King('white', { row: 0, col: 4 }).type).toBe(PieceType.King);
  });
});
