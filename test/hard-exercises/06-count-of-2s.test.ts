import { countTwos } from '../../src/hard-exercises/06-count-of-2s';

describe('countTwos', () => {
  test('counts twos from 0 to 25', () => {
    expect(countTwos(25)).toBe(9);
  });

  test('counts twos from 0 to 100', () => {
    expect(countTwos(100)).toBe(20);
  });

  test('counts twos from 0 to 0', () => {
    expect(countTwos(0)).toBe(0);
  });

  test('counts twos from 0 to 222', () => {
    expect(countTwos(222)).toBeGreaterThan(0);
  });
});
