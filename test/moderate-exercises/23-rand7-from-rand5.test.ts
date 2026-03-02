import { rand7 } from '../../src/moderate-exercises/23-rand7-from-rand5';

describe('rand7', () => {
  test('returns values between 1 and 7 inclusive', () => {
    for (let i = 0; i < 1000; i++) {
      const val = rand7();
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThanOrEqual(7);
    }
  });

  test('distribution is roughly uniform', () => {
    const counts = Array(7).fill(0);
    const iterations = 70000;

    for (let i = 0; i < iterations; i++) {
      counts[rand7() - 1]++;
    }

    // Calculate mean count
    const mean = iterations / 7;
    // Allow ±5% deviation
    const tolerance = mean * 0.05;

    for (const count of counts) {
      expect(count).toBeGreaterThanOrEqual(mean - tolerance);
      expect(count).toBeLessThanOrEqual(mean + tolerance);
    }
  });

  test('returns only integers', () => {
    for (let i = 0; i < 100; i++) {
      const val = rand7();
      expect(Number.isInteger(val)).toBe(true);
    }
  });
});
