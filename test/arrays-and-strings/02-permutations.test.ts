import {
  checkPermutations,
  checkPermutationsWithHash,
} from '../../src/arrays-and-strings/02-permutations';

describe('checkPermutations', () => {
  it('returns true for simple permutations', () => {
    expect(checkPermutations('abc', 'cab')).toBe(true);
  });

  it('returns false for strings with different characters', () => {
    expect(checkPermutations('abc', 'def')).toBe(false);
  });

  it('returns false for strings with different lengths', () => {
    expect(checkPermutations('abc', 'ab')).toBe(false);
  });

  it('returns true for empty strings', () => {
    expect(checkPermutations('', '')).toBe(true);
  });

  it('returns true for identical strings', () => {
    expect(checkPermutations('aabbcc', 'aabbcc')).toBe(true);
  });

  it('returns false if character counts differ', () => {
    expect(checkPermutations('aabbcc', 'abcccd')).toBe(false);
  });

  it('is case-sensitive', () => {
    expect(checkPermutations('abc', 'ABC')).toBe(false);
  });

  it('returns true for long strings that are permutations', () => {
    expect(checkPermutations('thequickbrownfox', 'xofnworbkciuqeht')).toBe(true);
  });

  it('returns false for long strings that are not permutations', () => {
    expect(checkPermutations('thequickbrownfox', 'jumpsovethefoxdog')).toBe(false);
  });
});

describe('checkPermutationsWithHash', () => {
  it('returns true for simple permutations', () => {
    expect(checkPermutationsWithHash('abc', 'cab')).toBe(true);
  });

  it('returns false for strings with different characters', () => {
    expect(checkPermutationsWithHash('abc', 'def')).toBe(false);
  });

  it('returns false for strings with different lengths', () => {
    expect(checkPermutationsWithHash('abc', 'ab')).toBe(false);
  });

  it('returns true for empty strings', () => {
    expect(checkPermutationsWithHash('', '')).toBe(true);
  });

  it('returns true for identical strings', () => {
    expect(checkPermutationsWithHash('aabbcc', 'aabbcc')).toBe(true);
  });

  it('returns false if character counts differ', () => {
    expect(checkPermutationsWithHash('aabbcc', 'abcccd')).toBe(false);
  });

  it('is case-sensitive', () => {
    expect(checkPermutationsWithHash('abc', 'ABC')).toBe(false);
  });

  it('returns true for long strings that are permutations', () => {
    expect(checkPermutationsWithHash('thequickbrownfox', 'xofnworbkciuqeht')).toBe(true);
  });

  it('returns false for long strings that are not permutations', () => {
    expect(checkPermutationsWithHash('thequickbrownfox', 'jumpsovethefoxdog')).toBe(false);
  });
});
