// 7. *Rotate Matrix*:

// Given an image represented by an NxN matrix, where each pixel in the image is 4
// bytes, write a method to rotate the image by 90 degrees. Can you do this in place?

export type Matrix = number[][]

export function rotateMatrix (matrix: Matrix) {
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