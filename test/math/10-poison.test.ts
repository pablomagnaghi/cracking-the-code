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
});
