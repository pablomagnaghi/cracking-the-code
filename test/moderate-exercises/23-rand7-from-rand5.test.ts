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

  test('all 7 values appear at least once in a large sample', () => {
    const seen = new Set<number>();
    for (let i = 0; i < 1000; i++) {
      seen.add(rand7());
    }
    expect(seen.size).toBe(7);
    for (let v = 1; v <= 7; v++) {
      expect(seen.has(v)).toBe(true);
    }
  });

  test('never returns values outside 1-7 across many calls', () => {
    const results: number[] = [];
    for (let i = 0; i < 5000; i++) {
      results.push(rand7());
    }
    const min = Math.min(...results);
    const max = Math.max(...results);
    expect(min).toBe(1);
    expect(max).toBe(7);
  });

  test('chi-squared test for uniformity', () => {
    const counts = Array(7).fill(0);
    const iterations = 70000;
    for (let i = 0; i < iterations; i++) {
      counts[rand7() - 1]++;
    }
    const expected = iterations / 7;
    // Chi-squared statistic: sum of (observed - expected)^2 / expected
    const chiSquared = counts.reduce((sum, count) => sum + Math.pow(count - expected, 2) / expected, 0);
    // With 6 degrees of freedom, critical value at p=0.01 is 16.81
    expect(chiSquared).toBeLessThan(16.81);
  });
});
