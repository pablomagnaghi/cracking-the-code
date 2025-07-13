// 3. *Magic Index*:

// A magic index in an array A[0...n-1] is defined to be an index such that A[i] = i.

// Given a sorted array of distinct integers, write a method to find a magic index, if one exists, in array A.

// FOLLOW UP: What if the values are not distinct?

export function findMagicIndexDistinct(arr: number[]): number | null {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === mid) {
      return mid;
    } else if (arr[mid] > mid) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return null;
}

export function findMagicIndexNonDistinct(arr: number[]): number | null {
  return search(arr, 0, arr.length - 1);
}

function search(arr: number[], start: number, end: number): number | null {
  if (start > end) return null;

  const mid = Math.floor((start + end) / 2);
  const midValue = arr[mid];

  if (mid === midValue) return mid;

  const leftIndex = Math.min(mid - 1, midValue);
  const left = search(arr, start, leftIndex);
  if (left !== null) return left;

  const rightIndex = Math.max(mid + 1, midValue);
  return search(arr, rightIndex, end);
}
