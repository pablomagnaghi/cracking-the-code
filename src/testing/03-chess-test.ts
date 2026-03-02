// 11.03. Chess Test
//
// We have the following method: boolean canMoveTo(int x, int y).
// This method is part of the Piece class and returns whether or not the
// piece can move to position (x, y). Explain how you would test this method.
//
// Approach:
//   Implement a chess Piece class hierarchy with canMoveTo for each piece type.
//   Testing should cover:
//   - Valid moves for each piece type.
//   - Invalid moves (off-board, blocked path, same position).
//   - Edge cases: pawns at starting position (can move 2), pawns at edges,
//     knights wrapping around the board.
//   - Boundary conditions: corners, edges of the board.
//
// Example:
//   const knight = new Knight('white', { row: 4, col: 4 });
//   knight.canMoveTo({ row: 6, col: 5 }) => true  (L-shape)
//   knight.canMoveTo({ row: 5, col: 5 }) => false  (not L-shape)
//
// Constraints:
//   - Board is 8x8, rows and cols are 0-7.
//   - Pieces have a color ('white' or 'black') and a position.
//   - canMoveTo only checks if the move pattern is valid for the piece type
//     and within board bounds (does not check for blocking pieces).

export enum PieceType {
  Pawn = 'PAWN',
  Rook = 'ROOK',
  Knight = 'KNIGHT',
  Bishop = 'BISHOP',
  Queen = 'QUEEN',
  King = 'KING',
}

export type Color = 'white' | 'black';

export interface Position {
  row: number; // 0-7
  col: number; // 0-7
}

function isOnBoard(pos: Position): boolean {
  return pos.row >= 0 && pos.row <= 7 && pos.col >= 0 && pos.col <= 7;
}

export abstract class ChessPiece {
  readonly type: PieceType;
  readonly color: Color;
  position: Position;

  constructor(type: PieceType, color: Color, position: Position) {
    this.type = type;
    this.color = color;
    this.position = position;
  }

  /**
   * Returns whether the piece can move to the given position.
   * Checks board bounds and piece-specific movement rules.
   * Does not account for blocking pieces on the board.
   */
  canMoveTo(target: Position): boolean {
    // Cannot move off the board
    if (!isOnBoard(target)) return false;

    // Cannot stay in the same position
    if (target.row === this.position.row && target.col === this.position.col) {
      return false;
    }

    return this.isValidMove(target);
  }

  protected abstract isValidMove(target: Position): boolean;
}

export class Pawn extends ChessPiece {
  private hasMoved: boolean;

  constructor(color: Color, position: Position, hasMoved: boolean = false) {
    super(PieceType.Pawn, color, position);
    this.hasMoved = hasMoved;
  }

  protected isValidMove(target: Position): boolean {
    const direction = this.color === 'white' ? -1 : 1; // white moves up (row decreasing)
    const rowDiff = target.row - this.position.row;
    const colDiff = Math.abs(target.col - this.position.col);

    // Standard one-square forward move
    if (colDiff === 0 && rowDiff === direction) {
      return true;
    }

    // Initial two-square forward move
    if (colDiff === 0 && rowDiff === 2 * direction && !this.hasMoved) {
      return true;
    }

    // Diagonal capture (one square diagonally forward)
    if (colDiff === 1 && rowDiff === direction) {
      return true;
    }

    return false;
  }
}

export class Rook extends ChessPiece {
  constructor(color: Color, position: Position) {
    super(PieceType.Rook, color, position);
  }

  protected isValidMove(target: Position): boolean {
    // Rooks move along rows or columns
    return (
      target.row === this.position.row || target.col === this.position.col
    );
  }
}

export class Knight extends ChessPiece {
  constructor(color: Color, position: Position) {
    super(PieceType.Knight, color, position);
  }

  protected isValidMove(target: Position): boolean {
    const rowDiff = Math.abs(target.row - this.position.row);
    const colDiff = Math.abs(target.col - this.position.col);

    // Knights move in an L-shape: 2+1 or 1+2
    return (
      (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)
    );
  }
}

export class Bishop extends ChessPiece {
  constructor(color: Color, position: Position) {
    super(PieceType.Bishop, color, position);
  }

  protected isValidMove(target: Position): boolean {
    const rowDiff = Math.abs(target.row - this.position.row);
    const colDiff = Math.abs(target.col - this.position.col);

    // Bishops move diagonally: equal row and column distance
    return rowDiff === colDiff;
  }
}

export class Queen extends ChessPiece {
  constructor(color: Color, position: Position) {
    super(PieceType.Queen, color, position);
  }

  protected isValidMove(target: Position): boolean {
    const rowDiff = Math.abs(target.row - this.position.row);
    const colDiff = Math.abs(target.col - this.position.col);

    // Queen combines rook (straight) and bishop (diagonal) movement
    const isStraight =
      target.row === this.position.row || target.col === this.position.col;
    const isDiagonal = rowDiff === colDiff;

    return isStraight || isDiagonal;
  }
}

export class King extends ChessPiece {
  constructor(color: Color, position: Position) {
    super(PieceType.King, color, position);
  }

  protected isValidMove(target: Position): boolean {
    const rowDiff = Math.abs(target.row - this.position.row);
    const colDiff = Math.abs(target.col - this.position.col);

    // King moves one square in any direction
    return rowDiff <= 1 && colDiff <= 1;
  }
}
