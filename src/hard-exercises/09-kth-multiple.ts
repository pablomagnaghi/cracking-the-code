// LCCI 17.09. Get Kth Magic Number
//
// Design an algorithm to find the kth number such that the only prime factors
// are 3, 5, and 7. Note that 3, 5, and 7 do not have to be factors, but it
// should not have any other prime factors. For example, the first several
// multiples would be (in order) 1, 3, 5, 7, 9, 15, 21, 25, 27, 35...
//
// Example:
//   Input: k = 5
//   Output: 9

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
