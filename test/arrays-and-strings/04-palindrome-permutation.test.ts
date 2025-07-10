import { palindromePermutation } from '../../src/arrays-and-strings/04-palindrome-permutation';

describe('palindromePermutation', () => {
  it('returns true for an actual palindrome', () => {
    expect(palindromePermutation('racecar')).toBe(true);
  });

  it('returns true for a permutation of a palindrome', () => {
    expect(palindromePermutation('carrace')).toBe(true);
  });

  it('returns false for a non-palindrome permutation', () => {
    expect(palindromePermutation('hello')).toBe(false);
  });

  it('ignores case and non-alphabetic characters', () => {
    expect(palindromePermutation('Tact Coa')).toBe(true); // "taco cat"
  });

  it('returns true for empty string', () => {
    expect(palindromePermutation('')).toBe(true);
  });

  it('returns true for single character', () => {
    expect(palindromePermutation('a')).toBe(true);
  });

  it('returns false when multiple odd frequency chars', () => {
    expect(palindromePermutation('abcde')).toBe(false);
  });

  it('works with even-length palindrome', () => {
    expect(palindromePermutation('abba')).toBe(true);
  });

  it('works with odd-length palindrome', () => {
    expect(palindromePermutation('madam')).toBe(true);
  });
});
