import { circusTower, Person } from '../../src/hard-exercises/08-circus-tower';

describe('circusTower', () => {
  test('returns correct longest tower', () => {
    const input: Person[] = [
      { height: 65, weight: 100 },
      { height: 70, weight: 150 },
      { height: 56, weight: 90 },
      { height: 75, weight: 190 },
      { height: 60, weight: 95 },
      { height: 68, weight: 110 },
    ];

    const result = circusTower(input);
    // Each should be taller and heavier than the last
    for (let i = 1; i < result.length; i++) {
      expect(result[i].height).toBeGreaterThan(result[i - 1].height);
      expect(result[i].weight).toBeGreaterThan(result[i - 1].weight);
    }
  });

  test('returns single person if no valid tower', () => {
    const input: Person[] = [
      { height: 65, weight: 100 },
      { height: 64, weight: 101 },
      { height: 63, weight: 102 },
    ];
    const tower = circusTower(input);
    expect(tower.length).toBe(1);
  });

  test('handles empty list', () => {
    expect(circusTower([])).toEqual([]);
  });
});
