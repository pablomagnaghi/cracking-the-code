import { findPoisonedBottle, simulateTestStrips } from '../../src/math/10-poison';

describe('findPoisonedBottle', () => {
  test.each([5, 123, 255, 999, 0, 768])(
    'correctly identifies poisoned bottle #%i',
    (poisonedIndex) => {
      const testStrips = simulateTestStrips(poisonedIndex);
      const result = findPoisonedBottle(testStrips);
      expect(result).toBe(poisonedIndex);
    }
  );

  test('correctly identifies bottle 1 (single bit set)', () => {
    const testStrips = simulateTestStrips(1);
    expect(findPoisonedBottle(testStrips)).toBe(1);
  });

  test('correctly identifies bottle 512 (highest single bit for 10 strips)', () => {
    const testStrips = simulateTestStrips(512);
    expect(findPoisonedBottle(testStrips)).toBe(512);
  });

  test('correctly identifies bottle 5 (binary 101 -> strips 0 and 2)', () => {
    const testStrips = simulateTestStrips(5);
    expect(findPoisonedBottle(testStrips)).toBe(5);
  });

  test('correctly identifies bottle 999 (maximum valid bottle index)', () => {
    const testStrips = simulateTestStrips(999);
    expect(findPoisonedBottle(testStrips)).toBe(999);
  });

  test('works for all bottles from 0 to 99', () => {
    for (let i = 0; i < 100; i++) {
      const testStrips = simulateTestStrips(i);
      expect(findPoisonedBottle(testStrips)).toBe(i);
    }
  });
});
