import { hundredLockers } from '../../src/math/09-100-lockers';

describe('hundredLockers', () => {
  it('returns the list of open lockers after 100 passes', () => {
    const openLockers = hundredLockers();

    // Lockers that remain open are perfect squares from 1 to 100
    const expectedOpenLockers = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];

    expect(openLockers).toEqual(expectedOpenLockers);
  });

  it('returns exactly 10 open lockers', () => {
    const openLockers = hundredLockers();
    expect(openLockers).toHaveLength(10);
  });

  it('all open lockers are perfect squares', () => {
    const openLockers = hundredLockers();
    for (const locker of openLockers) {
      const sqrt = Math.sqrt(locker);
      expect(Number.isInteger(sqrt)).toBe(true);
    }
  });

  it('first open locker is 1 and last is 100', () => {
    const openLockers = hundredLockers();
    expect(openLockers[0]).toBe(1);
    expect(openLockers[openLockers.length - 1]).toBe(100);
  });

  it('no non-perfect-square lockers are open', () => {
    const openLockers = hundredLockers();
    const nonSquares = openLockers.filter((n) => {
      const sqrt = Math.sqrt(n);
      return !Number.isInteger(sqrt);
    });
    expect(nonSquares).toHaveLength(0);
  });

  it('open lockers are sorted in ascending order', () => {
    const openLockers = hundredLockers();
    for (let i = 1; i < openLockers.length; i++) {
      expect(openLockers[i]).toBeGreaterThan(openLockers[i - 1]);
    }
  });
});
