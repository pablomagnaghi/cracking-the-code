// 17.23. Max Square Matrix
//
// Given a square matrix of 0/1 (white/black), find the largest subsquare whose border is all black pixels.
// Return [row, col, size] for the top-left corner and side length. Return [] if none found.

export function maxBlackBorderSquare(matrix: number[][]): [number, number, number] | [] {
  if (matrix.length === 0 || matrix[0].length === 0) return [];

  const n = matrix.length;
  // Precompute horizontal and vertical black counts
  const hor = Array.from({ length: n }, () => Array(n).fill(0));
  const ver = Array.from({ length: n }, () => Array(n).fill(0));

  for (let r = n - 1; r >= 0; r--) {
    for (let c = n - 1; c >= 0; c--) {
      if (matrix[r][c] === 1) {
        hor[r][c] = (c + 1 < n ? hor[r][c + 1] : 0) + 1;
        ver[r][c] = (r + 1 < n ? ver[r + 1][c] : 0) + 1;
      }
    }
  }

  // Start from largest possible size, decrease
  for (let size = n; size > 0; size--) {
    for (let r = 0; r <= n - size; r++) {
      for (let c = 0; c <= n - size; c++) {
        if (
          hor[r][c] >= size && // top row
          ver[r][c] >= size && // left col
          hor[r + size - 1][c] >= size && // bottom row
          ver[r][c + size - 1] >= size // right col
        ) {
          return [r, c, size];
        }
      }
    }
  }

  return [];
}
