// 10.07. Missing Int
//
// Given an input file with four billion non-negative integers, provide an
// algorithm to generate an integer that is not contained in the file.
// Assume you have 1 GB of memory available.
//
// Follow up: What if you have only 10 MB of memory? Assume that all the
// values are distinct and you now have no more than one billion non-negative
// integers.
//
// Note: This implementation simplifies the problem to an in-memory sorted
// array with one missing integer in a consecutive sequence, demonstrating
// the core binary search logic to identify the gap.
//
// Example:
//   Input: [1, 2, 3, 5, 6]
//   Output: 4
//
//   Input: [0, 1, 2, 3, 4, 5, 7, 8, 9]
//   Output: 6
//
// Constraints:
//   - The original problem involves 4 billion integers (2^32 non-negative ints)
//   - With 1 GB memory: use a bit vector of 2^31 bits (1 billion bytes) to
//     mark each integer seen, then scan for the first 0 bit
//   - With 10 MB memory: use a two-pass approach -- first count integers in
//     each block/range, find a block with a missing value, then use a bit
//     vector for that block on the second pass
//   - This simplified version uses binary search in O(log n) time

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
