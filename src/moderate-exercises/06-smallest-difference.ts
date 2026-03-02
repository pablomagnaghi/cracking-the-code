// LCCI 16.06. Smallest Difference
//
// Given two arrays of integers, compute the pair of values (one value in each array)
// with the smallest (non-negative) difference. Return the difference.
//
// Example:
//   Input: {1, 3, 15, 11, 2}, {23, 127, 235, 19, 8}
//   Output: 3 (the pair 11 and 8)
//
// Constraints:
//   - 1 <= a.length, b.length <= 100000
//   - -2147483648 <= a[i], b[i] <= 2147483647
//   - The result will be in the range of 32-bit signed integers.

export function smallestDifference(arrayA: number[], arrayB: number[]): number {
  // Sort both arrays to enable efficient two-pointer comparison
  arrayA.sort((a, b) => a - b);
  arrayB.sort((a, b) => a - b);

  let indexA = 0;
  let indexB = 0;
  let minDifference = Infinity;

  while (indexA < arrayA.length && indexB < arrayB.length) {
    const valueA = arrayA[indexA];
    const valueB = arrayB[indexB];
    const currentDifference = Math.abs(valueA - valueB);

    if (currentDifference < minDifference) {
      minDifference = currentDifference;
    }

    if (valueA < valueB) {
      indexA++;
    } else {
      indexB++;
    }
  }

  return minDifference;
}
