// 17.10 Majority Element
//
// Problem:
// Given an array of integers, find the element that appears more than half the time (majority element).
// You may assume that the array always has a majority element.

export function majorityElement(nums: number[]): number {
  let count = 0;
  let candidate: number | null = null;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  }

  return candidate!;
}
