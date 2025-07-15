import { sortedSearchNoSize } from '../../src/sorting-and-searching/04-sorted-search-no-size';

// Mock implementation of Listy interface
class MockListy {
  private data: number[];

  constructor(data: number[]) {
    this.data = data;
  }

  elementAt(index: number): number {
    if (index < 0 || index >= this.data.length) return -1;
    return this.data[index];
  }
}

describe('sortedSearchNoSize', () => {
  it('should find the target index in Listy', () => {
    const listy = new MockListy([1, 3, 5, 7, 9, 12, 15, 20, 20, 25]);
    expect(sortedSearchNoSize(listy, 20)).toBe(7);
  });

  it('should return -1 when target is not found', () => {
    const listy = new MockListy([1, 3, 5, 7, 9, 12, 15, 20, 20, 25]);
    expect(sortedSearchNoSize(listy, 8)).toBe(-1);
  });

  it('should return the first occurrence of duplicates', () => {
    const listy = new MockListy([2, 4, 4, 4, 6, 8, 10]);
    expect(sortedSearchNoSize(listy, 4)).toBe(1);
  });

  it('should work with single-element Listy', () => {
    let listy = new MockListy([5]);
    expect(sortedSearchNoSize(listy, 5)).toBe(0);
    expect(sortedSearchNoSize(listy, 1)).toBe(-1);
  });

  it('should return -1 for empty Listy', () => {
    const listy = new MockListy([]);
    expect(sortedSearchNoSize(listy, 10)).toBe(-1);
  });

  it('should handle target less than all elements', () => {
    const listy = new MockListy([10, 20, 30]);
    expect(sortedSearchNoSize(listy, 5)).toBe(-1);
  });

  it('should handle target greater than all elements', () => {
    const listy = new MockListy([10, 20, 30]);
    expect(sortedSearchNoSize(listy, 40)).toBe(-1);
  });
});
