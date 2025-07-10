import { Matrix, rotateMatrix } from '../../src/arrays-and-strings/07-rotate-matrix';

describe('rotateMatrix function', () => {
  test('correctly rotates a 3x3 matrix clockwise', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const expected = [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ];
    rotateMatrix(matrix);
    expect(matrix).toEqual(expected);
  });

  test('returns the same matrix when rotating a 1x1 matrix', () => {
    const input: Matrix = [[42]];

    rotateMatrix(input);
    expect(input).toEqual([[42]]);
  });

  test('correctly rotates a 2x2 matrix clockwise', () => {
    const input: Matrix = [
      [1, 2],
      [3, 4],
    ];

    const expected: Matrix = [
      [3, 1],
      [4, 2],
    ];
    rotateMatrix(input);
    expect(input).toEqual(expected);
  });

  test('throws an error when input matrix is empty', () => {
    const input: Matrix = [];

    expect(() => rotateMatrix(input)).toThrow('Matrix must be square');
  });

  test('throws an error when input matrix rows have different lengths (non-square)', () => {
    // Non-square matrix (2 rows, 3 columns)
    const input = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(() => rotateMatrix(input)).toThrow('Matrix must be square');
  });

  test('throws an error when input matrix has empty rows', () => {
    const input = [[], []];

    expect(() => rotateMatrix(input)).toThrow('Matrix must be square');
  });
});
