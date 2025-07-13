// 4. *Power Set*:

// Write a method to return all subsets of a set.

// Example
// Input: [1, 2, 3]
// Output: [ [], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3] ];

export function powerSet(set: number[]): number[][] {
  const result: number[][] = [];
  generateSubsets(set, 0, [], result);
  return result;
}

function generateSubsets(
  set: number[],
  index: number,
  currentSubset: number[],
  result: number[][]
): void {
  if (index === set.length) {
    result.push([...currentSubset]);
    return;
  }

  // Exclude current element
  generateSubsets(set, index + 1, currentSubset, result);

  // Include current element
  currentSubset.push(set[index]);
  generateSubsets(set, index + 1, currentSubset, result);
  currentSubset.pop();
}
