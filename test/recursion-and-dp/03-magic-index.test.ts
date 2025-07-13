import {
  findMagicIndexDistinct,
  findMagicIndexNonDistinct,
} from '../../src/recursion-and-dp/03-magic-index';

describe('Magic Index - Distinct', () => {
  test('returns magic index if it exists', () => {
    const arr = [-1, 0, 1, 3, 5];
    expect(findMagicIndexDistinct(arr)).toBe(3);
  });

  test('returns null if no magic index exists', () => {
    const arr = [-1, 0, 3, 5, 7];
    expect(findMagicIndexDistinct(arr)).toBeNull();
  });
});

describe('Magic Index - Non-Distinct', () => {
  test('returns magic index if it exists with duplicates', () => {
    const arr = [-1, 0, 2, 2, 4, 6];
    expect(findMagicIndexNonDistinct(arr)).toBe(2);
  });

  test('returns null if no magic index exists', () => {
    const arr = [1, 2, 3, 4, 5]; // no index i where arr[i] === i
    expect(findMagicIndexNonDistinct(arr)).toBeNull();
  });

  test('works for all values the same', () => {
    const arr = [5, 5, 5, 5, 5];
    expect(findMagicIndexNonDistinct(arr)).toBeNull();
  });
});
