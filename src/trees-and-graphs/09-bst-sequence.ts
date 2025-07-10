// 9. *BST Sequences*: A binary search tree was created by traversing through an array from left to right and inserting each element.
// Given a binary search tree with distinct elements, print all possible arrays that could have led to this tree.

// ```
// EXAMPLE Input:
/*
            2
           / \
          1   3
*/
// Output: [[2, 1, 3], [2, 3, 1]]
// ```

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

export function bstSequences<T>(root: TreeNode<T> | undefined): T[][] {
  if (!root) return [[]];

  const leftSeqs = bstSequences(root.left);
  const rightSeqs = bstSequences(root.right);

  const results: T[][] = [];

  for (const left of leftSeqs) {
    for (const right of rightSeqs) {
      const weaved: T[][] = [];
      weaveLists(left, right, [root.value], weaved);
      results.push(...weaved);
    }
  }

  return results;
}

// Weave two arrays while maintaining the relative order of elements within each array
function weaveLists<T>(
  first: T[],
  second: T[],
  prefix: T[],
  results: T[][]
): void {
  if (first.length === 0 || second.length === 0) {
    results.push([...prefix, ...first, ...second]);
    return;
  }

  // Recurse with head of first added to the prefix. Removing head will damage array, so copy
  const headFirst = first[0];
  weaveLists(first.slice(1), second, [...prefix, headFirst], results);

  // Recurse with head of second added to the prefix
  const headSecond = second[0];
  weaveLists(first, second.slice(1), [...prefix, headSecond], results);
}
