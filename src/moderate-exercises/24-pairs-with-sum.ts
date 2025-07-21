// 16.24 Pairs With Sum
//
// Problem:
// Given an array of integers and a target sum, return all pairs of numbers
// from the array that add up to the target sum. Each pair should be unique.

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
