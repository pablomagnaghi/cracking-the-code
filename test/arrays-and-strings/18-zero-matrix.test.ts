import { Matrix, zeroMatrix } from "../../src/arrays-and-strings/18-zero-matrix";

describe('zeroMatrix', () => {
  test('should zero out row and column when a 0 is found', () => {
    const input: Matrix = [
      [1, 2, 3],
      [4, 0, 6],
      [7, 8, 9],
    ];

    const expected: Matrix = [
      [1, 0, 3],
      [0, 0, 0],
      [7, 0, 9],
    ];

    expect(zeroMatrix(input)).toEqual(expected);
  });

  test('should return same matrix if no zero exists', () => {
    const input: Matrix = [
      [1, 2],
      [3, 4],
    ];

    const expected: Matrix = [
      [1, 2],
      [3, 4],
    ];

    expect(zeroMatrix(input)).toEqual(expected);
  });

  test('should handle multiple zeros', () => {
    const input: Matrix = [
      [0, 2, 3],
      [4, 5, 6],
      [7, 8, 0],
    ];

    const expected: Matrix = [
      [0, 0, 0],
      [0, 5, 0],
      [0, 0, 0],
    ];

    expect(zeroMatrix(input)).toEqual(expected);
  });

  test('should handle 1x1 matrix with zero', () => {
    const input: Matrix = [[0]];
    const expected: Matrix = [[0]];

    expect(zeroMatrix(input)).toEqual(expected);
  });

  test('should handle 1x1 matrix without zero', () => {
    const input: Matrix = [[5]];
    const expected: Matrix = [[5]];

    expect(zeroMatrix(input)).toEqual(expected);
  });

  test('should return empty matrix as is', () => {
    const input: Matrix = [];
    const expected: Matrix = [];

    expect(zeroMatrix(input)).toEqual(expected);
  });
});
