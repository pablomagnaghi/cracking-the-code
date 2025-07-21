import { wordFrequencies } from '../../src/moderate-exercises/02-word-frequencies';

describe('wordFrequencies', () => {
  test('counts frequencies in a simple sentence', () => {
    const doc = 'Hello world hello';
    const freq = wordFrequencies(doc);
    expect(freq.get('hello')).toBe(2);
    expect(freq.get('world')).toBe(1);
  });

  test('ignores punctuation and case', () => {
    const doc = 'Hello, world! HELLO... world?';
    const freq = wordFrequencies(doc);
    expect(freq.get('hello')).toBe(2);
    expect(freq.get('world')).toBe(2);
  });

  test('handles empty string', () => {
    const freq = wordFrequencies('');
    expect(freq.size).toBe(0);
  });

  test('handles multiple spaces', () => {
    const doc = 'foo   bar   foo';
    const freq = wordFrequencies(doc);
    expect(freq.get('foo')).toBe(2);
    expect(freq.get('bar')).toBe(1);
  });

  test('handles numbers and words mixed', () => {
    const doc = 'test 123 test 123 123';
    const freq = wordFrequencies(doc);
    expect(freq.get('test')).toBe(2);
    expect(freq.get('123')).toBe(3);
  });
});
