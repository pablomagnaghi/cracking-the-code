// 16.17 Contiguous Sequence
//
// Problem: Find the maximum sum of any contiguous subsequence (subarray)
// within an array of integers.
//
// Approach:
// Use Kadane's algorithm:
// - Iterate through the array, maintaining current running sum and max sum found.
// - If current sum drops below zero, reset it to zero (start a new subarray).
// - Return the maximum sum encountered.

export function maxContiguousSequence(arr: number[]): number {
  let maxSum = -Infinity;
  let currentSum = 0;

  for (const num of arr) {
    currentSum += num;
    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
    if (currentSum < 0) {
      currentSum = 0;
    }
  }

  return maxSum;
}
