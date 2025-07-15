// 10.11. Peaks and Valleys
//
// In an array of integers, a "peak" is an element that is greater than or equal to its neighbors,
// and a "valley" is an element that is less than or equal to its neighbors.
// Rearrange the array into an alternating sequence of peaks and valleys.

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
