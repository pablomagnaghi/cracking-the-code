import { searchSortedMatrix } from '../../src/sorting-and-searching/09-sorted-matrix-search';

describe('searchSortedMatrix', () => {
  const matrix = [
    [1, 4, 7, 11],
    [2, 5, 8, 12],
    [3, 6, 9, 16],
    [10, 13, 14, 17],
  ];

  test('finds existing element in matrix', () => {
    expect(searchSortedMatrix(matrix, 5)).toBe(true);
    expect(searchSortedMatrix(matrix, 14)).toBe(true);
    expect(searchSortedMatrix(matrix, 1)).toBe(true);
    expect(searchSortedMatrix(matrix, 17)).toBe(true);
  });

  test('returns false if element does not exist', () => {
    expect(searchSortedMatrix(matrix, 0)).toBe(false);
    expect(searchSortedMatrix(matrix, 15)).toBe(false);
    expect(searchSortedMatrix(matrix, 20)).toBe(false);
  });

  test('handles empty matrix', () => {
    expect(searchSortedMatrix([], 1)).toBe(false);
    expect(searchSortedMatrix([[]], 1)).toBe(false);
  });

  test('finds element in LCCI 5x5 matrix example', () => {
    const m = [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ];
    expect(searchSortedMatrix(m, 5)).toBe(true);
    expect(searchSortedMatrix(m, 20)).toBe(false);
  });

  test('works with single-element matrix', () => {
    expect(searchSortedMatrix([[42]], 42)).toBe(true);
    expect(searchSortedMatrix([[42]], 7)).toBe(false);
  });
});
