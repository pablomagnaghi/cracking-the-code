// 17.24 Max Submatrix
//
// Problem:
// Given an NxN matrix of positive and negative integers, write code to find the submatrix
// with the largest possible sum.
//
// Return an array [r1, c1, r2, c2], where r1, c1 are the row number and the column number
// of the submatrix's upper left corner respectively, and r2, c2 are the row number and
// the column number of the lower right corner.
// If there are more than one answers, return any one of them.

export function maxSubmatrix(matrix: number[][]): [number, number, number, number] {
  const n = matrix.length;
  let maxSum = -Infinity;
  let result: [number, number, number, number] = [0, 0, 0, 0];

  for (let top = 0; top < n; top++) {
    // Create a temp array to store column sums between rows top and bottom
    const colSum = new Array(n).fill(0);

    for (let bottom = top; bottom < n; bottom++) {
      // Add current row to colSum
      for (let col = 0; col < n; col++) {
        colSum[col] += matrix[bottom][col];
      }

      // Apply Kadane's on colSum to find max subarray
      const { maxSubSum, start, end } = kadaneWithIndices(colSum);

      if (maxSubSum > maxSum) {
        maxSum = maxSubSum;
        result = [top, start, bottom, end];
      }
    }
  }

  return result;
}

// Kadane's algorithm with start/end indices for max subarray in 1D array
function kadaneWithIndices(arr: number[]): { maxSubSum: number; start: number; end: number } {
  let maxSum = -Infinity;
  let currentSum = 0;
  let start = 0;
  let maxStart = 0;
  let maxEnd = 0;

  for (let i = 0; i < arr.length; i++) {
    currentSum += arr[i];
    if (currentSum > maxSum) {
      maxSum = currentSum;
      maxStart = start;
      maxEnd = i;
    }
    if (currentSum < 0) {
      currentSum = 0;
      start = i + 1;
    }
  }

  return { maxSubSum: maxSum, start: maxStart, end: maxEnd };
}
