import { permutationsWithDups } from '../../src/recursion-and-dp/08-permutations-with-dups';

describe('permutationsWithDups', () => {
  test('returns unique permutations for "aab"', () => {
    const input = 'aab';
    const expected = ['aab', 'aba', 'baa'];
    const result = permutationsWithDups(input);
    expect(result.sort()).toEqual(expected.sort());
  });

  test('returns all permutations for "ab"', () => {
    const input = 'ab';
    const expected = ['ab', 'ba'];
    const result = permutationsWithDups(input);
    expect(result.sort()).toEqual(expected.sort());
  });

  test('returns single permutation for all same characters "aaa"', () => {
    expect(permutationsWithDups('aaa')).toEqual(['aaa']);
  });

  test('returns empty array for empty string', () => {
    expect(permutationsWithDups('')).toEqual(['']);
  });
});
