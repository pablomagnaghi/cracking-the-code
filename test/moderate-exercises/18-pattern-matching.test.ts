import { patternMatching } from '../../src/moderate-exercises/18-pattern-matching';

describe('patternMatching', () => {
  test('matches pattern with consistent substrings', () => {
    expect(patternMatching('abab', 'redblueredblue')).toBe(true);
  });

  test('does not match if inconsistent mapping', () => {
    expect(patternMatching('aaaa', 'asdasdasdasd')).toBe(true);
    expect(patternMatching('aaaa', 'asdasdasdxyz')).toBe(false);
  });

  test('matches single character pattern', () => {
    expect(patternMatching('a', 'anything')).toBe(true);
  });

  test('empty pattern and empty text match', () => {
    expect(patternMatching('', '')).toBe(true);
  });

  test('empty pattern with non-empty text does not match', () => {
    expect(patternMatching('', 'abc')).toBe(false);
  });

  test('pattern longer than text does not match', () => {
    expect(patternMatching('abc', 'a')).toBe(false);
  });

  test('pattern with all unique characters', () => {
    expect(patternMatching('abc', 'xyz')).toBe(true);
    expect(patternMatching('abc', 'xxxyyyzzz')).toBe(true); // updated expected value to true
  });

  test('pattern with repeated character but different substrings', () => {
    expect(patternMatching('aba', 'xyzxyzxyz')).toBe(false);
  });
});
