// 17.21 Volume of Histogram
//
// Problem:
// Given an array representing the heights of bars in a histogram,
// compute how much water is trapped between the bars after it rains.
//
// For example:
// Input: [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6

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
