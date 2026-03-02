// LCCI 01.07. Rotate Matrix
//
// Given an image represented by an NxN matrix, where each pixel in the image is 4
// bytes, write a method to rotate the image by 90 degrees. Can you do this in place?
//
// Example 1:
//   Input: [[1,2,3],[4,5,6],[7,8,9]]
//   Output: [[7,4,1],[8,5,2],[9,6,3]]
//
// Example 2:
//   Input: [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
//   Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

export type Matrix = number[][];

export function rotateMatrix(matrix: Matrix) {
  const matrixSize = matrix.length;

  if (matrixSize === 0 || matrix[0].length !== matrixSize) {
    throw new Error('Matrix must be square');
  }

  for (let layer = 0; layer < Math.floor(matrixSize / 2); layer++) {
    const firstIndex = layer;
    const lastIndex = matrixSize - 1 - layer;

    for (let currentIndex = firstIndex; currentIndex < lastIndex; currentIndex++) {
      const offset = currentIndex - firstIndex;

      const topElement = matrix[firstIndex][currentIndex];

      matrix[firstIndex][currentIndex] = matrix[lastIndex - offset][firstIndex];
      matrix[lastIndex - offset][firstIndex] = matrix[lastIndex][lastIndex - offset];
      matrix[lastIndex][lastIndex - offset] = matrix[currentIndex][lastIndex];
      matrix[currentIndex][lastIndex] = topElement;
    }
  }
}
