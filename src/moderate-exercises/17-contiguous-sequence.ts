// LCCI 16.17. Contiguous Sequence
//
// You are given an array of integers (both positive and negative). Find the
// contiguous sequence with the largest sum. Return the sum.
//
// Example:
//   Input: [-2,1,-3,4,-1,2,1,-5,4]
//   Output: 6
//   Explanation: The contiguous subarray [4,-1,2,1] has the largest sum = 6.

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
