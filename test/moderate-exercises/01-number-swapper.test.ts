import { swapNumbers } from '../../src/moderate-exercises/01-number-swapper';

describe('swapNumbers', () => {
  test('swaps two positive numbers', () => {
    const [a, b] = swapNumbers(3, 8);
    expect(a).toBe(8);
    expect(b).toBe(3);
  });

  test('swaps a positive and a negative number', () => {
    const [a, b] = swapNumbers(-5, 10);
    expect(a).toBe(10);
    expect(b).toBe(-5);
  });

  test('swaps two negative numbers', () => {
    const [a, b] = swapNumbers(-7, -2);
    expect(a).toBe(-2);
    expect(b).toBe(-7);
  });

  test('swaps zero and a number', () => {
    const [a, b] = swapNumbers(0, 4);
    expect(a).toBe(4);
    expect(b).toBe(0);
  });

  test('swapping the same number results in same values', () => {
    const [a, b] = swapNumbers(5, 5);
    expect(a).toBe(5);
    expect(b).toBe(5);
  });
});
