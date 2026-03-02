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

  test('correctly takes i+1 pills from each bottle i', () => {
    let capturedPills: number[] = [];
    const measureWeight = (pillsTaken: number[]) => {
      capturedPills = [...pillsTaken];
      const baseWeight = pillsTaken.reduce((a, b) => a + b, 0);
      return baseWeight + pillsTaken[0] * 0.1;
    };

    findHeavyBottle(measureWeight);
    expect(capturedPills).toHaveLength(20);
    for (let i = 0; i < 20; i++) {
      expect(capturedPills[i]).toBe(i + 1);
    }
  });

  test('detects a middle bottle (bottle 11) as heavy', () => {
    const heavyBottle = 11;
    const measureWeight = (pillsTaken: number[]) => {
      const baseWeight = pillsTaken.reduce((a, b) => a + b, 0);
      return baseWeight + pillsTaken[heavyBottle - 1] * 0.1;
    };

    expect(findHeavyBottle(measureWeight)).toBe(heavyBottle);
  });

  test('detects bottle 5 as heavy (excess = 0.5)', () => {
    const heavyBottle = 5;
    const measureWeight = (pillsTaken: number[]) => {
      const baseWeight = pillsTaken.reduce((a, b) => a + b, 0);
      return baseWeight + pillsTaken[heavyBottle - 1] * 0.1;
    };

    expect(findHeavyBottle(measureWeight)).toBe(heavyBottle);
  });

  test('detects bottle 15 as heavy (excess = 1.5)', () => {
    const heavyBottle = 15;
    const measureWeight = (pillsTaken: number[]) => {
      const baseWeight = pillsTaken.reduce((a, b) => a + b, 0);
      return baseWeight + pillsTaken[heavyBottle - 1] * 0.1;
    };

    expect(findHeavyBottle(measureWeight)).toBe(heavyBottle);
  });

  test('uses the scale exactly once', () => {
    let scaleUseCount = 0;
    const measureWeight = (pillsTaken: number[]) => {
      scaleUseCount++;
      const baseWeight = pillsTaken.reduce((a, b) => a + b, 0);
      return baseWeight + pillsTaken[0] * 0.1;
    };

    findHeavyBottle(measureWeight);
    expect(scaleUseCount).toBe(1);
  });
});
