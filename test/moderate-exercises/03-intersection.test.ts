import { intersection } from '../../src/moderate-exercises/03-intersection';

describe('intersection', () => {
  test('returns common elements in both arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  test('returns empty array if no intersection', () => {
    expect(intersection([1, 5, 7], [2, 3, 4])).toEqual([]);
  });

  test('handles empty first array', () => {
    expect(intersection([], [1, 2, 3])).toEqual([]);
  });

  test('handles empty second array', () => {
    expect(intersection([1, 2, 3], [])).toEqual([]);
  });

  test('returns unique elements only once', () => {
    expect(intersection([1, 2, 2, 3], [2, 2, 3, 3])).toEqual([2, 3]);
  });

  test('handles identical arrays', () => {
    expect(intersection([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
  });
});
