// 17.4 Missing Number
//
// Problem:
// Given an array containing n distinct numbers taken from 0, 1, 2, ..., n,
// find the one that is missing from the array.

export function missingNumber(nums: number[]): number {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  let actualSum = 0;
  for (let i = 0; i < n; i++) {
    actualSum += nums[i];
  }
  return expectedSum - actualSum;
}
