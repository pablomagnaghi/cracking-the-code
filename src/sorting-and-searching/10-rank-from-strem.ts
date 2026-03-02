// LCCI 10.10. Rank from Stream
//
// Imagine you are reading in a stream of integers. Periodically, you wish to be able to
// look up the rank of a number x (the number of values less than or equal to x).
// Implement the data structure and algorithms to support these operations: track(x)
// is called when each number is generated, and getRankOfNumber(x) returns the number
// of values less than or equal to x (not including x itself).
//
// Example:
//   Input: ["StreamRank", "getRankOfNumber", "track", "getRankOfNumber"]
//          [[], [1], [0], [0]]
//   Output: [null, 0, null, 1]
//
// Constraints: x <= 50000. The number of calls to track and getRankOfNumber is at most 2000.

export class StreamRanker {
  private root: RankNode | null = null;

  track(x: number) {
    if (this.root === null) {
      this.root = new RankNode(x);
    } else {
      this.root.insert(x);
    }
  }

  getRankOfNumber(x: number): number {
    if (this.root === null) return 0;
    return this.root.getRank(x);
  }
}

class RankNode {
  value: number;
  left: RankNode | null = null;
  right: RankNode | null = null;
  leftSize: number = 0; // Number of nodes in the left subtree (i.e., <= value)

  constructor(value: number) {
    this.value = value;
  }

  insert(x: number) {
    if (x <= this.value) {
      this.leftSize++;
      if (this.left === null) {
        this.left = new RankNode(x);
      } else {
        this.left.insert(x);
      }
    } else {
      if (this.right === null) {
        this.right = new RankNode(x);
      } else {
        this.right.insert(x);
      }
    }
  }

  getRank(x: number): number {
    if (x === this.value) {
      return this.leftSize;
    } else if (x < this.value) {
      return this.left ? this.left.getRank(x) : 0;
    } else {
      const rightRank = this.right ? this.right.getRank(x) : 0;
      return this.leftSize + 1 + rightRank;
    }
  }
}
