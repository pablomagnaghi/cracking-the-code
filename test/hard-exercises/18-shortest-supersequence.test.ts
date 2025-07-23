import { shortestSupersequence } from '../../src/hard-exercises/18-shortest-supersequence';

describe('shortestSupersequence (number arrays)', () => {
  test('finds shortest supersequence in number array', () => {
    const big = [1, 2, 3, 4, 5, 6];
    const small = [2, 4, 6];
    expect(shortestSupersequence(big, small)).toEqual([1, 5]);
  });

  test('returns null if no sequence found', () => {
    const big = [1, 2, 3];
    const small = [4];
    expect(shortestSupersequence(big, small)).toBeNull();
  });

  test('handles exact match', () => {
    const big = [1, 2, 3];
    const small = [1, 2, 3];
    expect(shortestSupersequence(big, small)).toEqual([0, 2]);
  });

  test('multiple candidates, returns shortest one', () => {
    const big = [1, 2, 3, 1, 2, 3];
    const small = [1, 2, 3];
    expect([
      [0, 2],
      [3, 5],
    ]).toContainEqual(shortestSupersequence(big, small));
  });

  test('small sequence at the end', () => {
    const big = [4, 5, 6, 7, 8, 9];
    const small = [7, 8];
    expect(shortestSupersequence(big, small)).toEqual([3, 4]);
  });

  test('small array longer than big returns null', () => {
    const big = [1, 2];
    const small = [1, 2, 3];
    expect(shortestSupersequence(big, small)).toBeNull();
  });

  test('empty small array returns null', () => {
    expect(shortestSupersequence([1, 2, 3], [])).toBeNull();
  });

  test('empty big array returns null', () => {
    expect(shortestSupersequence([], [1, 2])).toBeNull();
  });
});
