import { isOneAway } from "../../src/arrays-and-strings/15-one-edit-way";

describe('isOneAway', () => {
  test('returns true for one replacement', () => {
    expect(isOneAway('pale', 'bale')).toBe(true);
  });

  test('returns true for one insertion', () => {
    expect(isOneAway('pale', 'pales')).toBe(true);
  });

  test('returns true for one deletion', () => {
    expect(isOneAway('pales', 'pale')).toBe(true);
  });

  test('returns false for two replacements', () => {
    expect(isOneAway('pale', 'bake')).toBe(false);
  });

  test('returns false if length difference > 1', () => {
    expect(isOneAway('pale', 'palesss')).toBe(false);
  });

  test('returns true for identical strings', () => {
    expect(isOneAway('pale', 'pale')).toBe(true);
  });

  test('returns true for single char insert at end', () => {
    expect(isOneAway('abc', 'abcc')).toBe(true);
  });

  test('returns true for single char insert at start', () => {
    expect(isOneAway('abc', 'zabc')).toBe(true);
  });

  test('returns false for more than one edit', () => {
    expect(isOneAway('teacher', 'bleacher')).toBe(false);
  });

  test('returns true for empty and one-char string', () => {
    expect(isOneAway('', 'a')).toBe(true);
    expect(isOneAway('a', '')).toBe(true);
  });

  test('returns false for empty and two-char string', () => {
    expect(isOneAway('', 'ab')).toBe(false);
  });
});
