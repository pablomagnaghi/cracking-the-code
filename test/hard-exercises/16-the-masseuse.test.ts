import { maxMassageTime } from '../../src/hard-exercises/16-the-masseuse';

describe('maxMassageTime', () => {
  test('calculates max total duration without adjacent appointments', () => {
    const appointments = [30, 15, 60, 75, 45, 15, 15, 45];
    expect(maxMassageTime(appointments)).toBe(180);
  });

  test('handles empty array', () => {
    expect(maxMassageTime([])).toBe(0);
  });

  test('handles one appointment', () => {
    expect(maxMassageTime([50])).toBe(50);
  });

  test('handles two appointments', () => {
    expect(maxMassageTime([50, 30])).toBe(50);
  });

  test('handles all equal durations', () => {
    expect(maxMassageTime([20, 20, 20, 20])).toBe(40);
  });

  test('handles strictly increasing durations', () => {
    expect(maxMassageTime([10, 20, 30, 40, 50])).toBe(90);
  });

  test('handles strictly decreasing durations', () => {
    expect(maxMassageTime([50, 40, 30, 20, 10])).toBe(90);
  });

  test('handles alternating large and small durations', () => {
    expect(maxMassageTime([100, 1, 100, 1, 100])).toBe(300);
  });
});
