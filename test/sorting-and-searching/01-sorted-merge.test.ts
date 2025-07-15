import { sortedMerge } from '../../src/sorting-and-searching/01-sorted-merge';

describe('sortedMerge', () => {
  it('should merge B into A in sorted order', () => {
    const A = [1, 3, 5, 0, 0, 0];
    const B = [2, 4, 6];
    const lastA = 3;
    const lastB = 3;

    sortedMerge(A, B, lastA, lastB);
    expect(A).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should handle A being empty', () => {
    const A = [0, 0, 0];
    const B = [1, 2, 3];
    sortedMerge(A, B, 0, 3);
    expect(A).toEqual([1, 2, 3]);
  });

  it('should handle B being empty', () => {
    const A = [1, 2, 3];
    const B: number[] = [];
    sortedMerge(A, B, 3, 0);
    expect(A).toEqual([1, 2, 3]);
  });

  it('should handle both A and B being empty', () => {
    const A: number[] = [];
    const B: number[] = [];
    sortedMerge(A, B, 0, 0);
    expect(A).toEqual([]);
  });

  it('should handle duplicates', () => {
    const A = [1, 3, 5, 0, 0, 0];
    const B = [1, 3, 5];
    sortedMerge(A, B, 3, 3);
    expect(A).toEqual([1, 1, 3, 3, 5, 5]);
  });
});
