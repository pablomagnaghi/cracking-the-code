import { findLongestBalancedSubarray } from '../../src/hard-exercises/05-letters-and-numbers';

describe('findLongestBalancedSubarray', () => {
  test('returns longest balanced subarray', () => {
    const input = ['b', '2', '3', 'c', 'd', 'e'];
    expect(findLongestBalancedSubarray(input)).toEqual(['b', '2', '3', 'c']);
  });

  test('returns empty array when no match', () => {
    const input = ['a', 'b', 'c'];
    expect(findLongestBalancedSubarray(input)).toEqual([]);
  });

  test('handles all balanced array', () => {
    const input = ['a', 1, 'b', 2];
    expect(findLongestBalancedSubarray(input)).toEqual(['a', 1, 'b', 2]);
  });

  test('handles multiple equal subarrays', () => {
    const input = ['1', 'a', '2', 'b', '3', 'c'];
    expect(findLongestBalancedSubarray(input)).toEqual(['1', 'a', '2', 'b', '3', 'c']);
  });

  test('handles single element array', () => {
    expect(findLongestBalancedSubarray(['a'])).toEqual([]);
    expect(findLongestBalancedSubarray([1])).toEqual([]);
  });

  test('handles empty array', () => {
    expect(findLongestBalancedSubarray([])).toEqual([]);
  });
});
