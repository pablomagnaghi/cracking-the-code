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

  test('starts from an empty state', () => {
    const steps = measureFourQuarts();
    expect(steps[0]).toEqual({ jug5: 0, jug3: 0 });
  });

  test('produces a deterministic sequence of steps', () => {
    const steps1 = measureFourQuarts();
    const steps2 = measureFourQuarts();
    expect(steps1).toEqual(steps2);
  });

  test('takes exactly 9 steps (including the initial empty state)', () => {
    const steps = measureFourQuarts();
    expect(steps).toHaveLength(9);
  });

  test('follows the expected sequence of jug states', () => {
    const steps = measureFourQuarts();
    expect(steps).toEqual([
      { jug5: 0, jug3: 0 },
      { jug5: 0, jug3: 3 },
      { jug5: 3, jug3: 0 },
      { jug5: 3, jug3: 3 },
      { jug5: 5, jug3: 1 },
      { jug5: 0, jug3: 1 },
      { jug5: 1, jug3: 0 },
      { jug5: 1, jug3: 3 },
      { jug5: 4, jug3: 0 },
    ]);
  });

  test('never has negative water in either jug', () => {
    const steps = measureFourQuarts();
    for (const step of steps) {
      expect(step.jug5).toBeGreaterThanOrEqual(0);
      expect(step.jug3).toBeGreaterThanOrEqual(0);
    }
  });
});
