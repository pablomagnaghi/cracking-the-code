import { isUnique } from '../../src/arrays-and-strings/01-unique-chars';

describe('isUnique', () => {
  it('returns true for string with all unique characters', () => {
    expect(isUnique('abcdefg')).toBe(true);
  });

  it('returns false for string with duplicate characters', () => {
    expect(isUnique('hello')).toBe(false);
  });

  it('returns true for empty string', () => {
    expect(isUnique('')).toBe(true);
  });

  it('returns true for single character', () => {
    expect(isUnique('x')).toBe(true);
  });

  it('handles mixed case correctly', () => {
    expect(isUnique('aA')).toBe(true); // case-sensitive
  });

  it('returns false when spaces repeat', () => {
    expect(isUnique('a b c a')).toBe(false);
  });

  it('returns true for long unique string', () => {
    expect(isUnique('abcdefghijklmnopqrstuvwxyz')).toBe(true);
  });

  it('returns false for long string with duplicates', () => {
    expect(isUnique('abcdefghijklmnopqrstuvwxyzAabcdefghijklmnopqrstuvwxyz')).toBe(false);
  });
});
