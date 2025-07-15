import { sparseSearch } from '../../src/sorting-and-searching/05-sparse-search';

describe('sparseSearch', () => {
  it('should find the target in a sparse array', () => {
    const arr = ['at', '', '', '', 'ball', '', '', 'car', '', '', 'dad', '', ''];
    expect(sparseSearch(arr, 'ball')).toBe(4);
    expect(sparseSearch(arr, 'at')).toBe(0);
    expect(sparseSearch(arr, 'car')).toBe(7);
    expect(sparseSearch(arr, 'dad')).toBe(10);
  });

  it('should return -1 if target is not found', () => {
    const arr = ['at', '', '', '', 'ball', '', '', 'car', '', '', 'dad', '', ''];
    expect(sparseSearch(arr, 'cat')).toBe(-1);
    expect(sparseSearch(arr, 'dog')).toBe(-1);
  });

  it('should handle empty strings and return -1 for empty target', () => {
    const arr = ['', '', '', ''];
    expect(sparseSearch(arr, 'anything')).toBe(-1);
    expect(sparseSearch(arr, '')).toBe(-1);
  });

  it('should work with array with no empty strings', () => {
    const arr = ['apple', 'banana', 'carrot', 'date'];
    expect(sparseSearch(arr, 'banana')).toBe(1);
    expect(sparseSearch(arr, 'date')).toBe(3);
    expect(sparseSearch(arr, 'apple')).toBe(0);
  });

  it('should return -1 for empty array', () => {
    expect(sparseSearch([], 'ball')).toBe(-1);
  });

  it('should work when target is the only string', () => {
    const arr = ['', '', 'target', '', ''];
    expect(sparseSearch(arr, 'target')).toBe(2);
  });
});
