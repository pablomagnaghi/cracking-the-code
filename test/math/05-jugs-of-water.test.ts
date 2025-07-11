import { measureFourQuarts } from '../../src/math/05-jugs-of-water';

describe('measureFourQuarts', () => {
  test('should eventually have exactly 4 quarts in the 5-quart jug', () => {
    const steps = measureFourQuarts();

    // Final state should be 4 in jug5
    const final = steps[steps.length - 1];
    expect(final.jug5).toBe(4);
    expect(final.jug3).toBe(0);
  });

  test('each step should maintain jug constraints', () => {
    const steps = measureFourQuarts();

    for (const { jug5, jug3 } of steps) {
      expect(jug5).toBeGreaterThanOrEqual(0);
      expect(jug5).toBeLessThanOrEqual(5);
      expect(jug3).toBeGreaterThanOrEqual(0);
      expect(jug3).toBeLessThanOrEqual(3);
    }
  });
});
