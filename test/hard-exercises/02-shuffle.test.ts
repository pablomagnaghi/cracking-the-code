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
});
