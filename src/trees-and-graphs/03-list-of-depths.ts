// 3. *List of Depths*:

// Given a binary tree, design an algorithm which creates a linked list
// of all the nodes at each depth (e.g., if you have a tree with depth D,
// you'll have D linked lists).

export type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

export type ListNode<T> = {
  value: T;
  next?: ListNode<T>;
};

export function listOfDepths<T>(root: TreeNode<T> | null): ListNode<T>[] {
  if (!root) return [];

  const result: ListNode<T>[] = [];
  let currentLevel: TreeNode<T>[] = [root];

  while (currentLevel.length > 0) {
    const dummyHead: ListNode<T> = { value: currentLevel[0].value }; // Placeholder
    let currentListNode = dummyHead;

    const nextLevel: TreeNode<T>[] = [];

    for (const node of currentLevel) {
      const listNode: ListNode<T> = { value: node.value };
      currentListNode.next = listNode;
      currentListNode = listNode;

      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    }

    result.push(dummyHead.next!); // Exclude dummy head
    currentLevel = nextLevel;
  }

  return result;
}
