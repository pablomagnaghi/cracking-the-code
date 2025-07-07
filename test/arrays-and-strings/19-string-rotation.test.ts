import { stringRotation } from '../../src/arrays-and-strings/19-string-rotation';

describe('stringRotation', () => {
  test('detects correct rotation', () => {
    expect(stringRotation('waterbottle', 'erbottlewat')).toBe(true);
  });

  test('returns false for incorrect rotation', () => {
    expect(stringRotation('waterbottle', 'erbttlewat')).toBe(false);
  });

  test('returns false for different lengths', () => {
    expect(stringRotation('hello', 'helloo')).toBe(false);
  });

  test('returns false for empty string', () => {
    expect(stringRotation('', 'anything')).toBe(false);
  });

  test('returns true for identical strings', () => {
    expect(stringRotation('abc', 'abc')).toBe(true);
  });

  test('returns false for non-rotation strings with same length', () => {
    expect(stringRotation('abcde', 'edcba')).toBe(false);
  });
});
