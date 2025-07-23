import { reSpace } from '../../src/hard-exercises/13-re-space';

describe('reSpace', () => {
  const dictionary = ['look', 'just', 'like', 'her', 'brother'];

  test('returns 7 unrecognized characters for "jesslookedjustliketimherbrother"', () => {
    const sentence = 'jesslookedjustliketimherbrother';
    // "jess" (4 chars unrecognized), "look" (in dict), "ed" (2 chars unrecognized),
    // "just" (in dict), "like" (in dict), "tim" (3 chars unrecognized),
    // "her" (in dict), "brother" (in dict)
    // Total unrecognized chars = 4 + 2 + 3 = 9
    expect(reSpace(dictionary, sentence)).toBe(9);
  });

  test('returns 0 unrecognized characters for sentence with only dictionary words', () => {
    const sentence = 'lookjustlikeherbrother';
    expect(reSpace(dictionary, sentence)).toBe(0);
  });

  test('returns sentence length if no dictionary words', () => {
    const sentence = 'abcdefg';
    expect(reSpace(dictionary, sentence)).toBe(sentence.length);
  });

  test('returns 0 for empty sentence', () => {
    expect(reSpace(dictionary, '')).toBe(0);
  });

  test('handles empty dictionary', () => {
    expect(reSpace([], 'anything')).toBe('anything'.length);
  });
});
