// 2. *Robot in a Grid*:

// Imagine a robot sitting on the upper left corner of a grid with r rows and c columns.
// The robot can only move in two directions, right and down, but certain cells are
// "off limits" such that the robot cannot step on them.
// Design an algorithm to find a path for the robot from the top left to the bottom right.

type Grid = boolean[][];
type Path = Array<[number, number]>;

export function robotInAGrid(grid: Grid): Path | false {
  const path: Path = [];
  const failedPoints = new Set<string>();

  if (findPath(grid, 0, 0, path, failedPoints)) {
    return path.reverse(); // collected from end to start
  }

  return false;
}

function findPath(
  grid: Grid,
  row: number,
  col: number,
  path: Path,
  failedPoints: Set<string>
): boolean {
  if (!isValidCell(grid, row, col)) return false;

  const pointKey = `${row},${col}`;
  if (failedPoints.has(pointKey)) return false;

  const isAtDestination = row === grid.length - 1 && col === grid[0].length - 1;

  if (
    isAtDestination ||
    findPath(grid, row + 1, col, path, failedPoints) ||
    findPath(grid, row, col + 1, path, failedPoints)
  ) {
    path.push([row, col]);
    return true;
  }

  failedPoints.add(pointKey);
  return false;
}

function isValidCell(grid: Grid, row: number, col: number): boolean {
  return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length && grid[row][col];
}
