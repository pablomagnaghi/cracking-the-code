import { findMistake, analyzeCode } from '../../src/testing/01-mistake';

describe('findMistake', () => {
  test('returns an array of 101 elements (100 down to 0 inclusive)', () => {
    const result = findMistake();
    expect(result).toHaveLength(101);
  });

  test('starts at 100', () => {
    const result = findMistake();
    expect(result[0]).toBe(100);
  });

  test('ends at 0', () => {
    const result = findMistake();
    expect(result[result.length - 1]).toBe(0);
  });

  test('counts down in order from 100 to 0', () => {
    const result = findMistake();
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).toBe(100 - i);
    }
  });

  test('does not contain negative numbers', () => {
    const result = findMistake();
    expect(result.every((n) => n >= 0)).toBe(true);
  });

  test('contains every integer from 0 to 100 exactly once', () => {
    const result = findMistake();
    const sorted = [...result].sort((a, b) => a - b);
    for (let i = 0; i <= 100; i++) {
      expect(sorted[i]).toBe(i);
    }
  });
});

describe('analyzeCode', () => {
  test('returns a bug report with all required fields', () => {
    const report = analyzeCode();
    expect(report).toHaveProperty('bugDescription');
    expect(report).toHaveProperty('originalCode');
    expect(report).toHaveProperty('issue');
    expect(report).toHaveProperty('fix');
    expect(report).toHaveProperty('fixedCode');
  });

  test('identifies the unsigned int issue', () => {
    const report = analyzeCode();
    expect(report.issue).toContain('unsigned');
    expect(report.issue).toContain('never be negative');
  });

  test('original code contains the buggy loop', () => {
    const report = analyzeCode();
    expect(report.originalCode).toContain('unsigned int');
    expect(report.originalCode).toContain('i >= 0');
  });

  test('fixed code uses signed int', () => {
    const report = analyzeCode();
    expect(report.fixedCode).toContain('int i');
    expect(report.fixedCode).not.toMatch(/unsigned\s+int/);
  });
});
