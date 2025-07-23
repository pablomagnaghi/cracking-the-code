import { shortestWordDistance } from '../../src/hard-exercises/11-word-distance';

describe('shortestWordDistance', () => {
  test('finds shortest distance between two words', () => {
    const words = ['practice', 'makes', 'perfect', 'coding', 'makes'];
    expect(shortestWordDistance(words, 'coding', 'practice')).toBe(3);
    expect(shortestWordDistance(words, 'makes', 'coding')).toBe(1);
    expect(shortestWordDistance(words, 'makes', 'makes')).toBe(0);
  });

  test('returns -1 if one or both words not found', () => {
    const words = ['a', 'b', 'c'];
    expect(shortestWordDistance(words, 'a', 'd')).toBe(-1);
    expect(shortestWordDistance(words, 'x', 'y')).toBe(-1);
  });

  test('handles empty array', () => {
    expect(shortestWordDistance([], 'a', 'b')).toBe(-1);
  });

  test('handles identical words that appear multiple times', () => {
    const words = ['a', 'b', 'a', 'c', 'a'];
    expect(shortestWordDistance(words, 'a', 'a')).toBe(0);
  });
});
