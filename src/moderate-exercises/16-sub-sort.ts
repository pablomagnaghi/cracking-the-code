// LCCI 16.16. Sub Sort
//
// Given an array of integers, write a method to find indices m and n such that
// if you sorted elements m through n, the entire array would be sorted.
// Minimize n - m (find the smallest such sequence).
//
// Example:
//   Input: [1,2,4,7,10,11,7,12,6,7,16,18,19]
//   Output: [3,9]
//
// Constraints:
//   - 0 <= len(array) <= 1000000
//   - Return [-1, -1] if the array is already sorted.

export function subSort(arr: number[]): [number, number] {
  if (arr.length === 0) return [-1, -1];

  let start = 0;
  while (start < arr.length - 1 && arr[start] <= arr[start + 1]) {
    start++;
  }
  if (start === arr.length - 1) {
    // Array already sorted
    return [-1, -1];
  }

  let end = arr.length - 1;
  while (end > 0 && arr[end] >= arr[end - 1]) {
    end--;
  }

  // Find min and max in arr[start..end]
  let subMin = Infinity;
  let subMax = -Infinity;
  for (let i = start; i <= end; i++) {
    if (arr[i] < subMin) subMin = arr[i];
    if (arr[i] > subMax) subMax = arr[i];
  }

  // Expand start left while arr[start-1] > subMin
  while (start > 0 && arr[start - 1] > subMin) {
    start--;
  }

  // Expand end right while arr[end+1] < subMax
  while (end < arr.length - 1 && arr[end + 1] < subMax) {
    end++;
  }

  return [start, end];
}
