// LCCI 10.11. Peaks and Valleys
//
// In an array of integers, a "peak" is an element which is greater than or equal to
// the adjacent integers and a "valley" is an element which is less than or equal to
// the adjacent integers. Given an array of integers, sort the array into an alternating
// sequence of peaks and valleys.
//
// Example:
//   Input: [5, 3, 1, 2, 3]
//   Output: [5, 1, 3, 2, 3]
//
// Constraints: nums.length <= 10000

export function peaksAndValleys(arr: number[]): number[] {
  // Loop through the array, stepping every 2 elements
  for (let i = 1; i < arr.length; i += 2) {
    let maxIndex = i;

    if (i - 1 >= 0 && arr[i - 1] > arr[maxIndex]) {
      maxIndex = i - 1;
    }

    if (i + 1 < arr.length && arr[i + 1] > arr[maxIndex]) {
      maxIndex = i + 1;
    }

    if (maxIndex !== i) {
      [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
    }
  }

  return arr;
}
