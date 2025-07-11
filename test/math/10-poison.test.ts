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
});
