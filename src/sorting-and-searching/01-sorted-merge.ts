// LCCI 10.01. Sorted Merge
//
// You are given two sorted arrays, A and B, where A has a large enough buffer at the
// end to hold B. Write a method to merge B into A in sorted order.
// Initially, the number of elements in A and B are m and n respectively.
//
// Example:
//   Input: A = [1,2,3,0,0,0], m = 3, B = [2,5,6], n = 3
//   Output: [1,2,2,3,5,6]

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
