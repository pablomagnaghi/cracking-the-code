// 17.9 Kth Multiple
//
// Problem:
// Design an algorithm to find the kth number whose only prime factors are 3, 5, and 7.
// In other words, find the kth number in the sequence where each element is a product
// of powers of 3, 5, and 7 (e.g., 3^x * 5^y * 7^z).
//
// Example Sequence: 1, 3, 5, 7, 9, 15, 21, 25, 27, 35, ...
// Input: k = 5
// Output: 9 (the 5th number in the sequence)
//
// Constraints:
// - No duplicate values
// - Efficiently ordered sequence

export function getKthMagicNumber(k: number): number {
  const nums = new Array(k);
  nums[0] = 1;

  let i3 = 0,
    i5 = 0,
    i7 = 0;

  for (let i = 1; i < k; i++) {
    const next3 = nums[i3] * 3;
    const next5 = nums[i5] * 5;
    const next7 = nums[i7] * 7;

    const nextVal = Math.min(next3, next5, next7);
    nums[i] = nextVal;

    if (nextVal === next3) i3++;
    if (nextVal === next5) i5++;
    if (nextVal === next7) i7++;
  }

  return nums[k - 1];
}
