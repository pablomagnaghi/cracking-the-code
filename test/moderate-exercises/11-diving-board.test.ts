import { divingBoard } from '../../src/moderate-exercises/11-diving-board';

describe('divingBoard', () => {
  test('returns all possible lengths with different shorter and longer values', () => {
    expect(divingBoard(1, 2, 3)).toEqual([3, 4, 5, 6]);
    expect(divingBoard(2, 5, 2)).toEqual([4, 7, 10]);
  });

  test('returns a single value when shorter and longer are the same', () => {
    expect(divingBoard(3, 3, 4)).toEqual([12]); // Only one possibility: 4 * 3
  });

  test('returns empty array when k is 0', () => {
    expect(divingBoard(1, 2, 0)).toEqual([]);
  });

  test('returns correct values when shorter is greater than longer', () => {
    expect(divingBoard(5, 2, 2)).toEqual([4, 7, 10]); // Handles shorter > longer correctly
  });

  test('returns correct values for 1 plank', () => {
    expect(divingBoard(1, 3, 1)).toEqual([1, 3]);
  });

  test('returns correct values for larger k', () => {
    expect(divingBoard(1, 2, 5)).toEqual([5, 6, 7, 8, 9, 10]);
  });

  test('returns two values for k=1 with different lengths', () => {
    expect(divingBoard(4, 10, 1)).toEqual([4, 10]);
  });

  test('returns k+1 values for k=2', () => {
    expect(divingBoard(1, 3, 2)).toEqual([2, 4, 6]);
  });
});
