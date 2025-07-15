// 10.8. Find Duplicates
//
// Given an array of integers, find all the elements that appear more than once.
// Return the duplicates in any order.

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
