// LCCI 17.05. Find Longest Subarray
//
// Given an array filled with letters and numbers, find the longest subarray
// with an equal number of letters and numbers. Return the subarray. If there
// are multiple answers, return the one with the smallest left index. Return
// an empty array if no valid subarray exists.
//
// Example:
//   Input: ["A","1","B","C","D","2","3","4","E","5","F","G","6","7"]
//   Output: ["A","1","B","C","D","2","3","4","E","5","F","G","6","7"]
//
// Constraints:
//   - array.length <= 100000

export function findLongestBalancedSubarray(arr: (string | number)[]): (string | number)[] {
  const map = new Map<number, number>();
  map.set(0, -1);

  let maxLen = 0;
  let startIdx = 0;
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'number' || /^\d+$/.test(arr[i] as string)) {
      count += 1;
    } else {
      count -= 1;
    }

    if (map.has(count)) {
      const prevIdx = map.get(count)!;
      const len = i - prevIdx;
      if (len > maxLen) {
        maxLen = len;
        startIdx = prevIdx + 1;
      }
    } else {
      map.set(count, i);
    }
  }

  return arr.slice(startIdx, startIdx + maxLen);
}
