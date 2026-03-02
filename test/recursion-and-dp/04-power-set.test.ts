import { powerSet } from '../../src/recursion-and-dp/04-power-set';

describe('powerSet', () => {
  test('returns all subsets of an empty set', () => {
    expect(powerSet([])).toEqual([[]]);
  });

  test('returns all subsets for a single element set', () => {
    expect(powerSet([1])).toEqual([[], [1]]);
  });

  test('returns all subsets for [1, 2]', () => {
    expect(powerSet([1, 2])).toEqual([[], [2], [1], [1, 2]]);
  });

  test('returns all subsets for [1, 2, 3]', () => {
    const expectedSubsets = [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]];
    expect(powerSet([1, 2, 3])).toEqual(expectedSubsets);
  });

  test('returns correct number of subsets (2^n)', () => {
    expect(powerSet([1, 2, 3, 4])).toHaveLength(16);
  });

  test('returns all subsets for [5, 10]', () => {
    const result = powerSet([5, 10]);
    expect(result).toHaveLength(4);
    expect(result).toEqual(expect.arrayContaining([[], [5], [10], [5, 10]]));
  });
});
