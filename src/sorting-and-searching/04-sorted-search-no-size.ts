// 10.4: Sorted Search, No Size
//
// You are given an array-like data structure Listy which lacks a size method. It does,
// however, have an elementAt(i) method that returns the element at index i in O(1) time.
// If i is beyond the bounds of the data structure, it returns -1.
//
// Given a Listy that contains sorted, positive integers, find the index at which an
// element x occurs. If x occurs multiple times, return the first index.
//
// Example:
// Input: Listy = [1, 3, 5, 7, 9, 12, 15, 20, 20, 25], x = 20
// Output: 7

// Define the Listy interface
interface Listy {
  elementAt(index: number): number;
}

export function sortedSearchNoSize(list: Listy, target: number): number {
  // Step 1: Exponentially find the search bounds
  let index = 1;
  while (list.elementAt(index) !== -1 && list.elementAt(index) < target) {
    index *= 2;
  }

  // Step 2: Perform binary search between previous and current index
  return binarySearchListy(list, target, Math.floor(index / 2), index);
}

function binarySearchListy(list: Listy, target: number, left: number, right: number): number {
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const val = list.elementAt(mid);

    if (val === -1 || val > target) {
      right = mid - 1;
    } else if (val < target) {
      left = mid + 1;
    } else {
      result = mid;
      right = mid - 1;
    }
  }

  return result;
}
