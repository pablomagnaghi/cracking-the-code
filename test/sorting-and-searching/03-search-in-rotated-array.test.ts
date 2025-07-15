import { searchRotatedArray } from '../../src/sorting-and-searching/03-search-in-rotated-array';

describe('searchRotatedArray', () => {
  it('should find the target in a rotated array', () => {
    const arr = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14];
    const target = 5;
    expect(searchRotatedArray(arr, target)).toBe(8);
  });

  it('should return -1 if target is not found', () => {
    const arr = [6, 7, 8, 9, 1, 2, 3, 4, 5];
    const target = 10;
    expect(searchRotatedArray(arr, target)).toBe(-1);
  });

  it('should work when array is not rotated', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const target = 4;
    expect(searchRotatedArray(arr, target)).toBe(3);
  });

  it('should work when target is at the beginning', () => {
    const arr = [6, 7, 8, 1, 2, 3, 4, 5];
    const target = 6;
    expect(searchRotatedArray(arr, target)).toBe(0);
  });

  it('should work when target is at the end', () => {
    const arr = [6, 7, 1, 2, 3, 4, 5];
    const target = 5;
    expect(searchRotatedArray(arr, target)).toBe(6);
  });

  it('should handle single-element array', () => {
    expect(searchRotatedArray([3], 3)).toBe(0);
    expect(searchRotatedArray([3], 1)).toBe(-1);
  });

  it('should handle empty array', () => {
    expect(searchRotatedArray([], 10)).toBe(-1);
  });
});
