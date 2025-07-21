// 16.16 Sub Sort
//
// Problem: Given an array, find the smallest subarray that if sorted,
// would make the entire array sorted.
//
// Approach:
// 1. Scan from left to right to find the first element out of order (start).
// 2. Scan from right to left to find the first element out of order (end).
// 3. Find min and max in the subarray arr[start..end].
// 4. Expand start to the left while arr[start-1] > min.
// 5. Expand end to the right while arr[end+1] < max.
// 6. Return [start, end], or [-1, -1] if array already sorted.

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
