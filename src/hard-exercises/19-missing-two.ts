// LCCI 17.19. Missing Two
//
// You are given an array with all the numbers from 1 to N appearing exactly
// once, except for two number that are missing. How can you find the missing
// numbers in O(N) time and O(1) space?
//
// You can return the missing numbers in any order.
//
// Example 1:
//   Input: [1]
//   Output: [2,3]
//
// Example 2:
//   Input: [2,3]
//   Output: [1,4]
//
// Constraints:
//   - nums.length <= 30000

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
