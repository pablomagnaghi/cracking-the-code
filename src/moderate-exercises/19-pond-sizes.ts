// LCCI 16.19. Pond Sizes
//
// You have an integer matrix representing a plot of land, where the value at
// that location represents the height above sea level. A value of zero indicates
// water. A pond is a region of water connected vertically, horizontally, or
// diagonally. The size of a pond is the total number of connected water cells.
// Write a method to compute the sizes of all ponds in the matrix.
//
// Example:
//   Input:
//     [[0,2,1,0],
//      [0,1,0,1],
//      [1,1,0,1],
//      [0,1,0,1]]
//   Output: [1, 2, 4]
//
// Constraints:
//   - 0 < len(land) <= 1000
//   - 0 < len(land[i]) <= 1000

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
