// 10.08. Find Duplicates
//
// You have an array with all the numbers from 1 to N, where N is at most
// 32,000. The array may have duplicate entries and you do not know what N is.
// With only 4 kilobytes of memory available, how would you print all
// duplicate elements in the array?
//
// Approach: 4 KB = 4 * 1024 * 8 = 32,768 bits, which is enough to represent
// all numbers from 1 to 32,000. Create a bit vector of 32,000 bits. For each
// number in the array, check if the corresponding bit is set. If it is, the
// number is a duplicate. Otherwise, set the bit.
//
// Note: This implementation uses a Set for clarity, but the optimal solution
// for the 4 KB constraint would use a bit vector (BitSet) instead.
//
// Example:
//   Input: [1, 5, 1, 10, 12, 10]
//   Output: [1, 10]
//
//   Input: [3, 2, 1, 2, 3]
//   Output: [2, 3]
//
// Constraints:
//   - 1 <= array elements <= N, where N <= 32,000
//   - Only 4 KB of memory available
//   - Array may contain duplicate entries
//   - N is not known in advance

export function findDuplicates(nums: number[]): number[] {
  const seen = new Set<number>();
  const duplicates = new Set<number>();

  for (const num of nums) {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num);
    }
  }

  return Array.from(duplicates);
}
