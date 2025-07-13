import { recursiveMultiply } from '../../src/recursion-and-dp/05-recursive-multiply';

describe('recursiveMultiply', () => {
  test('multiplies two positive integers correctly', () => {
    expect(recursiveMultiply(0, 5)).toBe(0);
    expect(recursiveMultiply(5, 0)).toBe(0);
    expect(recursiveMultiply(1, 5)).toBe(5);
    expect(recursiveMultiply(5, 1)).toBe(5);
    expect(recursiveMultiply(3, 4)).toBe(12);
    expect(recursiveMultiply(7, 6)).toBe(42);
    expect(recursiveMultiply(15, 15)).toBe(225);
  });

  test('is commutative', () => {
    expect(recursiveMultiply(4, 3)).toBe(recursiveMultiply(3, 4));
    expect(recursiveMultiply(7, 8)).toBe(recursiveMultiply(8, 7));
  });
});
