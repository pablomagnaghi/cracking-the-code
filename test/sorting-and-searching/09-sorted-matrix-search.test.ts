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
});
