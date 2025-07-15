// 10.9. Sorted Matrix Search
//
// Given an MxN matrix where each row and each column is sorted in ascending order,
// write a function to find whether a target value exists in the matrix.
// Return true if found, otherwise false.

export function searchSortedMatrix(matrix: number[][], target: number): boolean {
  if (matrix.length === 0 || matrix[0].length === 0) return false;

  let row = 0;
  let col = matrix[0].length - 1;

  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] > target) {
      col--;
    } else {
      row++;
    }
  }

  return false;
}
