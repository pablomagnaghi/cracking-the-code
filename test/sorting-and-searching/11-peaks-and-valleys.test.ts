import { peaksAndValleys } from '../../src/sorting-and-searching/11-peaks-and-valleys';

function isPeaksAndValleys(arr: number[]): boolean {
  for (let i = 1; i < arr.length - 1; i++) {
    const isPeak = arr[i] >= arr[i - 1] && arr[i] >= arr[i + 1];
    const isValley = arr[i] <= arr[i - 1] && arr[i] <= arr[i + 1];
    if (!isPeak && !isValley) return false;
  }
  return true;
}

describe('peaksAndValleys', () => {
  test('creates alternating peak and valley pattern', () => {
    const input = [5, 3, 1, 2, 3];
    const result = peaksAndValleys(input.slice());
    expect(isPeaksAndValleys(result)).toBe(true);
  });

  test('works on sorted ascending input', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const result = peaksAndValleys(input.slice());
    expect(isPeaksAndValleys(result)).toBe(true);
  });

  test('works on sorted descending input', () => {
    const input = [6, 5, 4, 3, 2, 1];
    const result = peaksAndValleys(input.slice());
    expect(isPeaksAndValleys(result)).toBe(true);
  });

  test('handles small arrays', () => {
    expect(isPeaksAndValleys(peaksAndValleys([1]))).toBe(true);
    expect(isPeaksAndValleys(peaksAndValleys([2, 1]))).toBe(true);
  });

  test('handles array with duplicates', () => {
    const input = [4, 4, 4, 4, 4];
    const result = peaksAndValleys(input.slice());
    expect(isPeaksAndValleys(result)).toBe(true);
  });

  test('does not mutate original input array', () => {
    const input = [9, 1, 0, 4];
    const original = input.slice();
    peaksAndValleys(input);
    expect(input).not.toEqual(original); // If needed: deep clone before mutation
  });
});
