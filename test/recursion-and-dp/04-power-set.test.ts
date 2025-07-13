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
});
