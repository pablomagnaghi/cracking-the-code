import { findHeavyBottle } from '../../src/math/01-the-heavy-pill';

describe('findHeavyBottle', () => {
  test('detects bottle 1 as heavy', () => {
    const heavyBottle = 1;
    const measureWeight = (pillsTaken: number[]) => {
      // total weight = sum of pills + 0.1g extra for heavy bottle pills
      const baseWeight = pillsTaken.reduce((a, b) => a + b, 0);
      return baseWeight + pillsTaken[heavyBottle - 1] * 0.1;
    };

    expect(findHeavyBottle(measureWeight)).toBe(heavyBottle);
  });

  test('detects bottle 10 as heavy', () => {
    const heavyBottle = 10;
    const measureWeight = (pillsTaken: number[]) => {
      const baseWeight = pillsTaken.reduce((a, b) => a + b, 0);
      return baseWeight + pillsTaken[heavyBottle - 1] * 0.1;
    };

    expect(findHeavyBottle(measureWeight)).toBe(heavyBottle);
  });

  test('detects bottle 20 as heavy', () => {
    const heavyBottle = 20;
    const measureWeight = (pillsTaken: number[]) => {
      const baseWeight = pillsTaken.reduce((a, b) => a + b, 0);
      return baseWeight + pillsTaken[heavyBottle - 1] * 0.1;
    };

    expect(findHeavyBottle(measureWeight)).toBe(heavyBottle);
  });
});
