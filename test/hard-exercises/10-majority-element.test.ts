import { majorityElement } from '../../src/hard-exercises/10-majority-element';

describe('majorityElement', () => {
  test('finds majority element when majority is clear', () => {
    expect(majorityElement([3, 3, 4, 2, 3, 3, 3])).toBe(3);
  });

  test('returns the single element if array length is 1', () => {
    expect(majorityElement([1])).toBe(1);
  });

  test('majority element at the start', () => {
    expect(majorityElement([2, 2, 1, 1, 2, 2, 2])).toBe(2);
  });

  test('majority element at the end', () => {
    expect(majorityElement([1, 1, 2, 2, 2, 2, 2])).toBe(2);
  });

  test('all elements the same', () => {
    expect(majorityElement([5, 5, 5, 5, 5])).toBe(5);
  });

  test('LCCI example: [1,2,5,9,5,9,5,5,5] -> 5', () => {
    expect(majorityElement([1, 2, 5, 9, 5, 9, 5, 5, 5])).toBe(5);
  });

  test('majority element with two distinct values', () => {
    expect(majorityElement([7, 7, 7, 3, 3])).toBe(7);
  });
});
