import { countChange } from '../../src/recursion-and-dp/11-coins';

describe('countChange', () => {
  test('returns 1 for 0 cents', () => {
    expect(countChange(0)).toBe(1); // Only one way: use no coins
  });

  test('returns correct number of ways for 1 cent', () => {
    expect(countChange(1)).toBe(1); // Only one penny
  });

  test('returns correct number of ways for 5 cents', () => {
    expect(countChange(5)).toBe(2); // [5], [1,1,1,1,1]
  });

  test('returns correct number of ways for 10 cents', () => {
    expect(countChange(10)).toBe(4);
    // [10], [5,5], [5,1x5], [1x10]
  });

  test('returns correct number of ways for 25 cents', () => {
    expect(countChange(25)).toBe(13);
  });

  test('returns correct number of ways for 100 cents (1 dollar)', () => {
    expect(countChange(100)).toBe(242);
  });
});
