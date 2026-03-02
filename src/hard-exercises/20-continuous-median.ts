// LCCI 17.20. Continuous Median
//
// Numbers are randomly generated and stored into an (expanding) array. How
// would you keep track of the median?
//
// Median is the middle value in an ordered integer list. If the size of the
// list is even, there is no middle value. So the median is the mean of the
// two middle values.
//
// Example:
//   [2,3,4], the median is 3
//   [2,3], the median is (2 + 3) / 2 = 2.5
//
// Design a data structure that supports:
//   addNum(int num) - Add a integer number from the data stream to the structure.
//   findMedian() - Return the median of all elements so far.

export class ContinuousMedianHandler {
  private lowers: number[] = []; // Max-heap (as negative numbers)
  private highers: number[] = []; // Min-heap

  insert(number: number): void {
    if (this.lowers.length === 0 || number < -this.lowers[0]) {
      this.lowers.push(-number);
      this.lowers.sort((a, b) => a - b); // Max-heap (store negatives)
    } else {
      this.highers.push(number);
      this.highers.sort((a, b) => a - b); // Min-heap
    }

    // Rebalance the heaps if needed
    this.rebalance();
  }

  getMedian(): number {
    const totalLength = this.lowers.length + this.highers.length;

    if (totalLength === 0) return 0;

    if (this.lowers.length === this.highers.length) {
      return (-this.lowers[0] + this.highers[0]) / 2;
    } else if (this.lowers.length > this.highers.length) {
      return -this.lowers[0];
    } else {
      return this.highers[0];
    }
  }

  private rebalance(): void {
    if (this.lowers.length > this.highers.length + 1) {
      const val = -this.lowers.shift()!;
      this.highers.push(val);
      this.highers.sort((a, b) => a - b);
    } else if (this.highers.length > this.lowers.length + 1) {
      const val = this.highers.shift()!;
      this.lowers.push(-val);
      this.lowers.sort((a, b) => a - b);
    }
  }
}
