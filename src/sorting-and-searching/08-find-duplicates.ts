// 10.08. Find Duplicates (Book-only)
//
// Given an array of integers, find all the elements that appear more than once.
// Return the duplicates in any order.
//
// Example:
//   Input: [1, 2, 3, 2, 4, 5, 1, 6]
//   Output: [1, 2]

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
