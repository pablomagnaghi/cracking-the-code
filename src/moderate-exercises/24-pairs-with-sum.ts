// LCCI 16.24. Pairs with Sum
//
// Design an algorithm to find all pairs of integers within an array which sum
// to a specified value.
//
// Example 1:
//   Input: nums = [5,6,5], target = 11
//   Output: [[5,6]]
//
// Example 2:
//   Input: nums = [5,6,5,6], target = 11
//   Output: [[5,6],[5,6]]
//
// Constraints:
//   - nums.length <= 100000
//   - -10^5 <= nums[i], target <= 10^5

export function pairsWithSum(arr: number[], target: number): [number, number][] {
  const seen = new Set<number>();
  const pairs = new Set<string>();
  const result: [number, number][] = [];

  for (const num of arr) {
    const complement = target - num;
    if (seen.has(complement)) {
      // Sort pair to avoid duplicates (e.g., (2,3) and (3,2))
      const sortedPair = [Math.min(num, complement), Math.max(num, complement)];
      const key = sortedPair.join(',');
      if (!pairs.has(key)) {
        pairs.add(key);
        result.push(sortedPair as [number, number]);
      }
    }
    seen.add(num);
  }

  return result;
}
