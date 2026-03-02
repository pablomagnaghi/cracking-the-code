import { findMissingTwo } from '../../src/hard-exercises/19-missing-two';

describe('findMissingTwo', () => {
  test('finds missing numbers from [1, 2, 4, 6]', () => {
    expect(findMissingTwo([1, 2, 4, 6]).sort()).toEqual([3, 5]);
  });

  test('finds missing numbers from [3, 2]', () => {
    expect(findMissingTwo([3, 2]).sort()).toEqual([1, 4]);
  });

  test('finds missing numbers from empty array (n = 2)', () => {
    expect(findMissingTwo([]).sort()).toEqual([1, 2]);
  });

  test('finds missing numbers from [1, 2, 3, 5, 6, 8, 9, 10]', () => {
    expect(findMissingTwo([1, 2, 3, 5, 6, 8, 9, 10]).sort()).toEqual([4, 7]);
  });

  test('works with unordered input', () => {
    const result = findMissingTwo([4, 1, 6, 2]);
    expect(result.sort()).toEqual([3, 5]);
  });

  test('LCCI example 1: [1] -> [2,3]', () => {
    expect(findMissingTwo([1]).sort()).toEqual([2, 3]);
  });

  test('LCCI example 2: [2,3] -> [1,4]', () => {
    expect(findMissingTwo([2, 3]).sort()).toEqual([1, 4]);
  });
});
