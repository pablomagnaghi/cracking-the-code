import { pondSizes } from '../../src/moderate-exercises/19-pond-sizes';

describe('pondSizes', () => {
  test('returns correct pond sizes for a simple map', () => {
    const land = [
      [0, 2, 1, 0],
      [0, 1, 0, 1],
      [1, 1, 0, 1],
      [0, 1, 0, 1],
    ];
    expect(pondSizes(land).sort((a, b) => a - b)).toEqual([1, 2, 4]);
  });

  test('returns empty array when no water', () => {
    const land = [
      [1, 2, 1],
      [3, 1, 4],
      [5, 6, 7],
    ];
    expect(pondSizes(land)).toEqual([]);
  });

  test('returns one large pond when all zeros', () => {
    const land = [
      [0, 0],
      [0, 0],
    ];
    expect(pondSizes(land)).toEqual([4]);
  });

  test('handles diagonal connections', () => {
    const land = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ];
    expect(pondSizes(land)).toEqual([5]);
  });

  test('returns correct sizes with isolated water cells', () => {
    const land = [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ];
    expect(pondSizes(land).sort((a, b) => a - b)).toEqual([1, 1, 1, 1]);
  });
});
