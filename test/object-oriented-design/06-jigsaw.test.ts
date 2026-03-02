import { EdgeType, Edge, Piece, Puzzle } from '../../src/object-oriented-design/06-jigsaw';

describe('Jigsaw Puzzle', () => {
  test('Edge fitsWith checks complementary types and matching ids', () => {
    const inner = new Edge(EdgeType.Inner, 1);
    const outer = new Edge(EdgeType.Outer, 1);
    const outerWrongId = new Edge(EdgeType.Outer, 2);
    const flat1 = new Edge(EdgeType.Flat);
    const flat2 = new Edge(EdgeType.Flat);

    expect(inner.fitsWith(outer)).toBe(true);
    expect(outer.fitsWith(inner)).toBe(true);
    expect(inner.fitsWith(outerWrongId)).toBe(false);
    expect(inner.fitsWith(inner)).toBe(false);
    expect(flat1.fitsWith(flat2)).toBe(true);
  });

  test('Piece identifies corners and borders', () => {
    const flat = new Edge(EdgeType.Flat);
    const inner = new Edge(EdgeType.Inner, 1);
    const outer = new Edge(EdgeType.Outer, 2);

    const corner = new Piece(flat, inner, flat, outer);
    expect(corner.isCorner()).toBe(true);
    expect(corner.isBorder()).toBe(true);

    const border = new Piece(flat, inner, outer, inner);
    expect(border.isCorner()).toBe(false);
    expect(border.isBorder()).toBe(true);

    const center = new Piece(inner, outer, inner, outer);
    expect(center.isCorner()).toBe(false);
    expect(center.isBorder()).toBe(false);
  });

  test('Piece fitsWithLeft and fitsWithTop', () => {
    const e1 = new Edge(EdgeType.Inner, 10);
    const e2 = new Edge(EdgeType.Outer, 10);

    const left = new Piece(
      new Edge(EdgeType.Flat), new Edge(EdgeType.Flat),
      new Edge(EdgeType.Flat), e2 // right = outer
    );
    const right = new Piece(
      new Edge(EdgeType.Flat), new Edge(EdgeType.Flat),
      e1, // left = inner
      new Edge(EdgeType.Flat)
    );

    expect(right.fitsWithLeft(left)).toBe(true);
  });

  /** Helper: create a solvable 2x2 puzzle */
  function make2x2Pieces(): Piece[] {
    // Edge ids for horizontal connections: (0,0)-(0,1) = id 1
    // Edge ids for vertical connections: (0,0)-(1,0) = id 2, (0,1)-(1,1) = id 3
    // Horizontal: (1,0)-(1,1) = id 4
    const flat = () => new Edge(EdgeType.Flat);

    // (0,0): top=flat, bottom=outer(2), left=flat, right=outer(1)
    const p00 = new Piece(flat(), new Edge(EdgeType.Outer, 2), flat(), new Edge(EdgeType.Outer, 1));
    // (0,1): top=flat, bottom=outer(3), left=inner(1), right=flat
    const p01 = new Piece(flat(), new Edge(EdgeType.Outer, 3), new Edge(EdgeType.Inner, 1), flat());
    // (1,0): top=inner(2), bottom=flat, left=flat, right=outer(4)
    const p10 = new Piece(new Edge(EdgeType.Inner, 2), flat(), flat(), new Edge(EdgeType.Outer, 4));
    // (1,1): top=inner(3), bottom=flat, left=inner(4), right=flat
    const p11 = new Piece(new Edge(EdgeType.Inner, 3), flat(), new Edge(EdgeType.Inner, 4), flat());

    return [p00, p01, p10, p11];
  }

  test('Puzzle solves a 2x2 puzzle', () => {
    const pieces = make2x2Pieces();
    const puzzle = new Puzzle(pieces, 2);

    expect(puzzle.solve()).toBe(true);
    expect(puzzle.isSolved()).toBe(true);

    const grid = puzzle.getGrid();
    expect(grid[0][0]).toBeDefined();
    expect(grid[0][1]).toBeDefined();
    expect(grid[1][0]).toBeDefined();
    expect(grid[1][1]).toBeDefined();
  });

  test('Puzzle grid has correct neighbor fits after solve', () => {
    const pieces = make2x2Pieces();
    const puzzle = new Puzzle(pieces, 2);
    puzzle.solve();
    const grid = puzzle.getGrid();

    // Check horizontal fit: (0,0).right fits (0,1).left
    expect(grid[0][1]!.fitsWithLeft(grid[0][0]!)).toBe(true);
    // Check vertical fit: (1,0).top fits (0,0).bottom
    expect(grid[1][0]!.fitsWithTop(grid[0][0]!)).toBe(true);
  });

  test('Puzzle isSolved returns false before solving', () => {
    const pieces = make2x2Pieces();
    const puzzle = new Puzzle(pieces, 2);
    expect(puzzle.isSolved()).toBe(false);
  });

  test('Puzzle solve returns false for impossible puzzle', () => {
    // All pieces have inner edges where flat is needed
    const inner = new Edge(EdgeType.Inner, 1);
    const pieces = [
      new Piece(inner, inner, inner, inner),
      new Piece(inner, inner, inner, inner),
      new Piece(inner, inner, inner, inner),
      new Piece(inner, inner, inner, inner),
    ];
    const puzzle = new Puzzle(pieces, 2);
    expect(puzzle.solve()).toBe(false);
    expect(puzzle.isSolved()).toBe(false);
  });

  test('Puzzle solves a 1x1 puzzle (trivial)', () => {
    const flat = new Edge(EdgeType.Flat);
    const piece = new Piece(flat, flat, flat, flat);
    const puzzle = new Puzzle([piece], 1);
    expect(puzzle.solve()).toBe(true);
    expect(puzzle.isSolved()).toBe(true);
    expect(puzzle.getGrid()[0][0]).toBe(piece);
  });
});
