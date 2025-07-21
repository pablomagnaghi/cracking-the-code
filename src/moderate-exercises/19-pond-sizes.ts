// 16.19 Pond Sizes
//
// Problem:
// Given a 2D matrix representing land elevations where 0 represents water,
// find the sizes of all ponds. A pond is a group of connected water cells
// (connected vertically, horizontally, and diagonally).
//
// Approach:
// Use DFS to explore each water cell and count all connected water cells.
// Mark visited cells to avoid counting multiple times.

export function pondSizes(land: number[][]): number[] {
  const rows = land.length;
  const cols = rows > 0 ? land[0].length : 0;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const results: number[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (land[r][c] === 0 && !visited[r][c]) {
        const size = dfs(land, visited, r, c);
        results.push(size);
      }
    }
  }

  return results.sort((a, b) => a - b);
}

function dfs(land: number[][], visited: boolean[][], row: number, col: number): number {
  const rows = land.length;
  const cols = land[0].length;

  // Check boundaries and if cell is water and not visited
  if (row < 0 || row >= rows || col < 0 || col >= cols) return 0;
  if (visited[row][col] || land[row][col] !== 0) return 0;

  visited[row][col] = true;

  let size = 1; // current cell

  // Explore all 8 neighbors (vertical, horizontal, diagonal)
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr !== 0 || dc !== 0) {
        size += dfs(land, visited, row + dr, col + dc);
      }
    }
  }

  return size;
}
