// 10.1: Sorted Merge
//
// You are given two sorted arrays, A and B, where A has a large enough buffer
// at the end to hold B. Write a method to merge B into A in sorted order.
// Example:
//   Input:
//     A = [1, 3, 5, 0, 0, 0], lastA = 3
//     B = [2, 4, 6], lastB = 3
//   Output:
//     A = [1, 2, 3, 4, 5, 6]

export function sortedMerge(A: number[], B: number[], lastA: number, lastB: number): void {
  let indexA = lastA - 1;

  let indexB = lastB - 1;

  let indexMerged = lastA + lastB - 1;

  while (indexB >= 0) {
    if (indexA < 0 || B[indexB] > A[indexA]) {
      A[indexMerged] = B[indexB];
      indexB--;
    } else {
      A[indexMerged] = A[indexA];
      indexA--;
    }
    indexMerged--;
  }
}
