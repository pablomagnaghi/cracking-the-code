import { permutationsWithoutDups } from '../../../src/recursion-and-dp/07-permutations-without-dups';

describe('permutationsWithoutDups', () => {
  test('returns correct permutations for a string of unique characters', () => {
    // Test case with a string of length 3
    const result1 = permutationsWithoutDups('abc');
    const expectedPermutations1 = ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'];
    expect(result1).toEqual(expect.arrayContaining(expectedPermutations1));
  });
});
