// 16.6. Smallest Difference
//
// Given two arrays of integers, find the pair of values (one from each array) with the smallest non-negative difference.
// Return the absolute difference.

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
