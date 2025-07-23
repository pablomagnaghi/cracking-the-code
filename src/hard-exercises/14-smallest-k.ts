// 17.14 Smallest K
//
// Problem:
// Given an array and an integer k, return the k smallest elements in the array.

export function smallestK(arr: number[], k: number): number[] {
  if (k <= 0) return [];
  if (k >= arr.length) return [...arr];
  // Sort the array and take first k elements
  return arr
    .slice()
    .sort((a, b) => a - b)
    .slice(0, k);
}

export function smallestKQuickselect(arr: number[], k: number): number[] {
  if (k <= 0) return [];
  if (k >= arr.length) return [...arr];

  const nums = [...arr];
  quickselect(nums, 0, nums.length - 1, k);
  return nums.slice(0, k);
}

function partition(arr: number[], left: number, right: number): number {
  const pivot = arr[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

function quickselect(arr: number[], left: number, right: number, k: number): void {
  if (left >= right) return;
  const pivotIndex = partition(arr, left, right);
  if (pivotIndex === k) return;
  else if (pivotIndex < k) quickselect(arr, pivotIndex + 1, right, k);
  else quickselect(arr, left, pivotIndex - 1, k);
}
