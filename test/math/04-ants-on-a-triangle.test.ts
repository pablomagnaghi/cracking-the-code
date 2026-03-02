import { antsOnTriangle } from '../../src/math/04-ants-on-a-triangle';

describe('antsOnTriangle', () => {
  test('returns correct probability of no collision', () => {
    const result = antsOnTriangle();
    const expected = 0.25;

    expect(result).toBeCloseTo(expected, 5);
  });

  test('probability is exactly 2/8', () => {
    const result = antsOnTriangle();
    expect(result).toBe(2 / 8);
  });

  test('probability is between 0 and 1', () => {
    const result = antsOnTriangle();
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });
});
