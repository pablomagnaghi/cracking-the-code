// LCCI 17.23. Max Black Square
//
// Imagine you have a square matrix, where each cell (pixel) is either filled
// (1) or empty (0). Design an algorithm to find the maximum subsquare such
// that all four borders are filled with 1s.
//
// Return an array [r, c, size], where r, c are the row number and the column
// number of the subsquare's upper left corner respectively, and size is the
// side length. If there are more than one answers, return the one that has
// the smallest r. If there are still more than one, return the one that has
// the smallest c. If no answer, return an empty array.
//
// Note: This implementation uses 1 as "black" (filled), which is inverted
// from the original LCCI problem that uses 0 as black.
//
// Constraints:
//   - matrix.length == matrix[0].length <= 200

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
