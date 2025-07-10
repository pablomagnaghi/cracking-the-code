import {
  TreeNode,
  ListNode,
  listOfDepths,
} from '../../src/trees-and-graphs/03-list-of-depths';

function linkedListToArray<T>(head: ListNode<T> | undefined): T[] {
  const result: T[] = [];
  while (head) {
    result.push(head.value);
    head = head.next;
  }
  return result;
}

function levelsToArrays<T>(levels: ListNode<T>[]): T[][] {
  return levels.map(linkedListToArray);
}

describe('listOfDepths', () => {
  test('returns empty list for null root', () => {
    expect(listOfDepths(null)).toEqual([]);
  });

  test('handles single node tree', () => {
    const tree: TreeNode<number> = { value: 42 };
    const result = listOfDepths(tree);
    expect(levelsToArrays(result)).toEqual([[42]]);
  });

  test('handles balanced binary tree', () => {
    const tree: TreeNode<number> = {
      value: 1,
      left: {
        value: 2,
        left: { value: 4 },
        right: { value: 5 },
      },
      right: {
        value: 3,
        left: { value: 6 },
        right: { value: 7 },
      },
    };
    const result = listOfDepths(tree);
    expect(levelsToArrays(result)).toEqual([[1], [2, 3], [4, 5, 6, 7]]);
  });

  test('handles left-skewed tree', () => {
    const tree: TreeNode<number> = {
      value: 1,
      left: {
        value: 2,
        left: {
          value: 3,
        },
      },
    };
    const result = listOfDepths(tree);
    expect(levelsToArrays(result)).toEqual([[1], [2], [3]]);
  });

  test('handles right-skewed tree', () => {
    const tree: TreeNode<number> = {
      value: 1,
      right: {
        value: 2,
        right: {
          value: 3,
        },
      },
    };
    const result = listOfDepths(tree);
    expect(levelsToArrays(result)).toEqual([[1], [2], [3]]);
  });
});
