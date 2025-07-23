import { maxBlackBorderSquare } from '../../src/hard-exercises/23-max-square-matrix';

describe('maxBlackBorderSquare', () => {
  test('returns largest black border subsquare', () => {
    const matrix = [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
    ];
    expect(maxBlackBorderSquare(matrix)).toEqual([0, 0, 4]);
  });

  test('returns smaller subsquare if no bigger one', () => {
    const matrix = [
      [0, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 0, 1],
      [1, 1, 1, 1],
    ];
    expect(maxBlackBorderSquare(matrix)).toEqual([1, 1, 3]);
  });

  test('returns empty array if no black border subsquare', () => {
    const matrix = [
      [0, 0],
      [0, 0],
    ];
    expect(maxBlackBorderSquare(matrix)).toEqual([]);
  });

  test('handles empty matrix', () => {
    expect(maxBlackBorderSquare([])).toEqual([]);
  });

  test('returns the smallest top-left square when multiple same size exist', () => {
    const matrix = [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 1],
    ];
    expect(maxBlackBorderSquare(matrix)).toEqual([0, 0, 2]);
  });
});
