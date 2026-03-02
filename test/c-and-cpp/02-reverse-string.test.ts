import { reverseString } from '../../src/c-and-cpp/02-reverse-string';

describe('reverseString', () => {
  test('reverses a simple word', () => {
    expect(reverseString(['h', 'e', 'l', 'l', 'o'])).toEqual(['o', 'l', 'l', 'e', 'h']);
  });

  test('reverses a single character', () => {
    expect(reverseString(['a'])).toEqual(['a']);
  });

  test('reverses an empty array', () => {
    expect(reverseString([])).toEqual([]);
  });

  test('reverses two characters', () => {
    expect(reverseString(['a', 'b'])).toEqual(['b', 'a']);
  });

  test('reverses a palindrome (stays the same)', () => {
    expect(reverseString(['r', 'a', 'c', 'e', 'c', 'a', 'r'])).toEqual([
      'r', 'a', 'c', 'e', 'c', 'a', 'r',
    ]);
  });

  test('mutates the input array in-place', () => {
    const arr = ['x', 'y', 'z'];
    const result = reverseString(arr);
    expect(result).toBe(arr); // same reference
    expect(arr).toEqual(['z', 'y', 'x']);
  });

  test('reverses a string with spaces', () => {
    const chars = 'a b c'.split('');
    expect(reverseString(chars)).toEqual('c b a'.split(''));
  });

  test('reverses an even-length array', () => {
    expect(reverseString(['1', '2', '3', '4'])).toEqual(['4', '3', '2', '1']);
  });
});
