// 10.07. Missing Int (Book-only)
//
// Given an array of integers sorted in ascending order but missing one number in the sequence,
// find the missing number. The array represents a sequence from some start number increasing by 1 each time.
//
// Example:
//   Input: [1, 2, 3, 5, 6]
//   Output: 4

export function findMissingIncrement(arr: number[]): number | null {
  if (arr.length < 2) return null;

  if (arr[0] > 1) {
    return arr[0] - 1;
  }

  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const expected = arr[0] + mid;

    if (arr[mid] === expected) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  // After binary search, left points to index where sequence breaks
  if (arr[left] !== arr[0] + left) {
    return arr[left] - 1;
  }

  return null;
}
