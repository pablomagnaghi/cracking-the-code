import { lastKLines } from '../../src/c-and-cpp/01-last-k-lines';

describe('lastKLines', () => {
  test('returns last 3 lines of a 5-line input', () => {
    const input = 'a\nb\nc\nd\ne';
    expect(lastKLines(input, 3)).toEqual(['c', 'd', 'e']);
  });

  test('returns last 1 line', () => {
    const input = 'first\nsecond\nthird';
    expect(lastKLines(input, 1)).toEqual(['third']);
  });

  test('returns all lines when k equals number of lines', () => {
    const input = 'x\ny\nz';
    expect(lastKLines(input, 3)).toEqual(['x', 'y', 'z']);
  });

  test('returns all lines when k exceeds number of lines', () => {
    const input = 'only\ntwo';
    expect(lastKLines(input, 10)).toEqual(['only', 'two']);
  });

  test('returns empty array when k is 0', () => {
    expect(lastKLines('a\nb\nc', 0)).toEqual([]);
  });

  test('returns empty array when k is negative', () => {
    expect(lastKLines('a\nb', -1)).toEqual([]);
  });

  test('returns empty array for empty input', () => {
    expect(lastKLines('', 3)).toEqual([]);
  });

  test('handles single-line input', () => {
    expect(lastKLines('hello', 1)).toEqual(['hello']);
  });

  test('works with a larger file simulation', () => {
    const lines = Array.from({ length: 100 }, (_, i) => `line${i + 1}`);
    const input = lines.join('\n');
    const result = lastKLines(input, 5);
    expect(result).toEqual(['line96', 'line97', 'line98', 'line99', 'line100']);
  });

  test('preserves empty lines in the input', () => {
    const input = 'a\n\nb\n\nc';
    expect(lastKLines(input, 3)).toEqual(['b', '', 'c']);
  });
});
