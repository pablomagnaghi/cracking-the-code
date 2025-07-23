// 17.19. Missing Two
//
// Problem:
// You are given an array containing all the numbers from 1 to n, except two numbers that are missing.
// Write a function to find the two missing numbers.
//
// Example:
// Input: [1, 2, 4, 6]
// Output: [3, 5]

export function findMissingTwo(nums: number[]): number[] {
  const n = nums.length + 2;

  const totalSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  const sumOfTwo = totalSum - actualSum;

  const pivot = Math.floor(sumOfTwo / 2);

  let expectedLeft = 0;
  let actualLeft = 0;

  for (let i = 1; i <= pivot; i++) {
    expectedLeft += i;
  }

  for (const num of nums) {
    if (num <= pivot) {
      actualLeft += num;
    }
  }

  const firstMissing = expectedLeft - actualLeft;
  const secondMissing = sumOfTwo - firstMissing;

  return [firstMissing, secondMissing];
}
