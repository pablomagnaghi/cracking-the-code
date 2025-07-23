import { maxSubmatrix } from '../../src/hard-exercises/24-max-submatrix';

describe('maxSubmatrix', () => {
  test('finds max submatrix in positive and negative matrix', () => {
    const matrix = [
      [1, -2, -1, 4],
      [-8, 3, 4, 2],
      [3, 8, 10, -8],
      [-4, -1, 1, 7],
    ];
    expect(maxSubmatrix(matrix)).toEqual([0, 1, 3, 3]);
  });

  test('handles single element matrix', () => {
    const matrix = [[-5]];
    expect(maxSubmatrix(matrix)).toEqual([0, 0, 0, 0]);
  });

  test('handles all negative matrix', () => {
    const matrix = [
      [-3, -4],
      [-1, -2],
    ];
    // Max sum is the largest single element: -1 at (1,0)
    expect(maxSubmatrix(matrix)).toEqual([1, 0, 1, 0]);
  });

  test('handles all positive matrix', () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    // Entire matrix sum = 10
    expect(maxSubmatrix(matrix)).toEqual([0, 0, 1, 1]);
  });

  test('returns one of the max submatrices if multiple exist', () => {
    const matrix = [
      [0, -2, 3],
      [1, -1, 2],
      [1, 1, -1],
    ];
    // Several submatrices have max sum 5, one is (0,2)-(1,2)
    // [[3],
    //  [2]]
    expect(maxSubmatrix(matrix)).toEqual([0, 2, 1, 2]);
  });
});
