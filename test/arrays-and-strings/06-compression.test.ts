import { stringCompression } from '../../src/arrays-and-strings/06-compression';

describe('stringCompression', () => {
  test('compresses repeated characters', () => {
    expect(stringCompression('aabcccccaaa')).toBe('a2b1c5a3');
  });

  test('returns original when compression is not shorter', () => {
    expect(stringCompression('abc')).toBe('abc');
  });

  test('handles empty string', () => {
    expect(stringCompression('')).toBe('');
  });

  test('handles single character string', () => {
    expect(stringCompression('a')).toBe('a');
  });

  test('handles two of the same character', () => {
    expect(stringCompression('aa')).toBe('aa'); // 'a2' not shorter than 'aa'
  });

  test('compresses alternating characters correctly', () => {
    expect(stringCompression('aabbcc')).toBe('aabbcc');
  });

  test('mixed case sensitivity', () => {
    expect(stringCompression('aAaaAA')).toBe('aAaaAA');
  });
});
