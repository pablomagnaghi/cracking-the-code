import { longestWord } from '../../src/hard-exercises/15-longest-word';

describe('longestWord', () => {
  test('finds the longest compound word', () => {
    const words = ['cat', 'banana', 'dog', 'nana', 'walk', 'walker', 'dogwalker'];
    expect(longestWord(words)).toBe('dogwalker');
  });

  test('returns empty string if no compound words exist', () => {
    const words = ['apple', 'banana', 'carrot'];
    expect(longestWord(words)).toBe('');
  });

  test('returns the lexicographically smallest if same length', () => {
    const words = ['rat', 'cat', 'ratcat', 'catrat'];
    expect(longestWord(words)).toBe('catrat'); // same length as 'ratcat', but 'catrat' is smaller
  });

  test('handles words made from multiple smaller words', () => {
    const words = ['a', 'b', 'c', 'ab', 'abc', 'bc', 'abcabc'];
    expect(longestWord(words)).toBe('abcabc');
  });

  test('ignores the word itself when checking parts', () => {
    const words = ['hello'];
    expect(longestWord(words)).toBe('');
  });
});
