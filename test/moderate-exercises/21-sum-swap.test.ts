import { sumSwap } from '../../src/moderate-exercises/21-sum-swap';

describe('sumSwap', () => {
  test('returns a correct swap pair when possible', () => {
    const A = [4, 1, 2, 1, 1, 2];
    const B = [3, 6, 3, 3];
    expect(sumSwap(A, B)).toEqual([1, 3]);
  });

  test('returns null if no valid swap exists', () => {
    const A = [1, 2, 3];
    const B = [4, 5, 6];
    expect(sumSwap(A, B)).toBeNull();
  });

  test('handles empty arrays', () => {
    expect(sumSwap([], [1, 2, 3])).toBeNull();
    expect(sumSwap([1, 2, 3], [])).toBeNull();
    expect(sumSwap([], [])).toBeNull();
  });

  test('handles arrays with negative numbers', () => {
    const A = [5, -3, 1];
    const B = [4, 0, 3];
    const result = sumSwap(A, B);
    expect(result).not.toBeNull();

    if (result) {
      const [a, b] = result;
      // Verify the swap fixes the sum difference
      const sumA = A.reduce((acc, v) => acc + v, 0);
      const sumB = B.reduce((acc, v) => acc + v, 0);
      expect(sumA - a + b).toBe(sumB - b + a);
      // Also verify these elements actually exist in arrays
      expect(A.includes(a)).toBe(true);
      expect(B.includes(b)).toBe(true);
    }
  });

  test('returns any valid pair if multiple possible', () => {
    const A = [1, 2, 3, 4];
    const B = [1, 2, 5];
    const result = sumSwap(A, B);
    expect(result).not.toBeNull();
    if (result) {
      const [a, b] = result;
      const sumA = A.reduce((x, y) => x + y, 0) - a + b;
      const sumB = B.reduce((x, y) => x + y, 0) - b + a;
      expect(sumA).toBe(sumB);
    }
  });
});
