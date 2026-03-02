// 07.06. Jigsaw
//
// Implement an NxN jigsaw puzzle. Design the data structures and explain an
// algorithm to solve the puzzle. You can assume that you have a fitsWith
// method on each piece which, when passed another piece, returns true if the
// two pieces fit together.
//
// Approach:
//   - EdgeType enum: Flat, Inner, Outer. Two edges fit if one is Inner and
//     the other is Outer, or both are Flat (border case for adjacent borders
//     is not valid — flat only matches flat for the puzzle boundary concept,
//     but for fitting we check inner/outer complementarity).
//   - An Edge has an EdgeType and an id. Two edges fit if their types are
//     complementary (inner+outer) and they share the same id.
//   - A Piece has four edges: top, bottom, left, right.
//   - The Puzzle class takes a flat list of pieces and solves the NxN grid
//     using backtracking. It places pieces row by row, left to right,
//     ensuring each piece fits with its left neighbor (if any) and top
//     neighbor (if any).
//
// Example:
//   const puzzle = new Puzzle(pieces, 3); // 3x3
//   puzzle.solve(); // arranges pieces into the grid
//
// Constraints:
//   - Puzzle is NxN.
//   - Border pieces have Flat edges on the appropriate sides.
//   - Each edge id is unique to a matching pair.

export enum EdgeType {
  Flat,
  Inner,
  Outer,
}

export class Edge {
  readonly type: EdgeType;
  readonly id: number; // matching edges share an id

  constructor(type: EdgeType, id: number = -1) {
    this.type = type;
    this.id = id;
  }

  fitsWith(other: Edge): boolean {
    if (this.type === EdgeType.Flat && other.type === EdgeType.Flat) {
      return true; // both border edges
    }
    if (
      (this.type === EdgeType.Inner && other.type === EdgeType.Outer) ||
      (this.type === EdgeType.Outer && other.type === EdgeType.Inner)
    ) {
      return this.id === other.id;
    }
    return false;
  }
}

export class Piece {
  readonly top: Edge;
  readonly bottom: Edge;
  readonly left: Edge;
  readonly right: Edge;

  constructor(top: Edge, bottom: Edge, left: Edge, right: Edge) {
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
  }

  isCorner(): boolean {
    const flatCount = [this.top, this.bottom, this.left, this.right].filter(
      (e) => e.type === EdgeType.Flat
    ).length;
    return flatCount === 2;
  }

  isBorder(): boolean {
    return [this.top, this.bottom, this.left, this.right].some(
      (e) => e.type === EdgeType.Flat
    );
  }

  fitsWithLeft(other: Piece): boolean {
    return this.left.fitsWith(other.right);
  }

  fitsWithTop(other: Piece): boolean {
    return this.top.fitsWith(other.bottom);
  }
}

export class Puzzle {
  private pieces: Piece[];
  private size: number;
  private grid: (Piece | undefined)[][];

  constructor(pieces: Piece[], size: number) {
    this.pieces = pieces;
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(undefined));
  }

  solve(): boolean {
    const remaining = new Set(this.pieces);
    return this.solveHelper(0, 0, remaining);
  }

  private solveHelper(row: number, col: number, remaining: Set<Piece>): boolean {
    if (row === this.size) return true; // all rows filled

    const nextCol = col + 1 < this.size ? col + 1 : 0;
    const nextRow = col + 1 < this.size ? row : row + 1;

    for (const piece of remaining) {
      if (this.canPlace(piece, row, col)) {
        this.grid[row][col] = piece;
        remaining.delete(piece);

        if (this.solveHelper(nextRow, nextCol, remaining)) {
          return true;
        }

        this.grid[row][col] = undefined;
        remaining.add(piece);
      }
    }

    return false;
  }

  private canPlace(piece: Piece, row: number, col: number): boolean {
    // Check top edge
    if (row === 0) {
      if (piece.top.type !== EdgeType.Flat) return false;
    } else {
      const above = this.grid[row - 1][col]!;
      if (!piece.fitsWithTop(above)) return false;
    }

    // Check left edge
    if (col === 0) {
      if (piece.left.type !== EdgeType.Flat) return false;
    } else {
      const left = this.grid[row][col - 1]!;
      if (!piece.fitsWithLeft(left)) return false;
    }

    // Check bottom border
    if (row === this.size - 1) {
      if (piece.bottom.type !== EdgeType.Flat) return false;
    }

    // Check right border
    if (col === this.size - 1) {
      if (piece.right.type !== EdgeType.Flat) return false;
    }

    return true;
  }

  getGrid(): (Piece | undefined)[][] {
    return this.grid.map((row) => [...row]);
  }

  isSolved(): boolean {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (!this.grid[r][c]) return false;
      }
    }
    return true;
  }
}
