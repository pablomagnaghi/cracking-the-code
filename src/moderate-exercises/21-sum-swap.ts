// LCCI 16.21. Sum Swap
//
// Given two arrays of integers, find a pair of values (one from each array) that
// you can swap to give the two arrays the same sum. Return an array with the two
// values. If there are multiple answers, return any one. If no swap exists, return
// an empty array.
//
// Example 1:
//   Input: array1 = [4, 1, 2, 1, 1, 2], array2 = [3, 6, 3, 3]
//   Output: [1, 3]
//
// Example 2:
//   Input: array1 = [1, 2, 3], array2 = [4, 5, 6]
//   Output: []
//
// Constraints:
//   - 1 <= array1.length, array2.length <= 100000

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
