// 10.3: Search in Rotated Array
//
// Given a sorted array of n integers that has been rotated an unknown number of times,
// write code to find an element in the array. You may assume that the array was originally
// sorted in increasing order.
//
// Example:
// Input: arr = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14], target = 5
// Output: 8 (index of 5)
//
// You should modify binary search to accommodate the rotation.

export function searchRotatedArray(arr: number[], target: number): number {
  return binarySearchRotated(arr, target, 0, arr.length - 1);
}

function binarySearchRotated(arr: number[], target: number, left: number, right: number): number {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;

  if (arr[left] <= arr[mid]) {
    if (target >= arr[left] && target < arr[mid]) {
      return binarySearchRotated(arr, target, left, mid - 1);
    } else {
      return binarySearchRotated(arr, target, mid + 1, right);
    }
  }

  if (target > arr[mid] && target <= arr[right]) {
    return binarySearchRotated(arr, target, mid + 1, right);
  } else {
    return binarySearchRotated(arr, target, left, mid - 1);
  }
}
