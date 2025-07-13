import { robotInAGrid } from '../../src/recursion-and-dp/02-robot-in-a-grid';

function isValidPath(grid: boolean[][], path: [number, number][]): boolean {
  if (path.length === 0) return false;

  const [startRow, startCol] = path[0];
  const [endRow, endCol] = path[path.length - 1];

  // Must start at (0, 0) and end at bottom-right
  if (startRow !== 0 || startCol !== 0) return false;
  if (endRow !== grid.length - 1 || endCol !== grid[0].length - 1) return false;

  for (let i = 0; i < path.length; i++) {
    const [row, col] = path[i];

    if (!grid[row]?.[col]) return false;

    if (i > 0) {
      const [prevRow, prevCol] = path[i - 1];
      const dr = row - prevRow;
      const dc = col - prevCol;
      if (!((dr === 1 && dc === 0) || (dr === 0 && dc === 1))) return false;
    }
  }

  return true;
}

describe('robotInAGrid', () => {
  test('returns correct path for a simple 2x2 grid with no obstacles', () => {
    const grid = [
      [true, true],
      [true, true],
    ];
    const path = robotInAGrid(grid);
    expect(path).not.toBe(false);
    expect(isValidPath(grid, path as [number, number][])).toBe(true);
  });

  test('returns false if start is blocked', () => {
    const grid = [
      [false, true],
      [true, true],
    ];
    expect(robotInAGrid(grid)).toBe(false);
  });

  test('returns false if destination is blocked', () => {
    const grid = [
      [true, true],
      [true, false],
    ];
    expect(robotInAGrid(grid)).toBe(false);
  });

  test('returns false if there is no path', () => {
    const grid = [
      [true, false],
      [false, true],
    ];
    expect(robotInAGrid(grid)).toBe(false);
  });

  test('returns correct path for a 3x3 grid with a valid path', () => {
    const grid = [
      [true, true, false],
      [true, false, true],
      [true, true, true],
    ];
    expect(robotInAGrid(grid)).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
      [2, 2],
    ]);
  });

  test('returns a valid path for a 4x4 grid', () => {
    const grid = [
      [true, true, true, false],
      [true, false, true, true],
      [true, true, false, false],
      [false, true, true, true],
    ];

    const path = robotInAGrid(grid);
    expect(path).not.toBe(false);
    expect(isValidPath(grid, path as [number, number][])).toBe(true);
  });

  test('returns false on fully blocked grid', () => {
    const grid = [
      [true, false, false],
      [false, false, false],
      [false, false, true],
    ];
    expect(robotInAGrid(grid)).toBe(false);
  });
});
