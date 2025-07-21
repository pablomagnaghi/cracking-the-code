// 16.21 – Sum Swap
//
// Problem:
// Given two arrays of integers, find a pair of values (one value from each array)
// that you can swap so that the sums of the two arrays become equal.
//
// Example:
//   A = [4, 1, 2, 1, 1, 2]
//   B = [3, 6, 3, 3]
//   Result = [1, 3]
//   Explanation: swapping 1 and 3 equalizes the array sums.

export function sumSwap(arrA: number[], arrB: number[]): [number, number] | null {
  const sumA = arrA.reduce((acc, val) => acc + val, 0);
  const sumB = arrB.reduce((acc, val) => acc + val, 0);
  const diff = sumA - sumB;

  // If difference is odd, no solution
  if (diff % 2 !== 0) return null;

  const target = diff / 2;
  const setB = new Set(arrB);

  // To find pair with smaller a, sort A first
  const sortedA = [...arrA].sort((a, b) => a - b);

  for (const a of sortedA) {
    const b = a - target;
    if (setB.has(b)) {
      return [a, b];
    }
  }
  return null;
}
