// 8. *Zero Matrix*:

// Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to 0.

export type Matrix = number[][];

export function zeroMatrix(matrix: Matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return matrix;

  const rowsToZero = new Set<number>();
  const colsToZero = new Set<number>();

  const rowCount = matrix.length;
  const colCount = matrix[0].length;

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      if (matrix[row][col] === 0) {
        rowsToZero.add(row);
        colsToZero.add(col);
      }
    }
  }

  for (const row of rowsToZero) {
    for (let col = 0; col < colCount; col++) {
      matrix[row][col] = 0;
    }
  }

  for (const col of colsToZero) {
    for (let row = 0; row < rowCount; row++) {
      matrix[row][col] = 0;
    }
  }

  return matrix;
}
