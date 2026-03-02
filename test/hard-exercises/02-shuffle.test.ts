import { shuffle } from '../../src/hard-exercises/02-shuffle';

describe('shuffle', () => {
  test('returns array of same length', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle(arr);
    expect(shuffled.length).toBe(arr.length);
  });

  test('returns array with same elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle(arr);
    // Sort both arrays to compare elements ignoring order
    expect(shuffled.slice().sort()).toEqual(arr.slice().sort());
  });

  test('returns different order most of the time', () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffled = shuffle(arr);
    // There is a chance it returns the same order, but unlikely; check that it is not always equal
    const isSameOrder = shuffled.every((v, i) => v === arr[i]);
    // To avoid flaky test, run shuffle multiple times
    let differentFound = false;
    for (let i = 0; i < 10; i++) {
      if (!shuffle(arr).every((v, i) => v === arr[i])) {
        differentFound = true;
        break;
      }
    }
    expect(differentFound).toBe(true);
  });

  test('handles empty array', () => {
    expect(shuffle([])).toEqual([]);
  });

  test('handles single element array', () => {
    expect(shuffle([42])).toEqual([42]);
  });

  test('does not mutate the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const copy = [...arr];
    shuffle(arr);
    expect(arr).toEqual(copy);
  });

  test('handles string elements', () => {
    const arr = ['a', 'b', 'c'];
    const shuffled = shuffle(arr);
    expect(shuffled.slice().sort()).toEqual(['a', 'b', 'c']);
  });

  test('shuffle of two elements produces both orderings', () => {
    const arr = [1, 2];
    const orderings = new Set<string>();
    for (let i = 0; i < 200; i++) {
      orderings.add(JSON.stringify(shuffle(arr)));
    }
    // Both [1,2] and [2,1] should appear
    expect(orderings.size).toBe(2);
  });

  test('distribution of positions is roughly uniform', () => {
    const arr = [1, 2, 3, 4];
    const positionCounts: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));
    const iterations = 40000;

    for (let i = 0; i < iterations; i++) {
      const shuffled = shuffle(arr);
      for (let pos = 0; pos < shuffled.length; pos++) {
        positionCounts[shuffled[pos] - 1][pos]++;
      }
    }

    // Each element should appear in each position ~25% of the time
    const expected = iterations / 4;
    const tolerance = expected * 0.06;
    for (let elem = 0; elem < 4; elem++) {
      for (let pos = 0; pos < 4; pos++) {
        expect(positionCounts[elem][pos]).toBeGreaterThanOrEqual(expected - tolerance);
        expect(positionCounts[elem][pos]).toBeLessThanOrEqual(expected + tolerance);
      }
    }
  });

  test('handles large array without error', () => {
    const arr = Array.from({ length: 1000 }, (_, i) => i);
    const shuffled = shuffle(arr);
    expect(shuffled).toHaveLength(1000);
    expect(shuffled.slice().sort((a, b) => a - b)).toEqual(arr);
  });
});
