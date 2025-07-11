import { antsOnTriangle } from '../../src/math/04-ants-on-a-triangle';

describe('antsOnTriangle', () => {
  test('returns correct probability of no collision', () => {
    const result = antsOnTriangle();
    const expected = 0.25;

    expect(result).toBeCloseTo(expected, 5);
  });
});
