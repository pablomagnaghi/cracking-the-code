// LCCI 17.04. Missing Number
//
// An array contains all the integers from 0 to n, except for one number
// which is missing. Write code to find the missing integer. Can you do it
// in O(n) time?
//
// Example 1:
//   Input: [3,0,1]
//   Output: 2
//
// Example 2:
//   Input: [9,6,4,2,3,5,7,0,1]
//   Output: 8

export function missingNumber(nums: number[]): number {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  let actualSum = 0;
  for (let i = 0; i < n; i++) {
    actualSum += nums[i];
  }
  return expectedSum - actualSum;
}
