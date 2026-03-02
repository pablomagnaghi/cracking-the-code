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

  test('collision probability is 3/4', () => {
    const noCollision = antsOnTriangle();
    const collision = 1 - noCollision;
    expect(collision).toBeCloseTo(0.75, 5);
  });

  test('result equals 2 divided by 2^3 (general formula for 3 ants)', () => {
    const result = antsOnTriangle();
    const expected = 2 / Math.pow(2, 3);
    expect(result).toBe(expected);
  });

  test('result is a rational number with denominator 8', () => {
    const result = antsOnTriangle();
    // 0.25 * 8 should be an integer
    expect(Number.isInteger(result * 8)).toBe(true);
  });
});
