// LCCI 17.21. Volume of Histogram
//
// Imagine a histogram (bar graph). Design an algorithm to compute the volume
// of water it could hold if someone poured water across the top. You can
// assume that each histogram bar has width 1.
//
// Example:
//   Input: [0,1,0,2,1,0,1,3,2,1,2,1]
//   Output: 6

export function volumeOfHistogram(heights: number[]): number {
  let left = 0;
  let right = heights.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let trappedWater = 0;

  while (left < right) {
    if (heights[left] < heights[right]) {
      if (heights[left] >= leftMax) {
        leftMax = heights[left];
      } else {
        trappedWater += leftMax - heights[left];
      }
      left++;
    } else {
      if (heights[right] >= rightMax) {
        rightMax = heights[right];
      } else {
        trappedWater += rightMax - heights[right];
      }
      right--;
    }
  }

  return trappedWater;
}
