// 17.20 Continuous Median
//
// Problem:
// Numbers are randomly generated and passed to a method.
// Write a class to maintain and return the median of all numbers seen so far.
//
// Approach:
// Use two heaps:
// - A max-heap (lower half)
// - A min-heap (upper half)
// Balance them to ensure the size difference is at most 1.
// Median is:
// - Middle of both heaps when size is even
// - Top of the larger heap when odd

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
