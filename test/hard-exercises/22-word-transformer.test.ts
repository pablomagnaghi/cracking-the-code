import { wordTransformerSequence } from '../../src/hard-exercises/22-word-transformer';

describe('wordTransformerSequence', () => {
  const dictionary = new Set([
    'cat',
    'bat',
    'bet',
    'bed',
    'at',
    'ad',
    'ed',
    'bad',
    'had',
    'hat',
    'heat',
  ]);

  test('transforms cat to bed', () => {
    const result = wordTransformerSequence('cat', 'bed', dictionary);
    expect(result[0]).toBe('cat');
    expect(result[result.length - 1]).toBe('bed');
    // All words in result should be in dictionary
    expect(result.every((w) => dictionary.has(w))).toBe(true);
    // Every two adjacent words differ by one letter
    for (let i = 0; i < result.length - 1; i++) {
      expect(diffByOne(result[i], result[i + 1])).toBe(true);
    }
  });

  test('returns single word when start equals end', () => {
    expect(wordTransformerSequence('cat', 'cat', dictionary)).toEqual(['cat']);
  });

  test('returns empty array when words not in dictionary', () => {
    expect(wordTransformerSequence('cat', 'dog', dictionary)).toEqual([]);
  });

  test('returns empty array when no transformation possible', () => {
    const smallDict = new Set(['aaa', 'aab', 'xyz', 'bbb']);
    expect(wordTransformerSequence('aaa', 'bbb', smallDict)).toEqual([]);
  });
});

// Helper function for tests
function diffByOne(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) count++;
    if (count > 1) return false;
  }
  return count === 1;
}
