import { permutationsWithoutDups } from '../../src/recursion-and-dp/07-permutations-without-dups';

describe('permutationsWithoutDups', () => {
  test('returns all permutations for "abc"', () => {
    const input = 'abc';
    const expected = ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'];
    const result = permutationsWithoutDups(input);
    expect(result.sort()).toEqual(expected.sort());
  });

  test('returns single permutation for single char "a"', () => {
    expect(permutationsWithoutDups('a')).toEqual(['a']);
  });

  test('returns empty array for empty string', () => {
    expect(permutationsWithoutDups('')).toEqual(['']);
  });

  test('returns all permutations for "qwe" (LCCI example)', () => {
    const result = permutationsWithoutDups('qwe');
    expect(result).toHaveLength(6);
    expect(result.sort()).toEqual(['eqw', 'ewq', 'qew', 'qwe', 'weq', 'wqe']);
  });

  test('returns correct count for "ab" (LCCI example)', () => {
    const result = permutationsWithoutDups('ab');
    expect(result.sort()).toEqual(['ab', 'ba']);
  });
});
